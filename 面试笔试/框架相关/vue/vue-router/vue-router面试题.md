先复习下之前的那些面试题，重点复习history和hash两中模式区别，自己写一下

面试题

----

vue路由懒加载

就是当执行完路由级别的路由守卫beforeEnter之后，解析异步路由组件

然后webpack把异步加载的文件和同步的打包成了以不同的文件，这个时候再引入对应的异步组件。

### 1、Hash模式：

**vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。** hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说**hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面**；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说**Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件**。

**这种模式充分利用了html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求**。

**都会做记录**，hash不会重新渲染#，通过onhashchagne事件来监听对应的 路由改变

history，是用pushState和replaceState方法来实现路由变化，也不会刷新页面,但是

a标签会引起重新渲染，可以替换掉，变成pushState方法



history，**用户操作会触发popstate事件，代码里面监听这个事件就可以实现不刷新页面，而是调换dom来实现页面变化，a标签特殊要转化**

hashchange，**就是用户操作触发hashchange，代码也是调用这个来实现，a标签也没事。hash如何用代码来改变路由。**

结合之前学的，**就是把router-link解析成一个a标签**，然后

```html
<!-- 点击a标签进行hash路由跳转 -->
        <a href="#/shopping">购物车</a>
        <a href="#/food">菜品信息</a>
        <a href="#/review">评论信息</a>
```

清晰了

----

其他面试题

**1、 `hash` 路由**

```html
<a href="#/home">首页</a>
<a href="#/about">关于</a>
<div id="html"></div>

<script>
  window.addEventListener('load', function () {
    document.getElementById('html').innerHTML = location.hash.slice(1);
  });
  window.addEventListener('hashchange', function () {
    document.getElementById('html').innerHTML = location.hash.slice(1);
  });
</script>
复制代码
```

**2、 `history` 路由**

```html
<div onclick="go('/home')">首页</div>
<div onclick="go('/about')">关于</div>
<div id="html"></div>

<script>
  function go(pathname) {
    document.getElementById('html').innerHTML = pathname;
    history.pushState({}, null, pathname);
  }
  window.addEventListener('popstate', function () {
    go(location.pathname);
  });
</script>
```

自己实现就是用这个，很好的教程

----

就差其他面试题了

- abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

---

1. 导航被触发。

2. 在失活的组件里调用 `beforeRouteLeave` 守卫。

3. 调用全局的 `beforeEach` 守卫。

4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。

5. 在路由配置里调用 `beforeEnter`。路由级别的

6. 解析异步路由组件。

7. 在被激活的组件里调用 `beforeRouteEnter`。

8. 调用全局的 `beforeResolve` 守卫 (2.5+)。

9. 导航被确认。

10. 调用全局的 `afterEach` 钩子。

11. 触发 DOM 更新。

12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

13. ```js
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
      },
    ```

----

打开新窗口

```js
const obj = {
    path: xxx,//路由地址
    query: {
       mid: data.id//可以带参数
    }
};
const {href} = this.$router.resolve(obj);
window.open(href, '_blank');
```

----

