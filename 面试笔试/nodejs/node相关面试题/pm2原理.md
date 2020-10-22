# pm2原理

会说自己用到过，肯定要看看

PM2 的功能、插件非常的丰富，但比较核心的功能其实不多：

1. 多进程管理
2. 系统信息监控
3. 日志管理

```js
# 删除了多个不相干的文件、文件夹
lib
├── API     # 日志管理、GUI 等辅助功能
├── God     # 多进程管理逻辑实现位置
└── Sysinfo # 系统信息采集
```

### 守护进程与 Client 进程通讯方式

看源码后会知道，PM2 与 Client 进程（也就是我们 `pm2 start XXX` 时对应的进程），是通过 RPC 进行通讯的，这样就能保证所有的 Client 进程可以与守护进程进行通讯，上报一些信息，以及从守护进程层面执行一些操作。

### PM2 启动程序的方式

![img](http://mmbiz.qpic.cn/sz_mmbiz_png/H8M5QJDxMHqHWSjbZELoH3PVq88t55Lic3iagAgicO5OvBCQ1UlyOhtz1dRRp1zEcMibqOafdLGDJUobtNP5SmTCXg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1&retryload=0)

**在进程重启的实现方式中，就是由子进程监听到异常事件，向守护进程发送异常日志的信息，然后发送 `disconnect` 表示进程即将退出，最后触发自身的 `exit` 函数终止掉进程。**
**同时守护进程在接收到消息以后，也会重新创建新的进程，从而完成了进程自动重启的逻辑。**



---

日志管理

![img](https://mmbiz.qpic.cn/sz_mmbiz_png/H8M5QJDxMHqHWSjbZELoH3PVq88t55LicDd6YmeTZNlcPraFrlo3H2DbBicmYFjcMqVSEotH9l3DKDe4ib9iaQ1kBg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

----

## pm2守护进程如何管理其他进程

**如何检测子进程是否处于正常活跃状态？**

采用心跳检测

```
每隔数秒向子进程发送心跳包，子进程如果不回复，那么调用kill杀死这个进程
然后再重新cluster.fork()一个新的进程
```

**子进程发出异常报错，如何保证一直有一定数量子进程？**

```
子进程可以监听到错误事件，这时候可以发送消息给主进程，请求杀死自己
并且主进程此时重新调用cluster.fork一个新的子进程
```

目前不少`Node.js`的服务，依赖`Nginx+pm2+docker`来实现自动化+监控部署，

找不到资料，暂时这样理解