# react实战

1，看react基础

要了解react的生命钩子中怎么用，一般的业务场景如何实现，看代码如何实现

```
React 会实时监听每个组件的 props 和 state 的值，一旦有变化，会立刻更新组件，将结果重新渲染到页面上
```

**智能组件** 在日常开发中，我们也简称**“页面”**。为何说它“智能”，因为它只会做一些很聪明的事儿，脏活累活都不干。它只对数据负责，只需要获取了数据、定义好数据操作的相关函数，然后将这些数据、函数直接传递给具体实现的组件即可。

**木偶组件** 这里“木偶”一词用的特别形象，它总是被人拿线牵着。它从智能组件（或页面）那里接受到数据、函数，然后就开始做一些展示工作，它的工作就是把拿到的数据展示给用户，函数操作开放给用户。至于数据内容是什么，函数操作是什么，它不关心

**生命周期**

- **`getInitialState`**

初始化组件 state 数据，但是在 es6 的语法中，我们可以使用以下书写方式代替

```jsx
class Hello extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 初始化组件 state 数据
        this.state = {
            now: Date.now()
        }
    }
}
```

- **`render`**

最常用的hook，返回组件要渲染的模板。

- **`comopentDidMount`**   **这一步到底是哪一步，带着问题学这个基础，这个时候能不能操作dom？？**

组件第一次加载时渲染完成的事件，一般在此获取网络数据。实际开始项目开发时，会经常用到。****

- **`shouldComponentUpdate`**

主要用于性能优化，React 的性能优化也是一个很重要的话题，后面一并讲解。

- **`componentDidUpdate`**

组件更新了之后触发的事件，一般用于清空并更新数据。实际开始项目开发时，会经常用到。

- **`componentWillUnmount`**

组件在销毁之前触发的事件，一般用户存储一些特殊信息，以及清理`setTimeout`事件等。

具体怎么用？？



**react整个生命周期原理，流程**

使用： - Class 的生命周期 - Hooc 高阶组件 - Hook 的使用 - react-router 的使用 - Context - redux（包括mobx或saga)

最近目标：学会react的基础使用

![img](https://user-gold-cdn.xitu.io/2017/11/11/88e11709488aeea3f9c6595ee4083bf3?imageslim)

这个图很好看懂，

新的生命周期

![preview](https://segmentfault.com/img/bVbwAUO?w=2048&h=1173/view)

#### React V16.3 新增的生命周期方法

```
getDerivedStateFromProps()`
`getSnapshotBeforeUpdate()
```

#### 逐渐废弃的生命周期方法：

```
componentWillMount()`
`componentWillReceiveProps()`
`componentWillUpdate()
```

### 1.简介

**挂载阶段：**
`constructor(props)`: 实例化。
`static getDeriverdStateFromProps` 从 `props` 中获取 `state`。
`render` 渲染。
`componentDidMount`: 完成挂载。

**更新阶段：**
`static getDeriverdStateFromProps` 从 `props` 中获取 `state`。
`shouldComponentUpdate` 判断是否需要重绘。
`render` 渲染。
`getSnapshotBeforeUpdate` 获取快照。
`componentDidUpdate` 渲染完成后回调。

**卸载阶段：**
`componentWillUnmount` 即将卸载。

**错误处理：**
`static getDerivedStateFromError` 从错误中获取 state。
`componentDidCatch` 捕获错误并进行处理。

在使用案例中再加深下影响，为啥react要添加新的钩子？？

 从 `props` 中获取 `state`是什么意思，react是如何监听state和props的变化并更新页面的

这个方法已经不推荐使用。因为在未来异步渲染机制下，该方法可能会多次调用。它所行使的功能也可以由 componentDidMount() 和 constructor() 代替：

