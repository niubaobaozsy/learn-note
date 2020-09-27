# node面试题

##  一篇文章构建你的 NodeJS 知识体系

## 读写流

```
const fs = require('fs');
const readable = fs.createReadStream('./original.txt');
const writeable = fs.createWriteStream('./copy.txt');
readable.pipe(writeable);
```

## 文件监控

`fs.watchFile` 比 `fs.watch` 低效，但更好用。

NodeJS 使用 `net` 模块创建 TCP 连接和服务。

## UDP 客户端

利用 `dgram` 模块创建数据报 `socket`，然后利用 `socket.send` 发送数据。

## HTTP 客户端

使用 `http.createServer` 和 `http.createClient` 运行 HTTP 服务。

### 重定向

HTTP 标准定义了标识重定向发生时的状态码，它也指出了客户端应该检查无限循环。

- 300：多重选择
- 301：永久移动到新位置
- 302：找到重定向跳转
- 303：参见其他信息
- 304：没有改动
- 305：使用代理
- 307：临时重定向 

### HTTP 代理

- ISP 使用透明代理使网络更加高效
- 使用缓存代理服务器减少宽带
- Web 应用程序的 DevOps 利用他们提升应用程序性能

## DNS 请求

使用 `dns` 模块创建 DNS 请求。

- A：`dns.resolve`，A 记录存储 IP 地址
- TXT：`dns.resulveTxt`，文本值可以用于在 DNS 上构建其他服务
- SRV：`dns.resolveSrv`，服务记录定义服务的定位数据，通常包含主机名和端口号
- NS：`dns.resolveNs`，指定域名服务器
- CNAME：`dns.resolveCname`，相关的域名记录，设置为域名而不是 IP 地址

```
const dns = require('dns');

dns.resolve('www.chenng.cn', function (err, addresses) {
  if (err) {
    console.error(err);
  }

  console.log('Addresses:', addresses);
});
```

## 发起 HTTP 请求的方法

- HTTP 标准库
  - 无需安装外部依赖
  - 需要以块为单位接受数据，自己监听 end 事件
  - HTTP 和 HTTPS 是两个模块，需要区分使用
- Request 库
  - 使用方便
  - 有 promise 版本 `request-promise`
- Axios
  - 既可以用在浏览器又可以用在 NodeJS
  - 可以使用 axios.all 并发多个请求
- SuperAgent
  - 可以链式使用
- node-fetch
  - 浏览器的 fetch 移植过来的

# 子进程

## 执行外部应用

### 基本概念

- 4个异步方法：exec、execFile、fork、spawn
  - Node
    - fork：想将一个 Node 进程作为一个独立的进程来运行的时候使用，是的计算处理和文件描述器脱离 Node 主进程
  - 非 Node
    - spawn：处理一些会有很多子进程 I/O 时、进程会有大量输出时使用
    - execFile：只需执行一个外部程序的时候使用，执行速度快，处理用户输入相对安全
    - exec：想直接访问线程的 shell 命令时使用，一定要注意用户输入
- 3个同步方法：execSync、execFileSync、spawnSync
- 通过 API 创建出来的子进程和父进程没有任何必然联系

### execFile

- 会把输出结果缓存好，通过回调返回最后结果或者异常信息

```
const cp = require('child_process');

cp.execFile('echo', ['hello', 'world'], (err, stdout, stderr) => {
  if (err) { console.error(err); }
  console.log('stdout: ', stdout);
  console.log('stderr: ', stderr);
});
复制代码
```

### spawn

- 通过流可以使用有大量数据输出的外部应用，节约内存
- 使用流提高数据响应效率
- spawn 方法返回一个 I/O 的流接口

#### 单一任务

```
const cp = require('child_process');

const child = cp.spawn('echo', ['hello', 'world']);
child.on('error', console.error);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
复制代码
```

#### 多任务串联

```
const cp = require('child_process');
const path = require('path');

const cat = cp.spawn('cat', [path.resolve(__dirname, 'messy.txt')]);
const sort = cp.spawn('sort');
const uniq = cp.spawn('uniq');

cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);
复制代码
```

### exec

- 只有一个字符串命令
- 和 shell 一模一样

```
const cp = require('child_process');

cp.exec(`cat ${__dirname}/messy.txt | sort | uniq`, (err, stdout, stderr) => {
  console.log(stdout);
});
复制代码
```

### fork

