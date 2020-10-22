# node进程面试题

## 什么是进程和线程？之间的区别？

```
多进程就是进程的复制（fork），fork 出来的每个进程都拥有自己的独立空间地址、数据栈，一个进程无法访问另外一个进程里定义的变量、数据结构，只有建立了 IPC 通信，进程之间才可数据共享
```

```
Node.js 是 Javascript 在服务端的运行环境，构建在 chrome 的 V8 引擎之上，基于事件驱动、非阻塞I/O模型，充分利用操作系统提供的异步 I/O 进行多任务的执行，适合于 I/O 密集型的应用场景，因为异步，程序无需阻塞等待结果返回，而是基于回调通知的机制，原本同步模式等待的时间，则可以用来处理其它任务，在 Web 服务器方面，著名的 Nginx 也是采用此模式（事件驱动），Nginx 采用 C 语言进行编写，主要用来做高性能的 Web 服务器，不适合做业务。Web业务开发中，如果你有高并发应用场景那么 Node.js 会是你不错的选择。
```

## 什么是孤儿进程 g

父进程创建子进程之后，父进程退出了，但是父进程对应的一个或多个子进程还在运行，这些子进程会被系统的 init 进程收养，对应的进程 ppid 为 1，这就是孤儿进程。通过以下代码示例说明

僵尸进程

和孤儿进程相反的是，这次是子进程先退出，而父进程又没有去处理回收释放子进程的资源，这个时候子进程就成了僵尸进程。

那么孙进程被init接管，当孙进程结束后，init会回收。也就是要等到这个进程自己结束，结束之后init回收

https://www.cnblogs.com/anker/p/3271773.html

## 创建多进程时，代码里有 `app.listen(port)` 在进行 fork 时，为什么没有报端口被占用？

当父子进程之间建立 IPC 通道之后，通过子进程对象的 send 方法发送消息，第二个参数 sendHandle 就是句柄，可以是 TCP套接字、TCP服务器、UDP套接字等，为了解决上面多进程端口占用问题，我们将主进程的 socket 传递到子进程，修改代码，如下所示：

。

## 什么是 IPC 通信，如何建立 IPC 通信？什么场景下需要用到 IPC 通信？

## Node.js 是单线程还是多线程？进一步会提问为什么是单线程？g

第一个问题，Node.js 是单线程还是多线程？这个问题是个基本的问题，在以往面试中偶尔提到还是有不知道的，Javascript 是单线程的，但是做为其在服务端运行环境的 Node.js 并非是单线程的。

第二个问题，Javascript 为什么是单线程？这个问题需要从浏览器说起，在浏览器环境中对于 DOM 的操作，试想如果多个线程来对同一个 DOM 操作是不是就乱了呢，那也就意味着对于DOM的操作只能是单线程，避免 DOM 渲染冲突。在浏览器环境中 UI 渲染线程和 JS 执行引擎是互斥的，一方在执行时都会导致另一方被挂起，这是由 JS 引擎所决定的。



## 关于守护进程，是什么、为什么、怎么编写？g

**Node.js 编写守护进程 Demo 展示**

index.js 文件里的处理逻辑使用 spawn 创建子进程完成了上面的第一步操作。设置 options.detached 为 true 可以使子进程在父进程退出后继续运行（系统层会调用 setsid 方法），参考 [options_detached](http://nodejs.cn/api/child_process.html#child_process_options_detached)，这是第二步操作。options.cwd 指定当前子进程工作目录若不做设置默认继承当前工作目录，这是第三步操作。运行 daemon.unref() 退出父进程，参考 [options.stdio](http://nodejs.cn/api/child_process.html#child_process_options_stdio)，这是第四步操作。

```js
// index.js
const spawn = require('child_process').spawn;

function startDaemon() {
    const daemon = spawn('node', ['daemon.js'], {
        cwd: '/usr',
        detached : true,
        stdio: 'ignore',
    });

    console.log('守护进程开启 父进程 pid: %s, 守护进程 pid: %s', process.pid, daemon.pid);
    daemon.unref();
}

startDaemon()
```

没那么简单，这个守护进程要做哪些事情不知道

## 实现一个简单的命令行交互程序？

采用子进程 child_process 的 spawn 方法，如下所示：

```js
const spawn = require('child_process').spawn;
const child = spawn('echo', ["简单的命令行交互"]);
child.stdout.pipe(process.stdout); // 将子进程的输出做为当前进程的输入，打印在控制台
```



## 如何让一个 js 文件在 Linux 下成为一个可执行命令程序？

1. 新建 hello.js 文件，头部须加上 `#!/usr/bin/env node`，表示当前脚本使用 Node.js 进行解析
2. 赋予文件可执行权限 chmod +x chmod +x /${dir}/hello.js，目录自定义
3. 在 /usr/local/bin 目录下创建一个软链文件 `sudo ln -s /${dir}/hello.js /usr/local/bin/hello`，文件名就是我们在终端使用的名字
4. 终端执行 hello 相当于输入 node hello.js

```
#!/usr/bin/env node

console.log('hello world!');
复制代码
```

终端测试

```
$ hello
hello world!
```

## 进程的当前工作目录是什么? 有什么作用？

## 多进程或多个 Web 服务之间的状态共享问题？

还会出现我在 A 机器上创建了 Session，当负载均衡分发到 B 机器上之后还需要在创建一份。一般的做法是通过 Redis 或者 数据库来做数据共享