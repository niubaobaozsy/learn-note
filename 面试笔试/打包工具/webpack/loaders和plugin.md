## 3 plugin

### 3.1 什么是plugin？

在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

> plugin和loader的区别是什么？

对于loader，它就是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程

plugin是一个扩展器，它丰富了wepack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。

### 3.2 一个最简的插件

/plugins/MyPlugin.js（本地插件）

```js
class MyPlugin {
  // 构造方法
  constructor (options) {
    console.log('MyPlugin constructor:', options)
  }
  // 应用函数
  apply (compiler) {
    // 绑定钩子事件
    compiler.plugin('compilation', compilation => {
      console.log('MyPlugin')
    ))
  }
}

module.exports = MyPlugin
复制代码
```

webpack配置

```js
const MyPlugin = require('./plugins/MyPlugin')
module.exports = {
  entry: {
    index: './src/js/index.js'
  },
  plugins: [
    ...,
    new MyPlugin({param: 'xxx'})
  ],
  ...
};
复制代码
```

这就是一个最简单的插件（虽然我们什么都没干）

- webpack 启动后，在读取配置的过程中会先执行 new MyPlugin(options) 初始化一个 MyPlugin 获得其实例。
- 在初始化 compiler 对象后，再调用 myPlugin.apply(compiler) 给插件实例传入 compiler 对象。
- 插件实例在获取到 compiler 对象后，就可以通过 compiler.plugin(事件名称, 回调函数) 监听到 Webpack 广播出来的事件。
- 并且可以通过 compiler 对象去操作 webpack。

> 看到这里可能会问compiler是啥，compilation又是啥？

- **Compiler 对象包含了 Webpack 环境所有的的配置信息**，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
- **Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等**。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。

#### Compiler 和 Compilation 的区别在于：

Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。

todo: plugin监听的是那些事件？？

### 3.3 事件流

- webpack 通过 Tapable 来组织这条复杂的生产线。
- webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。
- webpack 的事件流机制应用了观察者模式，和 Node.js 中的 EventEmitter 非常相似。

绑定事件

```
compiler.plugin('event-name', params => {
  ...	  
});
复制代码
```

触发事件

```js
compiler.apply('event-name',params)
复制代码
```

### 3.4 需要注意的点

- 只要能拿到 Compiler 或 Compilation 对象，就能广播出新的事件，所以在新开发的插件中也能广播出事件，给其它插件监听使用。
- 传给每个插件的 Compiler 和 Compilation 对象都是同一个引用。也就是说在一个插件中修改了 Compiler 或 Compilation 对象上的属性，会影响到后面的插件。
- **有些事件是异步的，这些异步的事件会附带两个参数，第二个参数为回调函数，在插件处理完任务时需要调用回调函数通知 webpack，才会进入下一处理流程**。例如：

```
compiler.plugin('emit',function(compilation, callback) {
  ...
    
  // 处理完毕后执行 callback 以通知 Webpack 
  // 如果不执行 callback，运行流程将会一直卡在这不往下执行 
  callback();
});
复制代码
```

关于complier和compilation，webpack定义了大量的钩子事件。开发者可以根据自己的需要在任何地方进行自定义处理。

[《compiler钩子文档》](https://www.webpackjs.com/api/compiler-hooks/)

[《compilation钩子文档》](https://www.webpackjs.com/api/compilation-hooks/)

### 主线剧情

让我们来回一下，我们的日常工作日，应该大多数分成3个阶段，上班前，上班中和下班后，这3个时间段。这三个时间段，我用了3中钩子类型，普通型，流水型和熔断型。 按照文档他们的解释是这样的：

- 普通型basic：这个比较好理解就是按照`tap`的注册顺序一个个向下执行。
- 流水型water：这个相对于basic的区别就是，虽然也是按照`tap`的顺序一个个向下执行，但是如果上一个tap有返回值，那么下一个tap的传入参数就是上一个tap的返回值。
- 熔断型bail：这个相对于water的区别就是，如果返回了null以外的值，就不继续执行了



### 3.5 手写一个plugin

场景：

小程序mpvue项目，通过webpack编译，生成子包（我们作为分包引入到主程序中），然后考入主包当中。生成子包后，里面的公共静态资源wxss引用地址需要加入分包的前缀：/subPages/enjoy_given。

在未编写插件前，生成的资源是这样的，这个路径如果作为分包引入主包，是没法正常访问资源的。



![image](https://user-gold-cdn.xitu.io/2018/10/11/1666279d1da0bef1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



所以需求来了：

修改dist/static/css/pages目录下，所有页面的样式文件(wxss文件)引入公共资源的路径。

因为所有页面的样式都会引用通用样式vender.wxss

```
那么就需要把@import "/static/css/vendor.wxss"; 改为：@import "/subPages/enjoy_given/static/css/vendor.wxss";
复制代码
```

OK 开始！

1）创建插件文件 CssPathTransfor.js



![image](https://user-gold-cdn.xitu.io/2018/10/11/1666279d22d74fec?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



CssPathTransfor.js

```
class CssPathTransfor {
  apply (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      console.log('--CssPathTransfor emit')
      // 遍历所有资源文件
      for (var filePathName in compilation.assets) {
        // 查看对应的文件是否符合指定目录下的文件
        if (/static\/css\/pages/i.test(filePathName)) {
          // 引入路径正则
          const reg = /\/static\/css\/vendor\.wxss/i
          // 需要替换的最终字符串
          const finalStr = '/subPages/enjoy_given/static/css/vendor.wxss'
          // 获取文件内容
          let content = compilation.assets[filePathName].source() || ''
          
          content = content.replace(reg, finalStr)
          // 重写指定输出模块内容
          compilation.assets[filePathName] = {
            source () {
              return content;
            },
            size () {
              return content.length;
            }
          }
        }
      }
      callback()
    })
  }
}
module.exports = CssPathTransfor
复制代码
```

看着挺多，实际就是遍历compilation.assets模块。对符合要求的文件进行正则替换。

2）修改webpack配置

```
var baseWebpackConfig = require('./webpack.base.conf')
var CssPathTransfor = require('../plugins/CssPathTransfor.js')

var webpackConfig = merge(baseWebpackConfig, {
  module: {...},
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {...},
  plugins: [
    ...,
    // 配置插件
    new CssPathTransfor(),
  ]
})
复制代码
```

插件编写完成后，执行编译命令



![image](https://user-gold-cdn.xitu.io/2018/10/11/1666279d209bee61?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

----

# loader

loaders是处理项目中文件的，

reverse-loader.js

```
module.exports = function (src) {
  if (src) {
    console.log('--- reverse-loader input:', src)
    src = src.split('').reverse().join('')
    console.log('--- reverse-loader output:', src)
  }
  return src;
}
```

源代码需要做一些填充就可以自己编写loader

src就是解析之后的js代码。

loaders必须是一个函数，不能是剪头函数，因为webpack要给他绑定this