- fork 方法会开发一个 IPC 通道，不同的 Node 进程进行消息传送
- 一个子进程消耗 30ms 启动时间和 10MB 内存
- 子进程：`process.on('message')`、`process.send()`
- 父进程：`child.on('message')`、`child.send()`


不同的创建子进程的方法不同，有各自适应的场景

## Cluster 的理解

- 解决 NodeJS 单进程无法充分利用多核 CPU 问题
- 通过 master-cluster 模式可以使得应用更加健壮
- Cluster 底层是 child_process 模块，除了可以发送普通消息，还可以发送底层对象 `TCP`、`UDP` 等
- TCP 主进程发送到子进程，子进程能根据消息重建出 TCP 连接，Cluster 可以决定 fork 出合适的硬件资源的子进程数

cluster：监听tcp端口，分发给多核对应个数的进程，达到充分利用多核cpu资源

# Node 多线程

## 单线程问题

- 对 cpu 利用不足
- 某个未捕获的异常可能会导致整个程序的退出

## 异步 IO

- Node 中有一些 IO 操作（DNS，FS）和一些 CPU 密集计算（Zlib，Crypto）会启用 Node 的线程池
- 线程池默认大小为 4，可以手动更改线程池默认大小

```
process.env.UV_THREADPOOL_SIZE = 64
复制代码
```

## cluster 多进程

```
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是 HTTP 服务器。
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World');
  }).listen(8000);
  console.log(`工作进程 ${process.pid} 已启动`);
}
复制代码
```

- 一共有 9 个进程，其中一个主进程，cpu 个数 x cpu 核数 = 2 x 4 = 8 个 子进程
- 无论 child_process 还是 cluster，都不是多线程模型，而是多进程模型
- 应对单线程问题，通常使用多进程的方式来模拟多线程

## 真 Node 多线程

- Node 10.5.0 的发布，给出了一个实验性质的模块 worker_threads 给 Node 提供真正的多线程能力
- worker_thread 模块中有 4 个对象和 2 个类
  - isMainThread: 是否是主线程，源码中是通过 threadId === 0 进行判断的。
  - MessagePort: 用于线程之间的通信，继承自 EventEmitter。
  - MessageChannel: 用于创建异步、双向通信的通道实例。
  - threadId: 线程 ID。
  - Worker: 用于在主线程中创建子线程。第一个参数为 filename，表示子线程执行的入口。
  - parentPort: 在 worker 线程里是表示父进程的 MessagePort 类型的对象，在主线程里为 null
  - workerData: 用于在主进程中向子进程传递数据（data 副本）

## 多进程 vs 多线程

进程是资源分配的最小单位，线程是CPU调度的最小单位异常处理

## 处理未捕获的异常

- 除非开发者记得添加.catch语句，在这些地方抛出的错误都不会被 uncaughtException 事件处理程序来处理，然后消失掉。
- Node 应用不会奔溃，但可能导致内存泄露

## 通过 domain 管理异常

- 通过 domain 模块的 create 方法创建实例
- 某个错误已经任何其他错误都会被同一个 error 处理方法处理
- 任何在这个回调中导致错误的代码都会被 domain 覆盖到
- 允许我们代码在一个沙盒运行，并且可以使用 res 对象给用户反馈

**以 Chrome 浏览器中为例，当你打开一个 Tab 页时，其实就是创建了一个进程，一个进程中可以有多个线程（下文会详细介绍），比如渲染线程、JS 引擎线程、HTTP 请求线程等等。当你发起一个请求时，其实就是创建了一个线程，当请求结束后，该线程可能就会被销毁。**

| 属性       | 多进程                                          | 多线程                                   | 比较       |
| ---------- | ----------------------------------------------- | ---------------------------------------- | ---------- |
| 数据       | 数据共享复杂，需要用IPC；数据是分开的，同步简单 | 因为共享进程数据，数据共享简单，同步复杂 | 各有千秋   |
| CPU、内存  | 占用内存多，切换复杂，CPU利用率低               | 占用内存少，切换简单，CPU利用率高        | 多线程更好 |
| 销毁、切换 | 创建销毁、切换复杂，速度慢                      | 创建销毁、切换简单，速度很快             | 多线程更好 |
| coding     | 编码简单、调试方便                              | 编码、调试复杂                           | 多进程更好 |
| 可靠性     | 进程独立运行，不会相互影响                      | 线程同呼吸共命运                         | 多进程更好 |
| 分布式     | 可用于多机多核分布式，易于扩展                  | 只能用于多核分布式                       | 多进程更好 |

---

