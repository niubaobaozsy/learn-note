# ui2

1. UI2的应用和页面

页面是UI2的核心，页面是一个相对独立可复用的界面展现和交互单元，它即可作为Web页面独立运行，也可作为一个页面片段嵌入到别的页面运行



多页应用和单页应用

多页就是会不断从一个页面调到另一个页面：浏览器

单页就是像vue一样，从始至终都是一个App,vue

---

解决多个js放在一起css和id和js冲突

xid + “页面实例标识” = id。

1、根据xid获取id：this.getIDByXID(xid)；
2、根据xid获取HTML节点：this.getElementByXid(xid)，此api的性能接近原生的document.getElementById；
3、根据xid获取组件实例：this.comp(xid)；

css也是将类名改成  类名+页面实例标识

js--->require.js

