https://cloud.tencent.com/developer/article/1533060

这个可以好好看看

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello Semlinker!");
});

server.listen(3000, () => {
  console.log("server listen on 3000");
});
```



- 调用 `http.createServer()` 方法创建 server 对象，该对象创建完后，我们调用 `listen()` 方法执行监听操作。
- 当 server 接收到客户端的连接请求，在成功创建 socket 对象后，会触发 `connection` 事件。
- 当 `connection` 事件触发后，会执行对应的 `connectionListener` 回调函数。在函数内部会利用 HTTPParser 对象，对请求报文进行解析。
- 在完成请求头的解析后，会创建 IncomingMessage 对象，并填充相关的属性，比如 url、httpVersion、method 和 headers 等。
- 在配置完 IncomingMessage 对象后，会调用 parserOnIncoming 函数，在该函数内会构建 ServerResponse 响应对象，如果请求头不包含 expect 字段，则 server 就会触发 `request` 事件，并传递当前的请求对象和响应对象。
- `request` 事件触发后，就会执行我们设定的 `requestListener` 函数。

问题在于： 不知道这个模块的面试题是什么