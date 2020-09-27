# 响应式原理

在 Vue 的初始化阶段，`_init` 方法执行的时候，会执行 `initState(vm)` 方法，它的定义在 `src/core/instance/state.js` 中。

```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

`initState` 方法主要是对 `props`、`methods`、`data`、`computed` 和 `wathcer` 等属性做了初始化操作。这里我们重点分析 `props` 和 `data`，对于其它属性的初始化我们之后再详细分析。

`vue`将`data`初始化为一个`Observer`并对对象中的每个值，重写了其中的`get`、`set`，`data`中的每个`key`，都有一个独立的依赖收集器。（dep，数据中每个都重写了set和get 也有了dep依赖收集器）

在`get`中，向依赖收集器添加了监听

在mount时，实例了一个`Watcher`，将收集器的目标指向了当前`Watcher`

在`data`值发生变更时，触发`set`，触发了依赖收集器中的所有监听的更新，来触发`Watcher.update`



```js
const Observer = function(data) {
  // 循环修改为每个属性添加get set
  for (let key in data) {
    defineReactive(data, key);
  }
}

const defineReactive = function(obj, key) {
  // 局部变量dep，用于get set内部调用
  const dep = new Dep();
  // 获取当前值
  let val = obj[key];
  Object.defineProperty(obj, key, {
    // 设置当前描述属性为可被循环
    enumerable: true,
    // 设置当前描述属性可被修改
    configurable: true,
    get() {
      console.log('in get');
      // 调用依赖收集器中的addSub，用于收集当前属性与Watcher中的依赖关系
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      // 当值发生变更时，通知依赖收集器，更新每个需要更新的Watcher，
      // 这里每个需要更新通过什么断定？dep.subs
      dep.notify();
    }
  });
}

const observe = function(data) {
  return new Observer(data);
}

const Vue = function(options) {
  const self = this;
  // 将data赋值给this._data，源码这部分用的Proxy所以我们用最简单的方式临时实现
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this);
  }
  // 挂载函数
  this.mount = function() {
    new Watcher(self, self.render);
  }
  // 渲染函数
  this.render = function() {
    with(self) {
      _data.text;
    }
  }
  // 监听this._data
  observe(this._data);  
}

const Watcher = function(vm, fn) {
  const self = this;
  this.vm = vm;
  // 将当前Dep.target指向自己
  Dep.target = this;
  // 向Dep方法添加当前Wathcer
  this.addDep = function(dep) {
    dep.addSub(self);
  }
  // 更新方法，用于触发vm._render
  this.update = function() {
    console.log('in watcher update');
    fn();
  }
  // 这里会首次调用vm._render，从而触发text的get
  // 从而将当前的Wathcer与Dep关联起来
  this.value = fn();
  // 这里清空了Dep.target，为了防止notify触发时，不停的绑定Watcher与Dep，
  // 造成代码死循环
  Dep.target = null;
}

const Dep = function() {
  const self = this;
  // 收集目标
  this.target = null;
  // 存储收集器中需要通知的Watcher
  this.subs = [];
  // 当有目标时，绑定Dep与Wathcer的关系
  this.depend = function() {
    if (Dep.target) {
      // 这里其实可以直接写self.addSub(Dep.target)，
      // 没有这么写因为想还原源码的过程。
      Dep.target.addDep(self);
    }
  }
  // 为当前收集器添加Watcher
  this.addSub = function(watcher) {
    self.subs.push(watcher);
  }
  // 通知收集器中所的所有Wathcer，调用其update方法
  this.notify = function() {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  }
}

const vue = new Vue({
  data() {
    return {
      text: 'hello world'
    };
  }
})

vue.mount(); // in get
vue._data.text = '123'; // in watcher update /n in get
```

握草实在是看不懂，靠靠靠

必须弄清楚，mvvm中dep和watcher的关系

```
initLifecycle(vm) // vm生命周期相关变量初始化操作 
initEvents(vm) // vm事件相关初始化 
initRender(vm) // 模板解析相关初始化 
callHook(vm, 'beforeCreate') // 
调用beforeCreate钩子函数 
initInjections(vm) // resolve injections before data/props  
initState(vm) // vm状态初始化(重点在这里) 
initProvide(vm) // resolve provide after data/props 
callHook(vm, 'created') // 调用created钩子函数

