# webpack

`webpack`的劣势在哪里

`webpack`针对模块化做的处理

webpack与grunt、gulp的不同？

与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？

有哪些常见的Loader？他们是解决什么问题的？

有哪些常见的Plugin？他们是解决什么问题的？

Loader和Plugin的不同？

webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全

是否写过Loader和Plugin？描述一下编写loader或plugin的思路？

webpack的热更新是如何做到的？说明其原理？

如何利用webpack来优化前端性能？（提高性能和体验）

如何提高webpack的构建速度？

怎么配置单页应用？怎么配置多页应用？

npm打包时需要注意哪些？如何利用webpack来更好的构建？

如何在vue项目中实现按需加载？


作者：Leonardo-zyh链接：https://juejin.im/post/5d199ab15188255d6924028b来源：掘金著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



----

https://juejin.im/post/5e03fe81f265da33cd03c0fd

git中webpack问题

# Webpack Tree shaking 原理

Tree shaking的本质是消除无用的JavaScript代码。
因为ES6模块的出现，ES6模块依赖关系是确定的，`和运行时的状态无关`，可以进行可靠的静态分析，
这就是Tree shaking的基础。

---

HMR热更新

基本实现原理大致这样的，构建 bundle 的时候，加入一段 HMR runtime 的 js 和一段和服务沟通的 js 。文件修改会触发 webpack 重新构建，服务器通过向浏览器发送更新消息，浏览器通过 jsonp 拉取更新的模块文件，jsonp 回调触发模块热替换逻辑

---

## dll

1. 第一次请求的时候，把请求后的内容**存储**起来
2. 建立一个**映射表**，当后续有请求时，先根据这个映射表到看看要请求的内容有没有被缓存，有的话就加载缓存，没有就走正常请求流程（也就是所谓的**缓存命中**问题）
3. 命中缓存后，直接从缓存中拿取内容，交给程序处理

dll 加速不明显了，有没有更好的替代品？在 [AutoDllPlugin](https://github.com/asfktz/autodll-webpack-plugin) 的 README.md 里，给我们推荐了 [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin)，初始配置更简单，只需要一行代码：

```
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  // ......
  plugins: [
    new HardSourceWebpackPlugin() // <- 直接加入这行代码就行
  ]
}
```

