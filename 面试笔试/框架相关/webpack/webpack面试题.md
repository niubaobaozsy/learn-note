## webpack 的分包了解吗？

```
splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
      },
      default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
      }
    }
}
复制代码
```

- chunks: 表示从哪些chunks里抽取代码，有三个值：
- 1. initial：初始块，分开打包异步\非异步模块
  2. async：按需加载块, 类似initial，但是不会把同步引入的模块提取到vendors中
  3. all：全部块，无视异步\非异步，如果有异步，统一为异步，也就是提取成一个块，而不是放到入口文件打包内容中

将不同功能打包成不同的chunks

属于优化部分，根据分组来进行分包打包

minSize代表最小块大小，如果超出那么则分包，该值为压缩前的。也就是先分包，再压缩

minchunks表示最小引用次数，默认为1

maxAsyncRequests: 按需加载时候最大的并行请求数，默认为5

maxInitialRequests: 一个入口最大的并行请求数，默认为3

automaticNameDelimiter表示打包后人口文件名之间的连接符

name表示拆分出来块的名字

cacheGroups：缓存组，除了上面所有属性外，还包括

- test：匹配条件，只有满足才会进行相应分包，支持函数 正则 字符串
- priority：执行优先级，默认为0
- reuseExistingChunk：如果当前代码块包含的模块已经存在，那么不在生成重复的块



## 你们项目是用 webpack 还是 rollup？为什么？

webpack更全能，更好用静态文件，热更行，分包

## tree-shaking 是基于什么实现的？

## Tree-Shaking的原理

这里我不多冗余阐述，直接贴百度外卖前端的一篇文章：[Tree-Shaking性能优化实践 - 原理篇](https://juejin.im/post/5a4dc842518825698e7279a9)。

如果懒得看文章，可以看下如下总结：

1. ES6的模块引入是静态分析的，故而可以在编译时正确判断到底加载了什么代码。
2. 分析程序流，判断哪些变量未被使用、引用，进而删除此代码。

Dead Code 一般具有以下几个特征

•代码不会被执行，不可到达

•代码执行的结果不会被用到

•代码只会影响死变量（只写不读）



其实也不是上面提到的三个工具，rollup，webpack，cc做的，而是著名的代码压缩优化工具uglify（丑陋的读音），uglify完成了javascript的DCE

**前面提到了tree-shaking更关注于无用模块的消除，消除那些引用了但并没有被使用的模块。**

**其实tree-shaking的消除原理是依赖于ES6的模块特性。**

![img](https://user-gold-cdn.xitu.io/2018/1/4/160bfd6bb8832182?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

依赖关系是确定的，和运行时的状态无关，所以可以进行可靠的静态分析，然后进行消除

所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6之前的模块化，比如我们可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化

- rollup只处理函数和顶层的import/export变量，不能把没用到的类的方法消除掉
- javascript动态语言的特性使得静态分析比较困难

> tree-shaking对函数效果较好

函数的副作用相对较少，顶层函数相对来说更容易分析，加上babel默认都是"use strict"严格模式，减少顶层函数的动态访问的方式，也更容易分析

> 对于相同的输入就有相同的输出，不依赖外部环境，也不改变外部环境。

符合上述就可以称为纯函数，不符合就是不纯的，是具有副作用的，是可能对外界造成影响的



静态分析，分析有没有用到这个依赖然后进行tree-shaking

## 静态语法分析是怎样的一个过程？

ast树

## tree-shaking 一开始是哪个工具提出实现的呢？

Tree-Shaking在前端界由[rollup](https://github.com/rollup/rollup)首先提出并实现，后续[webpack](https://github.com/webpack/webpack)在2.x版本也借助于[UglifyJS](https://github.com/mishoo/UglifyJS2)实现了

rollup也是模块打包工具

### 使用rollup打包JavaScript库

吃了那么多亏后，我们终于明白，打包工具库、组件库，还是rollup好用，为什么呢？

1. 它支持导出ES模块的包。
2. 它支持程序流分析，能更加正确的判断项目本身的代码是否有副作用。

我们只要通过rollup打出两份文件，一份umd版，一份ES模块版，它们的路径分别设为`main`，`module`的值。这样就能方便使用者进行tree-shaking。

-----

问题tree-shaking原理是啥，omg头疼

webpack4 可以标记某个函数无副作用，前面价格注释说明是纯函数

**file.js**

```javascript
/*#__PURE__*/ double(55);
```

）

## webpack tree-shaking 原理

webpack对代码进行标记，把import & export标记为3类：

  \- 所有import标记为`/* harmony import */`

  \- 被使用过的export标记为`/harmony export([type])/`，其中[type]和webpack内部有关，可能是binding，immutable等；

  \- 没有被使用的export标记为`/* unused harmony export [FuncName] */`，其中[FuncName]为export的方法名，之后使用Uglifyjs（或者其他类似的工具）进行代码精简，把没用的都删除。

Uglifyjs： 应该是webpack优化阶段进行代码压缩，简化，对抽象语法树的优化

#### 代码删除：

- uglify：判断程序流，判断变量是否被使用和引用，进而删除代码

实现原理可以简单的概况：

1. ES6 Module引入进行静态分析，故而编译的时候正确判断到底加载了那些模块
2. 静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码



最后再看下百度云盘下载的两节原理性的内容

## compiler和compliation的区别

Compiler 和 Compilation 的含义如下：

- Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
- Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。

Compiler 和 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一个模块的编译

所有需要输出的资源会存放在 `compilation.assets` 中，`compilation.assets` 是一个键值对，键为需要输出的文件名称，值为文件对应的内容。

-----

更多文章：很累，看烦了，不想看了，之后再看

https://segmentfault.com/a/1190000012840742

webpack先准备到这里

复习的时候重点复习整个构建流程