```

每一个data数据有一个dep  new Dep()，然后数据的get set闭包引用了这个实例dep

dep用来装watcher，每个data都有一个dep

### 4. initWatch

这里`initWatch(vm, opts.watch)`对应到我们的例子中如下所示：



![initWatch](https://user-gold-cdn.xitu.io/2018/2/2/161525e922b453ce?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![newWatcher](https://user-gold-cdn.xitu.io/2018/2/2/161525e8fa87f134?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![img](https://user-gold-cdn.xitu.io/2018/2/2/1615530034cf9353?imageslim)

- 红色箭头：Watcher类实例化，调用watcher实例的`get()`方法，并设置`Dep.target`为当前watcher实例，触发观察对象的`getter`方法。
- 蓝色箭头：`counter`对象的`getter`方法被触发，调用`dep.depend()`进行依赖收集并返回`counter`的值。依赖收集的结果：**1.`counter`闭包的dep实例的`subs`添加观察它的watcher实例w1**；**2. w1的`deps`中添加观察对象`counter`的闭包dep**。
- 橙色箭头：当`counter`的值变化后，触发`subs`中观察它的w1执行`update()`方法，最后实际上是调用w1的回调函数cb。

Watcher类中的其他相关方法都比较直观这里就直接略过了，详细请看Watcher类的源码

作者：鈞嘢嘢
链接：https://juejin.im/post/5a734b6cf265da4e70719386Q1：`Watcher`，`Dep`，`Observer`这几个类之间的关系？

A1：`Watcher`是观察者观察经过`Observer`封装过的数据，`Dep`是`Watcher`和观察数据间的纽带，主要起到依赖收集和通知更新的作用。

Q2：`Dep`中的`subs`存储的是什么？

A2: `subs`存储的是观察者Watcher实例。

Q3：`Watcher`中的`deps`存储的是什么？

A3：`deps`存储的是观察数据闭包中的`dep`实例。

Q4：`Dep.target`是什么， 该值是何处赋值的？

A4：`Dep.target`是全局变量，保存当前的watcher实例，在`new Watcher()`的时候进行赋值，赋值为当前Watcher实例。

作者：鈞嘢嘢
链接：https://juejin.im/post/5a734b6cf265da4e70719386
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

todo： watcher.update()方法做了什么？

前面我们知道`vm._render`方法会调用生成的render函数来返回一个VNode对象，`vm._update`方法会调用`vm.__patch__`方法将这个VNode对象与之前的VNode对象比较，把差异的部分渲染到真正的DOM树上。



target没理解，去看看，

```js
get: function() {
                if (Dep.target) {
                  // 添加依赖
                    dep.depend();
                }
                return val;
            },
                
 dep中depend
     depend: function() {
      
      // 触发watcher的 adddep
        Dep.target.addDep(this);
    },
因为，数据是用get来收集依赖的，但是依赖不是说这个数据，而是数据所在的组件watcher，所以，就需要用dep.target来表示当前的watcher
所以watcher中的dep是干嘛用的
 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
那些数据中的dep实例
      // 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
      // 则不需要将当前watcher添加到该属性的dep里
      // 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
      // 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
      // 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
      // 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
      // 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了
      // 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
      // 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
      // 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
      // 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
      // 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher
