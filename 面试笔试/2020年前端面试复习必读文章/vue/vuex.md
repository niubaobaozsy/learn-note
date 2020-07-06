通过[官方文档](https://cn.vuejs.org/v2/guide/plugins.html)我们知道，每一个vue插件都需要有一个公开的install方法，vuex也不例外。其代码比较简单，调用了一下applyMixin方法，该方法主要作用就是在所有组件的**beforeCreate**生命周期注入了设置**this.$store**这样一个对象，因为比较简单，这里不再详细介绍代码了，大家自己读一读编能很容易理解。

去除了一些无关代码后我们发现，其本质就是将我们传入的state作为一个隐藏的vue组件的data,也就是说，我们的commit操作，本质上其实是修改这个组件的data值，结合上文的computed,修改被**defineReactive**代理的对象值后，会将其收集到的依赖的**watcher**中的**dirty**设置为true,等到下一次访问该watcher中的值后重新获取最新值。

这样就能解释了为什么vuex中的state的对象属性必须提前定义好，如果该**state**中途增加**一个属性**，因为该**属性**没有被**defineReactive**，所以其依赖系统没有检测到，自然不能更新。

作者：Kaku_fe
链接：https://www.jianshu.com/p/d95a7b8afa06

最后一句话结束vuex工作原理，`vuex中的store本质就是没有`template`的隐藏着的vue组件；`

 