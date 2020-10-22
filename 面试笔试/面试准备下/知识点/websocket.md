# websocket协议握手

websocket是Html5 提供的一个浏览器与服务器间进行全双工通讯的网络技术，依靠这种技术可以实现客户端和服务器端的长连接，双向实时通信。

### websocket握手

> websocket是基于http协议 也可以说借用了http完成了一部分握手

### websocket握手

> websocket是基于http协议 也可以说借用了http完成了一部分握手

- 客户端发送的握手请求

  ```
   GET  /chat HTTP/1.1
   Host: XXX.com
   Connection: Upgrade
   Upgrade: websocket
   Sec-WebSocket-Protocol: chat, superchat
   Sec-WebSocket-Version: 13
   Sec-WebSocket-key: XXXX
  复制代码
  ```

  上面依次介绍下

  1. GET  /chat HTTP/1.1

     可以是是chat 聊天 也可以game 游戏

  2. Connection: Upgrade Upgrade: websocket

     这告诉服务器给升级到websocket协议

  3. Sec-WebSocket-Protocol: chat, superchat

     用户自定义的字符串 在同一个url下 不同服务的所需要的协议 比如聊天chat 也可以其他的自定义

  4. Sec-WebSocket-Version 告诉服务器所使用的协议版本

  5. **Sec-WebSocket-Key  是base64加密的字符串  浏览器自动生成**

- 服务端响应客户端握手请求

  ```
  HTTP/1.1 101 Switching Protocols
  Upgrade: websocket
  Connection: Upgrade
  Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
  Sec-WebSocket-Protocol: chat
  复制代码
  ```

  上面依次介绍下

  1. HTTP/1.1 101 Switching Protocols  就是返回101状态码
  2. **Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk= 对Sec-WebSocket-key的加密 同意握手建立链接 客户端收到 Sec-WebSocket-Accept后 将本地的Sec-WebSocket-key 编码做一个对比来验证**

## 七、连接保持+心跳

WebSocket为了保持客户端、服务端的实时双向通信，需要确保客户端、服务端之间的TCP通道保持连接没有断开。然而，对于长时间没有数据往来的连接，如果依旧长时间保持着，可能会浪费包括的连接资源。

但不排除有些场景，客户端、服务端虽然长时间没有数据往来，但仍需要保持连接。这个时候，可以采用心跳来实现。

- 发送方->接收方：ping
- 接收方->发送方：pong

ping、pong的操作，对应的是WebSocket的两个控制帧，`opcode`分别是`0x9`、`0xA`。

举例，WebSocket服务端向客户端发送ping，只需要如下代码（采用`ws`模块）

```javascript
ws.ping('', false, true);
```

一旦WebSocket客户端、服务端建立连接后，后续的操作都是基于数据帧的传递。

WebSocket根据`opcode`来区分操作的类型。比如`0x8`表示断开连接，`0x0`-`0x2`表示数据交互