# 多进程和 cluster/PM2原理

https://juejin.im/post/6844903757126303758

相关面试题：

# Node.js的进程管理

### spawn

首先认识一下spawn方法，下面是Node文档的官方实例。

```js
const { spawn } = require('child_process');
const child = spawn('ls', ['-lh', '/home']);

child.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});

const { stdin, stdout, stderr } = child

stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});
复制代码
```

通过spawn创建的子进程，继承自EventEmitter，所以可以在上面进行事件（`discount`，`error`，`close`，`message`）的监听。同时子进程具有三个输入输出流：stdin、stdout、stderr，通过这三个流，可以实时获取子进程的输入输出和错误信息。

这读写流很重要要多看看

**exec会将spawn的输入输出流转换成String，默认使用UTF-8的编码，然后传递给回调函数，使用回调方式在node中较为熟悉，比流更容易操作，所以我们能使用exec方法执行一些`shell`命令，然后在回调中获取返回值。有点需要注意，这里的buffer是有最大缓存区的，如果超出会直接被kill掉，可用通过maxBuffer属性进行配置（默认: 200*1024）。**

```js
const { exec } = require('child_process');
exec('ls -lh /home', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
```

**所以spawn和exec的区别就在于，** spawn是使用eventemitter来对进程时间的监听，然后又有三个输入输出流来获取数据信息

exec就是通过回调函数来获取数据

### fork

fork最后也是调用spawn来创建子进程，但是fork是spawn的一种特殊情况，用于衍生新的 Node.js 进程，会产生一个新的V8实例，所以执行fork方法时需要指定一个js文件。

```js
exports.fork = function fork(modulePath /* , args, options */) {
  // ...
  
  options.shell = false;

  return spawn(options.execPath, args, options);
};
复制代码
```

**通过fork创建子进程之后，父子进程直接会创建一个IPC（进程间通信）通道，方便父子进程直接通信，在js层使用 `process.send(message)` 和 `process.on('message', msg => {})` 进行通信**。而在底层，实现进程间通信的方式有很多，Node的进程间通信基于libuv实现，不同操作系统实现方式不一致。在*unix系统中采用Unix Domain Socket方式实现，Windows中使用命名管道的方式实现。

