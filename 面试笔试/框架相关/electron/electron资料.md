肯定要准备electron面试题（准备的够全，让他们问不到我，冲冲冲）

electron 是如何通过 js 调动底层的文件操作？

----

# Electron 深度实践总结

https://changkun.us/archives/2017/03/217/

![img](https://changkun.us/images/posts/217/mind.png)

他做的这些，都可以好好准备下，应用到自己项目中，版本更新发布

electron监测网络状况： 心跳包，来判断网络是否良好

---

**重点讲了preload脚本用途**

### preload 脚本的执行阶段

在前面创建基本应用中我们已经谈到了关于 preload 脚本用来引入 jQeury 的使用，事实上我们可以用 preload 做更多的事情。preload 脚本会在整个页面开始加载之前被执行，所以如果我们直接执行一些当整个 DOM 加载完成才能被执行的操作，是必定会失效的，因此这样的两个事件是非常有用的：`DOMNodeInserted`、`DOMContentLoaded`。

为此，我们可以把 preload 脚本大致分为三块区域：

```
// ---------------------------------------------------
// 在页面加载之前需要执行的相关代码
// ...

// ---------------------------------------------------


// -------------------------------------------------------
document.addEventListener('DOMNodeInserted', (event) => {
	// 页面内容加载之前需要引入的一些代码
  	// ...
})
// -------------------------------------------------------


// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
	// 页面内容加载之后需要引入的一些操作
	// ...

})
// -------------------------------------------------------
```

preload 脚本的作用非常大，有时候会有这样的需求：当我们加载一个网络上的页面时，我们不能控制从网络中读取到的页面内容，但 preload 提供了这样的可能性，使得我们能够向页面 `注入` 一些代码，满足一些神奇的需求，比如对网络加载页面增加 Context Menu。但也有使用时值得注意的地方：

Electron 的 main 进程、preload 脚本、renderer 进程、以及 document 对象分别有彼此的创建和执行顺序。首先 main 进程会优先被创建毫无疑问，preload 会在 `document` 对象被创建之前优先加载（但能够使用 `document`），而 renderer 进程会在 `document` 创建之后被创建，而他们三者又是并发创建的，如下图所示。

[![img](https://changkun.us/images/posts/217/preload.png)](https://changkun.us/images/posts/217/preload.png)

那么，**如果我们不小心在 preload 脚本中直接引入 ipcRenderer 发送一条消息给 ipcMain，那么 ipcMain 可能不能收到这条早期消息。**为了保证我们能够收到这条消息，最好的方式就是:

```
// preload.js
// 不要再外面这么干
// ipcRenderer.send(...)

document.addEventListener('DOMContentLoaded', (event) => {
	// 页面内容加载之后需要引入的一些操作
	// ...
	// 正确的做法
	ipcRenderer.send(...)
})
```

----

### 下载

下载也是一个常见的需求，比如，你正在基于 Electron 实现一个 Web 文本应用，用户可能需要下载保存在服务器上的一个编辑好的文件，这时候当点击 Web 界面中的下载时，Electron 并不需要专门针对这个下载行为进行单独的处理，Electron 会想浏览器那样直接跳出一个保存的文件选择器，让用户获得下一步的操作。当我们真正需要处理一些特殊的下载操作时，同样可以用 electron 的 DownloadItem 来实现，但其接口设计着实有点让笔者难以接受，这里推荐可以尝试 `electron-userland/electron-download` 这个库，虽然其本质也是 DownloadItem，但其接口相比之下友善许多，因为库本身也并不复杂，也可以在项目中自行实现这部分逻辑。

这个有点老，可以考虑看看其他实现

----

## 软件更新

软件的日后更新一直都是产品日后迭代的杀手，一个需要被分发的桌面应用，在没有确定的更新机制之前，切忌发布。

Electron 虽然本身自带 audoUpdater 模块，但作为框架的使用者来说，笔者很难说它做得优秀，因为需要配置的内容相较于其他功能来说略加繁琐。因此这里推荐使用 `electron-updater`。下面的代码相当于一个纯粹的更新功能的封装，使用成本非常简单，只需根据 [electron-builder wiki](https://github.com/electron-userland/electron-builder/wiki/Auto-Update) 的说明配置好 publisher 即可实现更新功能：

这个肯定要考虑进去

---

**mocha 测试工具**

----

**业务和框架相关代码分离**（项目亮点）

一个比较简单的做法就是对 Electron 再做一层自定义的封装，将用到的 Electron 统一封装到一个脚本之内。例如：

----

### 压缩应用体积的方法（项目亮点）

Electron 应用体积动辄一百多兆的体积从他发布的第一天起到现在一直被人诟病，而其体积之所以如此之大的原因在于 **Electron 为其跨平台的支持，在内部打包了整个 V8 引擎，相当于一个功能完整的浏览器。**

曾经 Slack 作为仰仗 Electron 『大厂』， macOS 版本曾神奇的只有 20M 左右。但事实上那个时候的 Slack macOS 版本并不依赖 Electron，而是 [MacGap](http://docs.macgap.com/)（所以你可以看到现在的 Slack 全面转向 Electron 后也毫无疑问的成为了百兆应用的大户）。如果你打算使用 MapGap 来优化 Mac 版本的体积，请打住。简单阅读一下 MacGap 的文档就会发现，MacGap 的发展速度甚至赶不上 Electron，很多需求在 MacGap 上甚至无法实现，例如 preload 这样的功能就不具备。

所以无论你的 Electron 应用多么简单，都至少拥有超过 120M 的体积。这是相当不友好的。对于这个问题，笔者实践中找到了三种相对妥协，却能很好的解决问题的方案：

#### 1. 使用 `yarn clean`

我们知道 node 程序其实是将依赖库整个下载到了 `node_modules` 中，这也就包括一些 example 和 docs 和 test，而在 electron 应用被打包的过程中，这些依赖其实也是被耿直的打包进了应用之中。这也就无形之中增加了 Electron 应用的体积。

而使用 `yarn clean` 可以清除这些内容，从而一定程度上减少应用的体积。

#### 2. 将应用程序打包后再分发

Electron 应用本身的 bundle 确实高达 120M，但其压缩后的体积能够变得很小，尤其是 Windows 平台上的安装程序甚至能够被压缩到 33M 左右，而 macOS 和 Linux 的打包体积也将被压缩为 40M 左右。这其实是一个相当可观的体积了，如果配合下面提到的第三点方法，那么几乎向用户隐瞒了应用本身体积巨大的事实。正如笔者在前面提到的，推荐使用 electron-builder。

#### 3. 定制应用的更新功能

关于这一点内容，我们要从 Electron 打包应用的结构谈起。以 macOS 为例，Electron 应用最终被打包成了如下的结构：

```
ElectronApp.app
└── Contents
    ├── Frameworks
    │   ├── Changkun\ Blog\ Helper\ EH.app
    │   ├── Changkun\ Blog\ Helper\ NP.app
    │   ├── Changkun\ Blog\ Helper.app
    │   ├── Electron\ Framework.framework
    │   ├── Mantle.framework
    │   ├── ReactiveCocoa.framework
    │   └── Squirrel.framework
    ├── Info.plist
    ├── MacOS
    │   └── Changkun\ Blog
    ├── PkgInfo
    ├── Resources
    │   ├── Changkun\ Blog.icns
    │   ├── app-update.yml
    │   ├── app.asar
    │   ├── electron.asar
    │   ├── en.lproj
    │   ├── zh_CN.lproj
    │   └── zh_TW.lproj
    └── _CodeSignature
        └── CodeResources
```

在这个结构中，我们自己的核心代码，其实是被完整的打包进了 `Contents/Frameworks/Resources/app.asar` 中，其他内容则都是 electron 自身的依赖。**换句话说，我们只要更新了 `app.asar` 这个文件，也就相当于更新了整个应用。**我们再来看看这个文件的大小：

```
-rw-r--r--   1 changkun  admin   2.9M Mar 16 17:07 app.asar
```

这将是一个非常可观的下载量，配合第二点，用户第一次下载了一个不超过 50M 的应用安装程序，每次更新应用时，下载的内容也非常之少。当然，实现这一功能也并不复杂，我们只需要和自己的服务器进行通信，然后下载这个文件退出应用进行替换即可。

**相关 issue:** https://github.com/electron/electron/issues/2003

代码跨平台着高效的开发效率和的跨全平台的优势撑

----

https://www.electronjs.org/docs/tutorial/online-offline-events

electron文档

-----

桌面端框架Electron+Vue使用问题整理和总结

在`electron`中使用`iframe`和`webview`的的区别？

- 官方建议使用`iframe`代替`webview`,`webview`标签可以加载一个访客模式的URL页面，由于这个标签是基于`Chromium webview`，目前架构变化较快，不够稳定。但是`webview`所提供的功能较多，比如控制访客能否前进后退等

----

https://segmentfault.com/a/1190000021966426

https://m.jb51.cc/electron/454518.html

---

好好看极客时间的教程，准备下面试题，就行

不能靠公司，只能靠自己

靠自己点滴积累学习，积累面试题，深入学习，简历上写的一些模块

------

