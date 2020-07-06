页面层面优化

代码优化

##　原型的理解

已经“初始化”挂载在内置的 `__proto__` 对象上了。这个内置的 `__proto__` 是一个指向原型对象的指针，它会在创建一个新的引用类型对象时（显示或者隐式）自动创建

完成一个构造函数声明的同时，原型prototype会自动挂载到构造函数中，通过new创建的实例会自动挂载隐式原型，该对象指向构造函数的原型。



原生写一个弹窗

```html
show({ type = 'info', text = '' }) {
    // 创建一个Element对象
    let messageEl = document.createElement('div');
    // 设置消息class，这里加上move-in可以直接看到弹出效果
    messageEl.className = 'message move-in';
    // 消息内部html字符串
    messageEl.innerHTML = `
    <span class="icon icon-${type}"></span>
    <div class="text">${text}</div>
    <div class="close icon icon-close"></div>
    `;
    // 追加到message-container末尾
    // this.containerEl属性是我们在构造函数中创建的message-container容器
    this.containerEl.appendChild(messageEl);
}
```

虚拟dom的算法（没讲清楚）

gzip如何配置

```js
module.exports = {
  // outputDir:process.env.outputDir,
  //webpack设置
  publicPath: "/factory_ems",
  chainWebpack: config => {
    config.module
      .rule("js")
      .test("/.js/")
      .use("babel-loader");
  },
  configureWebpack: (config => {
    const plugins = []
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      })
    )
    config.plugins = plugins
    return config
  })({}),
```

http状态码