![img](https://user-gold-cdn.xitu.io/2019/1/8/1682b1256ac1011e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

其实可以看到，这些方法都是对spawn方法的复用，然后spawn方法底层调用了libuv进行进程的管理，具体可以看下图

（上面讲的很明白）

最后这四个的对比写出来：



-----

## cluster模块

解决不能同事监听一个端口的问题，很好的利用多进程资源来处理信息。

### cluster模块源码分析  (只有看了源码才能回答出这些问题)

` worker.process.on('internalMessage', internal(worker, onmessage));`

最后子进程获取到客户端句柄后，调用net模块的onconnection，对Socket进行实例化，后面就与其他http请求的逻辑一致了，不再细讲

没有讲清楚，再看看其他资料

 Node.js 默认采用的策略是 **round-robin** 时间片轮转法。

round-robin 是一种很常见的负载均衡算法，Nginx 上也采用了它作为负载均衡策略之一。它的原理很简单，每一次把来自用户的请求轮流分配给各个进程，从 1 开始，直到 N(worker 进程个数)，然后重新开始循环。这个算法的问题在于，它是假定各个进程或者说各个服务器的处理性能是一样的，但是如果请求处理间隔较长，就容易导致出现负载不均衡。因此我们通常在 Nginx 上采用另一种算法：**WRR**，加权轮转法。通过给各个服务器分配一定的权重，每次选出权重最大的，给其权重减 1，直到权重全部为 0 后，按照此时生成的序列轮询。

可以通过设置 NODE_CLUSTER_SCHED_POLICY 环境变量，或者通过 cluster.setupMaster(options) 来修改负载均衡策略。读到这里大家可以发现，我们可以 Nginx 做多机器集群上的负载均衡，然后用 Node.js Cluster 来实现单机多进程上的负载均衡。

最初的 Node.js 上，多个进程监听同一个端口，它们相互竞争新 accept 过来的连接。这样会导致各个进程的负载很不均衡，于是后来使用了上文提到的 round-robin 策略。具体思路是，master 进程创建 socket，绑定地址并进行监听。该 socket 的 fd 不传递到各个 worker 进程。当 master 进程获取到新的连接时，再决定将 accept 到的客户端连接分发给指定的 worker 处理。简单说就是，master 进程监听端口，然后将连接通过某种分发策略（比如 round-robin），转发给 worker 进程。这样由于只有 master 进程接收客户端连接，就解决了竞争导致的负载不均衡的问题。但是这样设计就要求 master 进程的稳定性足够好了。

这种能看懂

-----

子进程和主进程的区分是通过‘NODE_UNIQUE_ID’来判断的。我们分析cluster.fork方法可以发现，在createworkprocess中都会对NODE_UNIQUE_ID进行赋值，而master进程中是没有NODE_UNIQUE_ID的。所以再demo程序中可以分别在主进程和子进程中执行不同的内容。**因此主进程执行完后，就仅仅fork出了子进程**。

## 主进程httpserver

主进程执行完毕后，子进程开始执行响应的代码，子进程首先创建httpserver，然后监听端口号，而正是这个listen方法，暗藏着问题的关键。http模块http.server继承了net模块的net.server，那我们就来看看net.js中的Server.prototype.listen干了哪些事。

![img](https://images2018.cnblogs.com/blog/1431859/201807/1431859-20180713200853198-828252847.png)

 

 

在listen中主要执行了listenInCluster方法，其输入信息包含ip,端口号,地址类型,backlog和fd等，listenInCluster函数主要内容如上图中所示，当当前进程是主进程时，直接创建服务监听；如果是子进程，则执行_getserver函数，该函数位于lib/internal/cluster/child.js中，它会传入创建httpserver所需要的端口等相关信息，并向主进程发送‘serverQuery’指令，主进程接收到‘serverQuery’指令后，会new出一个RoundRobinHandle的实例，在这个过程中，主进程服务被创建，端口被监听，子进程被加入到调度度列中。这些完成后，子进程执行回调函数，继续后续操作。

## client通过tcp连接向主进程发送请求，那主进程又是如何将请求传递给子进程处理呢？

子进程TCP服务器没有创建底层socket，它主要依赖IPC通道与主进程通信，既然主进程负责接受客户端请求，那么理所应当由主进程分发客户端请求给某个子进程，由子进程处理请求。具体分配给哪个子进程处理，是由round-robbine分发策略来决定的。由于子进程在server中设置了对底层的socket的引用，所以子进程接收到任务后，触发connection事件开始执行业务逻辑。

## 总结

对于cluster的分析，得出以下结论：

1. cluster在创建子进程时，会在环境变量中增加标识，以此来区分主进程和子进程

2. listen函数在实现时对主进程和子进程进行了区分，在不同的进程中会执行不同操作

3. nodeJS封装了进程间通信的方法，支持在进程间发送句柄的功能，句柄可以是一个socket对象，一个管道等等

4. **一个端口只能被一个进程监听，但是该端口可以建立多个连接(accpet是产生的套接字)，不同进程间可以共享这些套接字**

5. 子进程的listen函数并没有监听端口，它在listen时将端口和地址等信息发送给主进程，由主进程进行监听。

   **主进程在收到accept事件时，产生连接socket，并把它发送给子进程。子进程直接通过该socket跟client端进行通信**

 **不是同时监听端口，是主进程分发socket，触发connection事件开始执行业务逻辑**

暂时cluster理解到这里，https://www.cnblogs.com/accordion/p/7207740.html（更详细的在这里）

## 看下pm2

## pm2的实现

[pm2](https://github.com/Unitech/pm2) 基于 `cluster模块` 进行了封装，它能自动监控进程状态、重启进程、停止不稳定进程、日志存储等。利用 `pm2` 时，可以在不修改代码的情况下实现负载均衡集群。





todo： https://juejin.im/entry/6844903545636929544

这个没看，休息下，看看简单的，不然就效率太低