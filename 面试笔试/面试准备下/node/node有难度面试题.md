# node难度面试题

1，事件循环

2，子进程及通信

---

## node面试总结

### 1.2 请介绍一下require的模块加载机制

这道题基本上就可以了解到面试者对Node模块机制的了解程度 基本上面试提到

- 1、先计算模块路径
- 2、如果模块在缓存里面，取出缓存
- 3、加载模块
- 4、的输出模块的exports属性即可

```
// require 其实内部调用 Module._load 方法
Module._load = function(request, parent, isMain) {
  //  计算绝对路径
  var filename = Module._resolveFilename(request, parent);

  //  第一步：如果有缓存，取出缓存
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;

  // 第二步：是否为内置模块
  if (NativeModule.exists(filename)) {
    return NativeModule.require(filename);
  }
  
  /********************************这里注意了**************************/
  // 第三步：生成模块实例，存入缓存
  // 这里的Module就是我们上面的1.1定义的Module
  var module = new Module(filename, parent);
  Module._cache[filename] = module;

  /********************************这里注意了**************************/
  // 第四步：加载模块
  // 下面的module.load实际上是Module原型上有一个方法叫Module.prototype.load
  try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete Module._cache[filename];
    }
  }

  // 第五步：输出模块的exports属性
  return module.exports;
};
复制代码
```

接着上一题继续发问

### 1.3 加载模块时，为什么每个模块都有__dirname,__filename属性呢，new Module的时候我们看到1.1部分没有这两个属性的，那么这两个属性是从哪里来的

```
// 上面(1.2部分)的第四步module.load(filename)
// 这一步，module模块相当于被包装了，包装形式如下
// 加载js模块，相当于下面的代码（加载node模块和json模块逻辑不一样）
(function (exports, require, module, __filename, __dirname) {
  // 模块源码
  // 假如模块代码如下
  var math = require('math');
  exports.area = function(radius){
      return Math.PI * radius * radius
  }
});

复制代码
```

也就是说，每个module里面都会传入__filename, __dirname参数，这两个参数并不是module本身就有的，是外界传入的

### 1.4 我们知道node导出模块有两种方式，一种是exports.xxx=xxx和Module.exports={}有什么区别吗

- exports其实就是module.exports

这些题目收集的不好，要再多收集收集

### 2.3 请描述一下整个异步I/O的流程