所以上面图是对的，并且是全的
```







----

![img](https://user-gold-cdn.xitu.io/2018/2/2/16155a0b3e56a162?imageslim)

计算属性

通过以上的分析，深入理解了计算属性computed和侦听属性watch是如何工作的。计算属性本质上是一个computed watch，侦听属性本质上是一个user watch。且它们其实都是vue对监听器的实现，只不过**computed主要用于对同步数据的处理，watch则主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑。**。能用computed的时候优先用computed，避免了多个数据影响其中某个数据时多次调用watch的尴尬情况。

**下面还另外总结了几点关于 `computed` 和 `watch` 的差异：**

1. `computed` 是计算一个新的属性，并将该属性挂载到 vm（Vue 实例）上，而 `watch` 是监听已经存在且已挂载到 `vm` 上的数据，所以用 `watch` 同样可以监听 `computed` 计算属性的变化（其它还有 `data`、`props`）
2. `computed` 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问  `computed`  属性，才会计算新的值，而 `watch` 则是当数据发生变化便会调用执行函数
3. 从使用场景上说，`computed` 适用一个数据被多个数据影响，而 `watch` 适用一个数据影响多个数据；

以上我们了解了 `computed` 和 `watch` 之间的一些差异和使用场景的区别，当然某些时候两者并没有那么明确严格的限制，最后还是要具体到不同的业务进行分析。

### 分析完所有步骤，我们再来总结下整个流程：

1. 当组件初始化的时候，`computed` 和 `data` 会分别建立各自的响应系统，`Observer`遍历 `data` 中每个属性设置 `get/set` 数据拦截

2. 初始化 

   ```
   computed
   ```

    会调用 

   ```
   initComputed
   ```

    函数

   1. 注册一个 `watcher` 实例，并在内实例化一个 `Dep` 消息订阅器用作后续收集依赖（比如渲染函数的 `watcher` 或者其他观察该计算属性变化的 `watcher` ）
   2. 调用计算属性时会触发其`Object.defineProperty`的`get`访问器函数
   3. 调用 `watcher.depend()` 方法向自身的消息订阅器 `dep` 的 `subs` 中添加其他属性的 `watcher`
   4. 调用 `watcher` 的 `evaluate` 方法（进而调用 `watcher` 的 `get` 方法）让自身成为其他 `watcher` 的消息订阅器的订阅者，首先将 `watcher` 赋给 `Dep.target`，然后执行 `getter` 求值函数，当访问求值函数里面的属性（比如来自 `data`、`props` 或其他 `computed`）时，会同样触发它们的 `get` 访问器函数从而将该计算属性的 `watcher` 添加到求值函数中属性的 `watcher` 的消息订阅器 `dep` 中，当这些操作完成，最后关闭 `Dep.target` 赋为 `null` 并返回求值函数结果。

3. 当某个属性发生变化，触发 `set` 拦截函数，然后调用自身消息订阅器 `dep` 的 `notify` 方法，遍历当前 `dep` 中保存着所有订阅者 `wathcer` 的 `subs` 数组，并逐个调用 `watcher` 的  `update` 方法，完成响应更新。

## 2. computed 的实现原理

computed 本质是一个惰性求值的观察者。

**computed 内部实现了一个惰性的 watcher,也就是 computed watcher,computed watcher 不会立刻求值,同时持有一个 dep 实例。**

其内部通过 this.dirty 属性标记计算属性是否需要重新求值。**（只有依赖的变量发生变化了，才会重新求值，其他情况访问都是使用缓存）**,**当依赖的属性update的时候，会把dirty变成true**

当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher,

computed watcher 通过 this.dep.subs.length 判断有没有订阅者,

有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 (**Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。**)

没有的话,仅仅把 this.dirty = true。 (**当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。**)

## 3. computed 和 watch 有什么区别及运用场景?

### 区别

computed 计算属性 : 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。

watch 侦听器 : 更多的是「观察」的作用,**无缓存性**,类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作。**（一个是执行回调）**一个是求值

### 运用场景

运用场景：

当我们需要进行数值计算,并且依赖于其它数据时,应该使用 computed,因为可以利用 computed 的缓存特性,避免每次获取值时,都要重新计算。

当我们需要在数据变化时执行异步或开销较大的操作时,应该使用 watch,使用  watch  选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率,并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。

作者：null仔
链接：https://juejin.im/post/5e04411f6fb9a0166049a07310.

##  说说 Vue 的渲染过程

![render](https://user-gold-cdn.xitu.io/2019/12/26/16f40a08cac6d3cb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)render

1. 调用 compile 函数,生成 render 函数字符串 ,编译过程如下:

- **parse 函数解析 template,生成 ast(抽象语法树)**
- **optimize 函数优化静态节点 (标记不需要每次都更新的内容,diff 算法会直接跳过静态节点,从而减少比较的过程,优化了 patch 的性能)**
- **generate 函数生成 render 函数字符串**

1. 调用 new Watcher 函数,监听数据的变化,当数据发生变化时，Render 函数执行生成 vnode 对象
2. 调用 patch 方法,对比新旧 vnode 对象,通过 DOM diff 算法,添加、修改、删除真正的 DOM 元素


patch过程中发现dom变化，就是缓存要改的动作

## 11. 聊聊 keep-alive 的实现原理和缓存策略

```js
export default {
  name: "keep-alive",
  abstract: true, // 抽象组件属性 ,它在组件实例建立父子关系的时候会被忽略,发生在 initLifecycle 的过程中
  props: {
    include: patternTypes, // 被缓存组件
    exclude: patternTypes, // 不被缓存组件
    max: [String, Number] // 指定缓存大小
  },

  created() {
    this.cache = Object.create(null); // 缓存
    this.keys = []; // 缓存的VNode的键
  },

  destroyed() {
    for (const key in this.cache) {
      // 删除所有缓存
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    // 监听缓存/不缓存组件
    this.$watch("include", val => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch("exclude", val => {
      pruneCache(this, name => !matches(val, name));
    });
  },

  render() {
    // 获取第一个子元素的 vnode
    const slot = this.$slots.default;
    const vnode: VNode = getFirstComponentChild(slot);
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions;
    if (componentOptions) {
      // name不在inlcude中或者在exlude中 直接返回vnode
      // check pattern
      const name: ?string = getComponentName(componentOptions);
      const { include, exclude } = this;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

      const { cache, keys } = this;
      // 获取键，优先获取组件的name字段，否则是组件的tag
      const key: ?string =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key;
      // 命中缓存,直接从缓存拿vnode 的组件实例,并且重新调整了 key 的顺序放在了最后一个
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      }
      // 不命中缓存,把 vnode 设置进缓存
      else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        // 如果配置了 max 并且缓存的长度超过了 this.max，还要从缓存中删除第一个
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }
      // keepAlive标记位
      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  }
};
复制代码
```

### 原理

1. 获取 keep-alive 包裹着的第一个子组件对象及其组件名
2. 根据设定的 include/exclude（如果有）进行条件匹配,决定是否缓存。不匹配,直接返回组件实例
3. **根据组件 ID 和 tag 生成缓存 Key,并在缓存对象中查找是否已缓存过该组件实例**。如果存在,直接取出缓存值并更新该 key 在 this.keys 中的位置(**更新 key 的位置是实现 LRU 置换策略的关键**)
4. 在 this.cache 对象中存储该组件实例并保存 key 值,之后检查缓存的实例数量是否超过 max 的设置值,超过则根据 LRU 置换策略**删除最近最久未使用的实例**（即是下标为 0 的那个 key）
5. 最后组件实例的 keepAlive 属性设置为 true,这个在渲染和执行被包裹组件的钩子函数会用到,这里不细说

### LRU 缓存淘汰算法

LRU（Least recently used）算法根据数据的历史访问记录来进行淘汰数据,其核心思想是“如果数据最近被访问过,那么将来被访问的几率也更高”。

![LRU](https://user-gold-cdn.xitu.io/2019/12/26/16f40a08cde186c5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)LRU

**keep-alive 的实现正是用到了 LRU 策略,将最近访问的组件 push 到 this.keys 最后面,this.keys[0]也就是最久没被访问的组件,当缓存实例超过 max 设置值,删除 this.keys[0]**

**命中了就取出放入栈顶，每次淘汰栈低元素**

