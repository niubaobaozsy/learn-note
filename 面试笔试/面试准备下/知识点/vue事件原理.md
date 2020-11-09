# vue事件原理

### 9.1. 模板编译

`Vue`在挂载实例前，有相当多的工作是进行模板的编译，将`template`模板进行编译，解析成`AST`树，再转换成`render`函数，而有了`render`函数后才会进入实例挂载过程。对于事件而言，我们经常使用`v-on`或者`@`在模板上绑定事件。因此对事件的第一步处理，就是在编译阶段对事件指令做收集处理。

从一个简单的用法分析编译阶段收集的信息：

```
<div id="app">
    <div v-on:click.stop="doThis">点击</div>
    <span>{{count}}</span>
</div>
<script>
var vm = new Vue({
    el: '#app',
    data() {
        return {
            count: 1
        }
    },
    methods: {
        doThis() {
            ++this.count
        }
    }
})
</script>
```

通过遍历解析成ast树，利用正则对事件的解析，添加已events对象，这个对象包含了所有的信息，事件类型，处理函数，相关的修饰符

修饰符的处理会改变最终字符串的拼接结果，我们看最终转换的`AST`树：

![img](https://user-gold-cdn.xitu.io/2019/8/19/16ca915eeee73f69?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 9.2. 代码生成

模板编译的最后一步是根据解析完的`AST`树生成对应平台的渲染函数，也就是`render`函数的生成过程, 对应`var code = generate(ast, options);`。

其中核心处理在`getElement`中,`getElement`函数会根据不同指令类型处理不同的分支，对于普通模板的编译会进入`genData`函数中处理，同样分析只针对事件相关的处理，从前面解析出的`AST`树明显看出，`AST`树中多了`events`的属性,`genHandlers`函数会为`event`属性做逻辑处理

经过这一转换后，生成`with`封装的`render`函数如下：

```js
"_c('div',{attrs:{"id":"app"}},[_c('div',{on:{"click":function($event){$event.stopPropagation();return doThis($event)}}},[_v("点击")]),_v(" "),_c('span',[_v(_s(count))])])"
```

### 9.3. 事件绑定

前面花了大量的篇幅介绍了模板上的事件标记在构建`AST`树上是怎么处理，并且如何根据构建的`AST`树返回正确的`render`渲染函数，**但是真正事件绑定还是离不开绑定注册事件**。这一个阶段就是发生在组件挂载的阶段。 有了`render`函数，自然可以生成实例挂载需要的`Vnode`树，并且会进行`patchVnode`的环节进行真实节点的构建，如果发现过程已经遗忘，可以回顾以往章节。 `Vnode`树的构建过程和之前介绍的内容没有明显的区别，所以这个过程就不做赘述，最终生成的`vnode`如下：



![img](https://user-gold-cdn.xitu.io/2019/8/19/16ca916b208f9775?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



有了`Vnode`,接下来会遍历子节点递归调用`createElm`为每个子节点创建真实的`DOM`,由于`Vnode`中有`data`属性，在创建真实`DOM`时会进行注册相关钩子的过程，其中一个就是注册事件相关处理。



**在生成vnode的时候，如果有data属性，就进行注册事件相关处理。本质上用的是addEventListener来绑定事件，如果是patch阶段，就可能需要移除和添加新的事件。**



**`add`和`remove`是真正在`DOM`上绑定事件和解绑事件的过程，它的实现也是利用了原生`DOM`的`addEventListener,removeEventListener api`。**

---

上面是定义在模板中的事件： 解析给ast树绑定events对象，正则处理不同绑定方式分析修饰符。然后render出渲染函数，然后在创建vnode的时候，根据有误data属性来进行注册事件处理，注册事件本质用的是原生的dom的**`add`和`remove`是真正在`DOM`上绑定事件和解绑事件的过程，它的实现也是利用了原生`DOM`的`addEventListener

### 自定义事件

然而针对事件还有一个重要的概念不可忽略，那就是组件的自定义事件。我们知道父子组件可以利用事件进行通信，子组件通过`vm.$emit`向父组件分发事件，父组件通过`v-on:(event)`接收信息并处理回调。因此针对自定义事件在源码中自然有不同的处理逻辑。

子父组件通信

`<div id="app"><child @myevent="myevent" @click.native="nativeClick"></child></div>`回过头来看看事件的模板编译，在生成`AST`树阶段，之前分析说过`addHandler`方法会对事件的修饰符做不同的处理，当遇到`native`修饰符时，事件相关属性方法会添加到`nativeEvents`属性中。 下图是`child`生成的`AST`树:



![img](https://user-gold-cdn.xitu.io/2019/8/19/16ca916f8e929703?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

一个放在了naticeEvents里面，一个放在了events里面

**最后，我们换一个角度理解父子组件通信，组件自定义事件的触发和监听本质上都是在当前的组件实例中进行，之所以能产生父子组件通信的效果是因为事件监听的回调函数写在了父组件中。**

凉凉，没看懂这里，自定义事件是如何实现的。头疼

```js
Vue.prototype._init = function(options) {
  ···
  // 针对子组件的事件处理逻辑
  if (options && options._isComponent) {
    // 初始化内部组件
    initInternalComponent(vm, options);
  } else {
    // 选项合并，将合并后的选项赋值给实例的$options属性
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    );
  }
  // 初始化事件处理
  initEvents(vm);
}
//子组件拿到了福组建的事件
function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  ···
  opts._parentListeners = vnodeComponentOptions.listeners;
  ···
}
复制代码
```

**此时，子组件拿到了父占位符节点定义的`@myevent="myevent"`事件**。接下来进行子组件的初始化事件处理，**此时`vm.$options._parentListeners`会拿到父组件自定义的事件**。而带有自定义事件的组件会执行`updateComponentListeners`函数。




有了这些事件api，自定义事件的添加移除理解起来也简单很多。组件通过`this.$emit`在组件实例中派发了事件，而在这之前，组件已经将需要监听的事件以及回调添加到实例的`_events`属性中，触发事件时便可以直接执行监听事件的回调。

**最后，我们换一个角度理解父子组件通信，组件自定义事件的触发和监听本质上都是在当前的组件实例中进行，之所以能产生父子组件通信的效果是因为事件监听的回调函数写在了父组件中。**


父子组件事件通信，就是子组件拿到父组件定义的事件回调函数，放到实例的——events属性中，触发事件时，就执行。

**他本质上是在同个子组件内部维护了一个事件总线，从分析结果可以看出，之所以有子父组件通信的效果，原因仅仅是因为回调函数写在了父组件中。**

ok了