![img](https://user-gold-cdn.xitu.io/2019/7/19/16c091766912eef7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

发起异步调用，封装请求对象，设置参数和回调函数，然后将异步操作放入线程池中等待被执行。线程可用的时候，执行请求对象中的io操作，执行完了讲结果放在请求对象中，然后通知iocp调用完成，归还线程。在事件循环中，从io观察者取到已经完成的io对象，拿到回到函数和结果，然后执行。

## 3、V8的垃圾回收机制

### 3.1 如何查看V8的内存使用情况

使用process.memoryUsage(),返回如下

```
{
  rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472,
  external: 49879
}
复制代码
```

heapTotal 和 heapUsed 代表V8的内存使用情况。 external代表V8管理的，绑定到Javascript的C++对象的内存使用情况。 rss, 驻留集大小, 是给这个进程分配了多少物理内存(占总分配内存的一部分) 这些物理内存中包含堆，栈，和代码段

v8垃圾回收和浏览器一样

**三、事件监听**

Node.js 的事件监听也可能出现的内存泄漏。例如对同一个事件重复监听，忘记移除(removeListener)，将造成内存泄漏。这种情况很容易在复用对象上添加事件时出现，所以事件重复监听可能收到如下警告：

想要定位内存泄漏，通常会有两种情况：

- 对于只要正常使用就可以重现的内存泄漏，这是很简单的情况只要在测试环境模拟就可以排查了。
- 对于偶然的内存泄漏，一般会与特殊的输入有关系。想稳定重现这种输入是很耗时的过程。如果不能通过代码的日志定位到这个特殊的输入，那么推荐去生产环境打印内存快照了。
- 需要注意的是，打印内存快照是很耗 CPU 的操作，可能会对线上业务造成影响。 快照工具推荐使用 heapdump 用来保存内存快照，使用 devtool 来查看内存快照。
- 使用 heapdump 保存内存快照时，只会有 Node.js 环境中的对象，不会受到干扰(如果使用 node-inspector 的话，快照中会有前端的变量干扰)。
- PS：安装 heapdump 在某些 Node.js 版本上可能出错，建议使用 npm install heapdump -target=Node.js 版本来安装。

---

## 5、webSocket

### 5.1 webSocket与传统的http有什么优势

- 客户端与服务器只需要一个TCP连接，比http长轮询使用更少的连接
- webSocket服务端可以推送数据到客户端
- 更轻量的协议头，减少数据传输量

### 5.2 webSocket协议升级时什么，能简述一下吗？

首先，WebSocket连接必须由浏览器发起，因为请求协议是一个标准的HTTP请求，格式如下：

```
GET ws://localhost:3000/ws/chat HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Origin: http://localhost:3000
Sec-WebSocket-Key: client-random-string
Sec-WebSocket-Version: 13
复制代码
```

该请求和普通的HTTP请求有几点不同：

- GET请求的地址不是类似/path/，而是以ws://开头的地址；
- 请求头Upgrade: websocket和Connection: Upgrade表示这个连接将要被转换为WebSocket连接；
- Sec-WebSocket-Key是用于标识这个连接，并非用于加密数据；
- Sec-WebSocket-Version指定了WebSocket的协议版本。

随后，服务器如果接受该请求，就会返回如下响应：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string
复制代码
```

该响应代码101表示本次连接的HTTP协议即将被更改，更改后的协议就是Upgrade: websocket指定的WebSocket协议。

> 长轮询(长连接，邮箱聊天）
>
> 程序每发出一次请求就要新建一个Http请求。因为发起Http请求时会有很多头部信息，真正的请求信息几乎很少，这样就会造成资源浪费，频繁的轮询使得Web服务器遭受"凌迟"之苦。
>
> 而长轮询意味着浏览器只需启动一个HTTP请求，其连接的服务器会“hold”住此次连接，直到有新消息才返回响应信息并关闭连接，客户端处理完响应信息后再向服务器发送新的Http请求,以此类推。



### 请问创建子进程的方法有哪些，简单说一下它们的区别

创建子进程的方法大致有：

- spawn()： 启动一个子进程来执行命令
- exec(): 启动一个子进程来执行命令，与spawn()不同的是其接口不同，它有一个回调函数获知子进程的状况
- execFlie(): 启动一个子进程来执行可执行文件
- fork(): 与spawn()类似，不同电在于它创建Node子进程需要执行js文件
- spawn()与exec()、execFile()不同的是，后两者创建时可以指定timeout属性设置超时时间，一旦创建的进程超过设定的时间就会被杀死
- exec()与execFile()不同的是，exec()适合执行已有命令，execFile()适合执行文件

### 请问你知道spawn在创建子进程的时候，第三个参数有一个stdio选项吗，这个选项的作用是什么，默认的值是什么。

- 选项用于配置在父进程和子进程之间建立的管道。
- 默认情况下，子进程的 stdin、 stdout 和 stderr 会被重定向到 ChildProcess 对象上相应的 subprocess.stdin、subprocess.stdout 和 subprocess.stderr 流。
- 这相当于将 options.stdio 设置为 ['pipe', 'pipe', 'pipe']。

> child_process.spawn 使用指定的命令行参数创建新进程，语法格式如下：
>
> ```
> child_process.spawn(command[, args][, options])
> ```
>
> **参数** 参数说明如下： **command**： 将要运行的命令 **args**： Array 字符串参数数组 **options Object**
>
> - cwd String 子进程的当前工作目录
> - env Object 环境变量键值对
> - stdio Array|String 子进程的 stdio 配置
> - detached Boolean 这个子进程将会变成进程组的领导
> - uid Number 设置用户进程的 ID
> - gid Number 设置进程组的 ID
>
> spawn() 方法返回流 (stdout & stderr)，在进程返回大量数据时使用。进程一旦开始执行时 spawn() 就开始接收响应。
>
> **实例** 让我们创建两个 js 文件 support.js 和 master.js。 support.js 文件代码：
>
> ```
> console.log("进程 " + process.argv[2] + " 执行。" );
> ```
>
> master.js 文件代码：
>
> ```js
> const fs = require('fs');
> const child_process = require('child_process');
> 
> for(var i=0; i<3; i++) {
>    var workerProcess = child_process.spawn('node', ['support.js', i]);
> 
>    workerProcess.stdout.on('data', function (data) {
>       console.log('stdout: ' + data);
>    });
> 
>    workerProcess.stderr.on('data', function (data) {
>       console.log('stderr: ' + data);
>    });
> 
>    workerProcess.on('close', function (code) {
>       console.log('子进程已退出，退出码 '+code);
>    });
> }
> ```
>
> 

### 请问实现一个node子进程被杀死，然后自动重启代码的思路

- 在创建子进程的时候就让子进程监听exit事件，如果被杀死就重新fork一下

```
var createWorker = function(){
    var worker = fork(__dirname + 'worker.js')
    worker.on('exit', function(){
        console.log('Worker' + worker.pid + 'exited');
        // 如果退出就创建新的worker
        createWorker()
    })
}
```


比如链路层通过什么协议根据IP地址获取物理地址（arp），网关是什么，ip里的ICMP协议有什么用

udp和tcp的区别，udp里的广播和组播是什么，组播在node里通过什么模块实现。

---

把列出的这些问题好好看看，准备下

然后就是大佬发给我的node总结，也好好看看

---

### Node 所熟悉的框架，谈谈 express是如何从一个中间件执行到下一个中间件的(express的路由机制)？

### Express和koa 或者egg的区别？

**todo： express中间件**

日志平台，前端监控