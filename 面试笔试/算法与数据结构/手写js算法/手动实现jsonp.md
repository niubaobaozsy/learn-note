- 1.将传入的data数据转化为url字符串形式
- 2.处理url中的回调函数
- 3.创建一个script标签并插入到页面中
- 4.挂载回调函数

```js
//     jsonp是一种跨域通信的手段，它的原理其实很简单：

// 首先是利用script标签的src属性来实现跨域。
// 通过将前端方法作为参数传递到服务器端，然后由服务器端注入参数之后再返回，实现服务器端向客户端通信。  
// 由于使用script标签的src属性，因此只支持get方法
// 下面详细讲讲如何实现jsonp。

// 1. 实现流程
// 设定一个script标签

// <script src="http://jsonp.js?callback=xxx">
// callback定义了一个函数名，而远程服务端通过调用指定的函数并传入参数来实现传递参数，将fn(response)传递回客户端  返回给客服端之后，就执行这个回调函数，只要是全局的就行

// $callback = !empty($_GET['callback']) ? $_GET['callback'] : 'callback';
// echo $callback.'(.json_encode($data).)';
// 客户端接收到返回的js脚本，开始解析和执行fn(response)
function JSONP({  
  url,
  params,
  callbackKey,
  callback
}) {
  // 唯一 id，不存在则初始化
  JSONP.callbackId = JSONP.callbackId || 1
  params = params || {}
    // 传递的 callback 名，和下面预留的一致
  params[callbackKey] = `JSONP.callbacks[${JSONP.callbackId}]`
    // 不要污染 window
  JSONP.callbacks = JSONP.callbacks || []
    // 按照 id 放置 callback
  JSONP.callbacks[JSONP.callbackId] = callback
  const paramKeys = Object.keys(params)
  const paramString = paramKeys
    .map(key => `${key}=${params[key]}`)
    .join('&')
  const script = document.createElement('script')
  script.setAttribute('src', `${url}?${paramString}`)
  document.body.appendChild(script)
    // id 占用，自增
  JSONP.callbackId++
}

JSONP({  
  url: 'http://s.weibo.com/ajax/jsonp/suggestion',
  params: {
    key: 'test',
  },
  callbackKey: '_cb',
  callback(result) {
    console.log(result.data)
  }
})
JSONP({  
  url: 'http://s.weibo.com/ajax/jsonp/suggestion',
  params: {
    key: 'excited',
  },
  callbackKey: '_cb',
  callback(result) {
    console.log(result.data)
  }
})
```

