# 阻塞io和非阻塞io

https://juejin.im/post/6844903958629056519#heading-1

学node要学的好，底层知识少不了

1. `Linux` 的 `I/O` 基础知识；

2. `I/O` 模型含义与现有的几类：

3. 1. 阻塞 `I/O`；
   2. 多线程阻塞 `I/O`;
   3. 非阻塞 `I/O`**；**
   4. `I/O`多路复用**：**`select`/`poll`/ `epoll`**；**
   5. 异步`I/O`

4. `libuv` 中如何解决 `I/O` 的问题。

node的事件驱动非阻塞io，看下那个书吧