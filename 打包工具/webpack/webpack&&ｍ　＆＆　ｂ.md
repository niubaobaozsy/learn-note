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

