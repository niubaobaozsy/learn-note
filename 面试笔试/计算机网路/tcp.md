# tcp

今天看到vue面试题

TCP的面试题通常情况下前端不会涉及太多，此章主要面对node.js工程师。

## [#](https://www.cxymsg.com/guide/tcp.html#tcp-的特性)TCP 的特性

- TCP 提供一种面向连接的、可靠的字节流服务
- 在一个 TCP 连接中，仅有两方进行彼此通信。广播和多播不能用于 TCP
- TCP 使用校验和，确认和重传机制来保证可靠传输
- TCP 给数据分节进行排序，并使用累积确认保证数据的顺序不变和非重复
- TCP 使用滑动窗口机制来实现流量控制，通过动态改变窗口的大小进行拥塞控制

----

[https://www.cxymsg.com/guide/tcp.html#%E8%AE%B2%E4%B8%80%E4%B8%8B%E5%9B%9B%E6%AC%A1%E6%8F%A1%E6%89%8B%EF%BC%9F%E2%9C%A8](https://www.cxymsg.com/guide/tcp.html#讲一下四次握手？✨)

