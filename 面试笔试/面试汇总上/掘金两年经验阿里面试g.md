# 掘金两年经验面试

提高面试储备，把现有的面试体系夯实（做个计划）

https://juejin.im/post/5d690c726fb9a06b155dd40d#heading-140

https://juejin.im/post/5b44a485e51d4519945fb6b7（这些我都看过）

https://juejin.im/post/5a998991f265da237f1dbdf9

https://juejin.im/post/5befeb5051882511a8527dbe



https://juejin.im/post/5d690c726fb9a06b155dd40d#heading-140

（6-22 4点到6点 10道面试题）

### 说说CSS选择器以及这些选择器的优先级

### 权重计算规则

- 第一优先级：`!important`会覆盖页面内任何位置的元素样式
- 1.内联样式，如`style="color: green"`，权值为`1000`
- 2.ID选择器，如`#app`，权值为`0100`
- 3.类、伪类、属性选择器，如`.foo, :first-child, div[class="foo"]`，权值为`0010`
- 4.标签、伪元素选择器，如`div::first-line`，权值为`0001`
- 5.通配符、子类选择器、兄弟选择器，如`*, >, +`，权值为`0000`
- 6.继承的样式没有权值

> - 伪类和伪元素都是用来表示文档树以外的"元素"。
> - 伪类和伪元素分别用单冒号`:`和双冒号`::`来表示。
> - 伪类和伪元素的区别，最关键的点在于如果没有伪元素(或伪类)，是否需要添加元素才能达到目的，如果是则是伪元素，反之则是伪类。

#### 什么是BFC

BFC 全称为块级格式化上下文 (Block Formatting Context) 。BFC是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位以及与其他元素的关系和相互作用，当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。这里有点类似一个BFC就是一个独立的行政单位的意思。可以说BFC就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里box的布局与这个容器外的box毫不相干。

#### 触发BFC的条件

- 根元素或其它包含它的元素
- 浮动元素 (元素的 `float` 不是 `none`)
- 绝对定位元素 (元素具有 `position` 为 `absolute` 或 `fixed`)
- 看详细的博文
- 表格单元格 (元素具有 `display: table-cell`，HTML表格单元格默认属性)
- 表格标题 (元素具有 `display: table-caption`, HTML表格标题默认属性)
- 具有`overflow` 且值不是 `visible` 的块元素
- 弹性盒（`flex`或`inline-flex`）
- `display: flow-root`{清除浮动}
- `column-span: all`

static（静态定位）
对象遵循标准文档流中，top, right, bottom, left 等属性失效。

flex table 绝对定位元素，overflow不是可见的元素，浮动元素

**relative（相对定位）相对原来的位置**
对象遵循标准文档流中，依赖top, right, bottom, left 等属性相对于该对象在标准文档流中的位置进行偏移，同时可通过z-index定义层叠关系。

**absolute（绝对定位）padding的左上角**
对象脱离标准文档流，使用top, right, bottom, left 等属性进行绝对定位（相对于static定位以外的第一个父元素进行绝对定位） 同时可通过z-index定义层叠关系。

fixed（固定定位）
对象脱离标准文档流，使用top, right, bottom, left 等属性进行绝对定位（相对于浏览器窗口进行绝对定位）同时可通过z-index定义层叠关系。

#### BFC的约束规则

- 内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）
- 处于同一个BFC中的元素相互影响，可能会发生外边距重叠
- 每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
- 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算
- 浮动盒区域不叠加到BFC上

#### BFC可以解决的问题

- 垂直外边距重叠问题
- 去除浮动
- 自适用两列布局（`float` + `overflow`）

### 了解盒模型么

包括**内容区域**、**内边距区域**、**边框区域**和**外边距区域**。



![enter image description here](https://user-gold-cdn.xitu.io/2019/8/30/16ce245b8f2a63c0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



`box-sizing: content-box`（W3C盒子模型）：元素的宽高大小表现为**内容**的大小。 `box-sizing: border-box`（IE盒子模型）：元素的宽高表现为**内容 + 内边距 + 边框**的大小。背景会延伸到边框的外沿。

IE5.x和IE6在怪异模式中使用非标准的盒子模型，这些浏览器的`width`属性不是**内容**的宽度，而是**内容**、**内边距**和**边框**的宽度的总和。

### 如何实现左侧宽度固定，右侧宽度自适应的布局

> 小提示：这个问题面试官会要求说出几种解决方法。

DOM结构

```
<div class="box">
  <div class="box-left"></div>
  <div class="box-right"></div>
</div>
复制代码
```

#### 利用`float + margin`实现

```
.box {
 height: 200px;
}

.box > div {
  height: 100%;
}

.box-left {
  width: 200px;
  float: left;
  background-color: blue;
}

.box-right {
  margin-left: 200px;
  background-color: red;
}
复制代码
```

#### 利用`calc`计算宽度

```
.box {
 height: 200px;
}

.box > div {
  height: 100%;
}

.box-left {
  width: 200px;
  float: left;
  background-color: blue;
}

.box-right {
  width: calc(100% - 200px);
  float: right;
  background-color: red;
}
复制代码
```

#### 利用`float + overflow`实现

```
.box {
 height: 200px;
}

.box > div {
  height: 100%;
}

.box-left {
  width: 200px;
  float: left;
  background-color: blue;
}

.box-right {
  overflow: hidden;
  background-color: red;
}
复制代码
```

#### 利用`flex`实现

这里不是最佳答案，应该是使用`flex-basis`实现更合理  flex-shrink: 0 flex-basis：为宽度

```
.box {
  height: 200px;
  display: flex;
}

.box > div {
  height: 100%;
}

.box-left {
  width: 200px;
  background-color: blue;
}

.box-right {
  flex: 1; // 设置flex-grow属性为1，默认为0
  overflow: hidden;
  background-color: red;
}
```



#### 跨域行为

- 同源策略限制、安全性考虑
- 协议、IP和端口不一致都是跨域行为

#### JSONP安全性问题

##### CSRF攻击

前端构造一个恶意页面，请求JSONP接口，收集服务端的敏感信息。如果JSONP接口还涉及一些敏感操作或信息（比如登录、删除等操作），那就更不安全了。

解决方法：验证JSONP的调用来源（Referer），服务端判断Referer是否是白名单，或者部署随机Token来防御。

##### XSS漏洞

不严谨的 content-type导致的 XSS 漏洞，想象一下 JSONP 就是你请求 `http://youdomain.com?callback=douniwan`, 然后返回 `douniwan({ data })`，那假如请求 `http://youdomain.com?callback=alert(1)` 不就返回 `alert(1)({ data })`了吗，如果没有严格定义好 Content-Type（ Content-Type: application/json ），再加上没有过滤 `callback` 参数，直接当 html 解析了，就是一个赤裸裸的 XSS 了。

解决方法：严格定义 Content-Type: application/json，然后严格过滤 `callback` 后的参数并且限制长度（进行字符转义，例如<换成&lt，>换成&gt）等，这样返回的脚本内容会变成文本格式，脚本将不会执行。

#### CORS（跨域资款共享）

> 小提示：如果你回答跨域解决方案CORS，那么面试官一定会问你实现CORS的响应头信息Access-Control-Allow-Origin。

##### 什么是CORS

CORS（跨域资源共享 Cross-origin resource sharing）允许浏览器向跨域服务器发出XMLHttpRequest请求，从而克服跨域问题，它需要浏览器和服务器的同时支持。

- 浏览器端会自动向请求头添加origin字段，表明当前请求来源。
- 服务器端需要设置响应头的Access-Control-Allow-Methods，Access-Control-Allow-Headers，Access-Control-Allow-Origin等字段，指定允许的方法，头部，源等信息。
- 请求分为简单请求和非简单请求，非简单请求会先进行一次OPTION方法进行预检，看是否允许当前跨域请求。

##### 简单请求

请求方法是以下三种方法之一：

- HEAD
- GET
- POST

HTTP的请求头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

后端的响应头信息：

- Access-Control-Allow-Origin：该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
- Access-Control-Allow-Credentials：该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。
- Access-Control-Expose-Headers：该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。

##### 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。

- Access-Control-Request-Method：该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
- Access-Control-Request-Headers：该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。

如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获。

#### JSONP和CORS的对比

- JSONP只支持GET请求，CORS支持所有类型的HTTP请求
- JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据

#### 其他跨域解决方案

- Nginx反向代理
- `postMessage`
- `document.domain`

### HTTP2和HTTP1有什么区别

相对于HTTP1.0，HTTP1.1的优化：

- 缓存处理：多了Entity tag，If-Unmodified-Since, If-Match, If-None-Match等缓存信息（HTTTP1.0 If-Modified-Since,Expires）
- 带宽优化及网络连接的使用
- 错误通知的管理
- Host头处理
- 长连接： HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。

相对于HTTP1.1，HTTP2的优化：

- HTTP2支持二进制传送（实现方便且健壮），HTTP1.x是字符串传送
- HTTP2支持多路复用
- HTTP2采用HPACK压缩算法压缩头部，减小了传输的体积
- HTTP2支持服务端推送

下班前把这个一面看完

### 你能说说缓存么

> 小提示：如果平常有遇到过缓存的坑或者很好的利用缓存，可以讲解一下自己的使用场景。如果没有使用注意过缓存问题你也可以尝试讲解一下和我们息息相关的Webpack构建（每一次构建静态资源名称的hash值都会变化），它其实就跟缓存相关。有兴趣的同学可以查看张云龙的博客[大公司里怎样开发和部署前端代码？](https://github.com/fouber/blog/issues/6)。

缓存分为强缓存和协商缓存。强缓存不过服务器，协商缓存需要过服务器，协商缓存返回的状态码是304。两类缓存机制可以同时存在，强缓存的优先级高于协商缓存。当执行强缓存时，如若缓存命中，则直接使用缓存数据库中的数据，不再进行缓存协商。

#### 强缓存

**Expires(HTTP1.0)**：Exprires的值为服务端返回的数据到期时间。当再次请求时的请求时间小于返回的此时间，则直接使用缓存数据。但由于服务端时间和客户端时间可能有误差，这也将导致缓存命中的误差。另一方面，Expires是HTTP1.0的产物，故现在大多数使用Cache-Control替代。

缺点：使用的是绝对时间，如果服务端和客户端的时间产生偏差，那么会导致命中缓存产生偏差。

**Pragma(HTTP1.0)**：HTTP1.0时的遗留字段，当值为"no-cache"时强制验证缓存，Pragma禁用缓存，如果又给Expires定义一个还未到期的时间，那么Pragma字段的优先级会更高。服务端响应添加'Pragma': 'no-cache'，浏览器表现行为和刷新(F5)类似。

**Cache-Control(HTTP1.1)**：有很多属性，不同的属性代表的意义也不同：

- private：客户端可以缓存
- public：客户端和代理服务器都可以缓存
- max-age=t：缓存内容将在t秒后失效
- no-cache：需要使用协商缓存来验证缓存数据 （需要验证能不能使用缓存）
- no-store：所有内容都不会缓存

请注意no-cache指令很多人误以为是不缓存，这是不准确的，no-cache的意思是可以缓存，但每次用应该去想服务器验证缓存是否可用。no-store才是不缓存内容。当在首部字段Cache-Control 有指定 max-age 指令时，比起首部字段 Expires，会优先处理 max-age 指令。命中强缓存的表现形式：Firefox浏览器表现为一个灰色的200状态码。Chrome浏览器状态码表现为200 (from disk cache)或是200 OK (from memory cache)。

#### 协商缓存

协商缓存需要进行对比判断是否可以使用缓存。浏览器第一次请求数据时，服务器会将缓存标识与数据一起响应给客户端，客户端将它们备份至缓存中。再次请求时，客户端会将缓存中的标识发送给服务器，服务器根据此标识判断。若未失效，返回304状态码，浏览器拿到此状态码就可以直接使用缓存数据了。

**Last-Modified**：服务器在响应请求时，会告诉浏览器资源的最后修改时间。

**if-Modified-Since**：浏览器再次请求服务器的时候，请求头会包含此字段，后面跟着在缓存中获得的最后修改时间。服务端收到此请求头发现有if-Modified-Since，则与被请求资源的最后修改时间进行对比，如果一致则返回304和响应报文头，浏览器只需要从缓存中获取信息即可。

- 如果真的被修改：那么开始传输响应一个整体，服务器返回：200 OK
- 如果没有被修改：那么只需传输响应header，服务器返回：304 Not Modified

**if-Unmodified-Since**: 从某个时间点算起, 是否文件没有被修改，使用的是相对时间，不需要关心客户端和服务端的时间偏差。

- 如果没有被修改：则开始`继续'传送文件，服务器返回: 200 OK
- 如果文件被修改：则不传输，服务器返回: 412 Precondition failed (预处理错误)

这两个的区别是一个是修改了才下载一个是没修改才下载。如果在服务器上，一个资源被修改了，但其实际内容根本没发生改变，会因为Last-Modified时间匹配不上而返回了整个实体给客户端（即使客户端缓存里有个一模一样的资源）。为了解决这个问题，HTTP1.1推出了Etag。

**`nginx`** **中** **`etag`** **由响应头的** **`Last-Modified`** **与** **`Content-Length`** **表示为十六进制组合而成。**

**Etag**：服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标识（生成规则由服务器决定）

**If-Match**：条件请求，携带上一次请求中资源的ETag，服务器根据这个字段判断文件是否有新的修改

**If-None-Match**： 再次请求服务器时，浏览器的请求报文头部会包含此字段，后面的值为在缓存中获取的标识。服务器接收到次报文后发现If-None-Match则与被请求资源的唯一标识进行对比。

- 不同，说明资源被改动过，则响应整个资源内容，返回状态码200。
- 相同，说明资源无心修改，则响应header，浏览器直接从缓存中获取数据信息。返回状态码304.

但是实际应用中由于Etag的计算是使用算法来得出的，而算法会占用服务端计算的资源，所有服务端的资源都是宝贵的，所以就很少使用Etag了。

- 浏览器地址栏中写入URL，回车浏览器发现缓存中有这个文件了，不用继续请求了，直接去缓存拿（最快）
- F5就是告诉浏览器，别偷懒，好歹去服务器看看这个文件是否有过期了。于是浏览器就胆胆襟襟的发送一个请求带上If-Modify-since
- Ctrl+F5告诉浏览器，你先把你缓存中的这个文件给我删了，然后再去服务器请求个完整的资源文件下来。于是客户端就完成了强行更新的操作

#### 缓存场景

对于大部分的场景都可以使用强缓存配合协商缓存解决，但是在一些特殊的地方可能需要选择特殊的缓存策略

- 对于某些不需要缓存的资源，可以使用 Cache-control: no-store ，表示该资源不需要缓存
- 对于频繁变动的资源，可以使用 Cache-Control: no-cache 并配合 ETag 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新
- 对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件

### 能说说首屏加载优化有哪些方案么

> 小提示：如果做过类似优化的同学，可能就比较好回答，没有做过类似优化的同学可以重点讲解一下懒加载（当然我这里被面试官追问过懒加载的Webpack配置问题）。同时不知道使用Vue技术栈的同学们有没有仔细观察过Vue CLI 3构建的html文件中的link标签的rel属性。

- Vue-Router路由懒加载（利用Webpack的代码切割）
- 使用CDN加速，将通用的库从vendor进行抽离
- Nginx的gzip压缩
- Vue异步组件
- 服务端渲染SSR
- 如果使用了一些UI库，采用按需加载
- Webpack开启gzip压缩
- 如果首屏为登录页，可以做成多入口
- Service Worker缓存文件处理
- 使用link标签的rel属性设置   prefetch（这段资源将会在未来某个导航或者功能要用到，但是本资源的下载顺序权重比较低，prefetch通常用于加速下一次导航）、preload（preload将会把资源得下载顺序权重提高，使得关键数据提前下载好，优化页面打开速度）

### 如何在Node端配置路径别名（类似于Webpack中的alias配置）

- 全局变量
- 环境变量
- 自己HACK一个@符号，指向特定的路径
- HACK `require`方法

### 谈谈你对作用域链的理解

> 小提示：同类型的问题还可以是原型链、继承、闭包等，这种概念性的问题你肯定不是一句两句能说清楚的，建议在理解之后自己尝试总结一下，如何把重要的知识点用简短的话语说明白。

了解作用域链之前我们要知道一下几个概念：

- 函数的生命周期
- 变量和函数的声明
- Activetion Object（AO）、Variable Object（VO）

函数的生命周期：

- 创建：JS解析引擎进行预解析，会将函数声明提前，同时将该函数放到全局作用域中或当前函数的上一级函数的局部作用域中。
- 执行：JS引擎会将当前函数的局部变量和内部函数进行声明提前，然后再执行业务代码，当函数执行完退出时，释放该函数的执行上下文，并注销该函数的局部变量。

变量和函数的声明：如果变量名和函数名声明时相同，函数优先声明。

Activetion Object（AO）、Variable Object（VO）：

- AO：Activetion Object（活动对象）
- VO：Variable Object（变量对象）

**VO对应的是函数创建阶段，JS解析引擎进行预解析时，所有的变量和函数的声明**，统称为Variable Object。该变量与执行上下文相关，知道自己的数据存储在哪里，并且知道如何访问。VO是一个与执行上下文相关的特殊对象，它存储着在上下文中声明的以下内容：

- 变量 (var, 变量声明);
- 函数声明 (FunctionDeclaration, 缩写为FD);
- 函数的形参

**AO对应的是函数执行阶段，当函数被调用执行时，会建立一个执行上下文**，该执行上下文包含了函数所需的所有变量，该变量共同组成了一个新的对象就是Activetion Object。该对象包含了：

- 函数的所有局部变量（let）
- 函数的所有命名参数
- 函数的参数集合
- 函数的this指向

作用域链：

当代码在一个环境中创建时，会创建变量对象的一个作用域链（scope chain）来保证对执行环境有权访问的变量和函数。作用域第一个对象始终是当前执行代码所在环境的变量对象（VO）。**如果是函数执行阶段，那么将其activation object（AO）作为作用域链第一个**对象，第二个对象是上级函数的执行上下文AO，下一个对象依次类推。

在《JavaScript深入之变量对象》中讲到，当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。






### 了解Event Loop么

> 小提示：这个题目问到的概率还是蛮大的，这里面试官询问了我浏览器端和Node端的Event Loop有什么不同点。如果想要知道更多浏览器端的Event Loop机制可以查看我之前写的文章[你真的理解$nextTick么/JS引擎线程和事件触发线程/事件循环机制](https://juejin.im/post/5cd9854b5188252035420a13#heading-3)。

事件触发线程管理的任务队列是如何产生的呢？事实上这些任务就是从JS引擎线程本身产生的，主线程在运行时会产生执行栈，栈中的代码调用某些异步API时会在任务队列中添加事件，栈中的代码执行完毕后，就会读取任务队列中的事件，去执行事件对应的回调函数，如此循环往复，形成事件循环机制。JS中有两种任务类型：微任务（microtask）和宏任务（macrotask），在ES6中，microtask称为 jobs，macrotask称为 task：

- 宏任务： script （主代码块）、`setTimeout` 、`setInterval` 、`setImmediate` 、I/O 、UI rendering
- 微任务：`process.nextTick`（Nodejs） 、`Promise` 、`Object.observe` 、`MutationObserver`

## Node.js中Event Loop和浏览器中Event Loop有什么区别

```
   ┌───────────────────────┐
┌─>│        timers         │<————— 执行 setTimeout()、setInterval() 的回调
│  └──────────┬────────────┘
|             |<-- 执行所有 Next Tick Queue 以及 MicroTask Queue 的回调
│  ┌──────────┴────────────┐
│  │     pending callbacks │<————— 执行由上一个 Tick 延迟下来的 I/O 回调（待完善，可忽略）
│  └──────────┬────────────┘
|             |<-- 执行所有 Next Tick Queue 以及 MicroTask Queue 的回调
│  ┌──────────┴────────────┐
│  │     idle, prepare     │<————— 内部调用（可忽略）
│  └──────────┬────────────┘     
|             |<-- 执行所有 Next Tick Queue 以及 MicroTask Queue 的回调
|             |                   ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │ - (执行几乎所有的回调，除了 close callbacks、timers、setImmediate)
│  │         poll          │<─────┤  connections, │ 
│  └──────────┬────────────┘      │   data, etc.  │ 
│             |                   |               | 
|             |                   └───────────────┘
|             |<-- 执行所有 Next Tick Queue 以及 MicroTask Queue 的回调
|  ┌──────────┴────────────┐      
│  │        check          │<————— setImmediate() 的回调将会在这个阶段执行
│  └──────────┬────────────┘
|             |<-- 执行所有 Next Tick Queue 以及 MicroTask Queue 的回调
│  ┌──────────┴────────────┐
└──┤    close callbacks    │<————— socket.on('close', ...)
   └───────────────────────┘
复制代码
```

Node.js中宏任务分成了几种类型，并且放在了不同的task queue里。不同的task queue在执行顺序上也有区别，微任务放在了每个task queue的末尾：

- `setTimeout/setInterval` 属于 timers 类型；
- `setImmediate` 属于 check 类型；（也是定时器的一种，作用差不多）
- socket 的 close 事件属于 close callbacks 类型；
- 其他 MacroTask 都属于 poll 类型。
- `process.nextTick` 本质上属于 MicroTask，但是它先于所有其他 MicroTask 执行；
- 所有 MicroTask 的执行时机在不同类型的 MacroTask 切换后。
- idle/prepare 仅供内部调用，我们可以忽略。
- pending callbacks 不太常见，我们也可以忽略。

理解了

**node中的宏任务分不同的类型，每个类型放在一个队列中，每类执行顺序不同。**

**每次执行一种宏任务类型，就把微任务队列清空。**

`process.nextTick` 本质上属于 MicroTask，但是它先于所有其他 MicroTask 执行；

- `setTimeout/setInterval` 属于 timers 类型；
- `setImmediate` 属于 check 类型；
- socket 的 close 事件属于 close callbacks 类型；
- 其他 MacroTask 都属于 poll 类型。



浏览器是完成一个宏任务，就把微任务清空

node是把一个类别的宏任务全部做完，就把微任务清空 微任务中nextICk优先级最高

### 如何避免回流和重绘

#### 浏览器渲染过程



![enter image description here](https://user-gold-cdn.xitu.io/2019/8/30/16ce245b8f160035?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



- 浏览器使用流式布局模型 (Flow Based Layout)
- 浏览器会把HTML解析成DOM，把CSS解析成CSSOM，DOM和CSSOM合并就产生了Render Tree
- 有了RenderTree就能知道所有节点的样式，计算节点在页面上的大小和位置，把节点绘制到页面上
- 由于浏览器使用流式布局，对Render Tree的计算通常只需要遍历一次就可以完成，但table及其内部元素除外，通常需要多次计算且要花费3倍于同等元素的时间，这也是为什么要避免使用table布局的原因之一

浏览器渲染过程如下：

- 解析HTML，生成DOM树
- 解析CSS，生成CSSOM树
- 将DOM树和CSSOM树结合，生成渲染树(Render Tree)
- Layout(回流)：根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
- Painting(重绘)：根据渲染树以及回流得到的几何信息，得到节点的绝对像素
- Display：将像素发送给GPU，展示在页面上。（这一步其实还有很多内容，比如会在GPU将多个合成层合并为同一个层，并展示在页面中。而css3硬件加速的原理则是新建合成层，这里我们不展开，之后有机会会写一篇博客）

#### 何时触发回流和重绘

何时发生回流：

- 添加或删除可见的DOM元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
- 页面一开始渲染的时候（这肯定避免不了）
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

何时发生重绘（回流一定会触发重绘）：

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

有时即使仅仅回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。现代浏览器会对频繁的回流或重绘操作进行优化，浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。你访问以下属性或方法时，浏览器会立刻清空队列：

- `clientWidth`、`clientHeight`、`clientTop`、`clientLeft`
- `offsetWidth`、`offsetHeight`、`offsetTop`、`offsetLeft`
- `scrollWidth`、`scrollHeight`、`scrollTop`、`scrollLeft`
- `width`、`height`
- `getComputedStyle()`
- `getBoundingClientRect()`

以上属性和方法都需要返回最新的布局信息，因此浏览器不得不清空队列，触发回流重绘来返回正确的值。因此，我们在修改样式的时候，**最好避免使用上面列出的属性，他们都会刷新渲染队列。**如果要使用它们，最好将值缓存起来。

#### 如何避免触发回流和重绘

CSS：

- 避免使用table布局。
- 尽可能在DOM树的最末端改变class。
- 避免设置多层内联样式。
- 将动画效果应用到`position`属性为`absolute`或`fixed`的元素上
- 避免使用CSS表达式（例如：`calc()`）
- CSS3硬件加速（GPU加速）

JavaScript：

- 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性
- 避免频繁操作DOM，创建一个`documentFragment`，在它上面应用所有DOM操作，最后再把它添加到文档中
- 也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流

作者：子弈
链接：https://juejin.im/post/5d690c726fb9a06b155dd40d
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### 笔试题环节

一开始面试官就发了两张笔试题试卷，总共四道题目，大致考了以下知识点：

- 作用域
- 原型链（例如实例属性和原型属性一样，删除实例属性后可以继续访问原型属性问题）
- 宏任务和微任务的打印顺序
- `Array.prototype.map`的第二个参数

```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(function(x){ return this.a * 2},{a:2});
```

![image-20200917155647671](imge/image-20200917155647671.png)



### 算法题环节

- 1块、4块、5块，求总数n块的最小硬币数

还是要刷算法，每天一道算法，

### 什么情况下会阻塞DOM渲染

css加载不会阻塞DOM树的解析

  css加载会阻塞DOM树的渲染

 css加载会阻塞后面js语句的执行

JS` 阻塞 `DOM` 解析，但浏览器会"偷看"`DOM`，预先下载相关资源。

浏览器遇到 ``且没有`defer`或`async`属性的 标签时，会触发页面渲染，因而如果前面`CSS`资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本说说DOM事件流

## script标签中defer和async的区别？

- defer：浏览器指示脚本在文档被解析后执行，script被异步加载后并不会立刻执行，而是等待文档被解析完毕后执行。
- async：同样是异步加载脚本，区别是脚本加载完毕后立即执行，这导致async属性下的脚本是乱序的，对于script有先后依赖关系的情况，并不适用。

> 小提示：面试官追问事件委托有什么优点（起码两个以上）、`target`/`currentTarget`/`relateTarget`具体指向什么目标。
>
> relatedTarget 事件属性返回与事件的目标节点相关的节点。
>
> 对于 mouseover 事件来说，该属性是鼠标指针移到目标节点上时所离开的那个节点。
>
> 对于 mouseout 事件来说，该属性是离开目标时，鼠标指针进入的节点。
>
> 对于其他类型的事件来说，这个属性没有用。

---

**weakmap key应用对象是弱应用，会被垃圾回收 weakset对象是弱引用**

weakset 存储的对象是弱引用，所以不可枚举

WeakMap 的 **key 只能是 `Object` 类型**。 [原始数据类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 是不能作为 key 的

原生的 WeakMap 持有的是**每个键对象的**“弱引用”

**reflect获取语言内部方法，给proxy用**

---

### 1、Hash模式：

**vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。** hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说**hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面**；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说**Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件**。

**这种模式充分利用了html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求**。

**都会做记录**，hash不会重新渲染#，通过onhashchagne事件来监听对应的 路由改变

history，是用pushState和replaceState方法来实现路由变化，也不会刷新页面,但是

a标签会引起重新渲染，可以替换掉，变成pushState方法

------

# 滴滴

## dom事件流

事件流分为冒泡和捕获。

事件冒泡：子元素的触发事件会一直向父节点传递，一直到根结点停止。此过程中，可以在每个节点捕捉到相关事件。可以通过`stopPropagation`方法终止冒泡。

事件捕获：和“事件冒泡”相反，从根节点开始执行，一直向子节点传递，直到目标节点。~~印象中只有少数浏览器的老旧版本才是这种事件流，可以忽略。~~这里说的确实有问题，更正下：**`addEventLister`给出了第三个参数同时支持冒泡与捕获。**

默认fasle，就是冒泡阶段

### 在ES5中如何实现继承

> 小提示：这里我说了很多，从借用构造函数到组合继承到寄生组合继承，但面试官其实最想听到的是寄生组合继承。面试官还追问我具体要如何实现寄生组合继承。当然这里其实问的问题还可以很多，比如ES6的类继承和ES5中的继承有什么区别。

如果对于继承以及继承的区别不是很清楚的，可以随便看看我之前写的大笔记[js类和继承](https://github.com/ziyi2/js/blob/master/JS类和继承.md)。

```js
function A() {
  this.a = 'hello';
}

function B() {
  A.call(this);
  this.b = 'world';
}

B.prototype = Object.create(A.prototype, {
  constructor: { value: B, writable: true, configurable: true }
});

let b = new B();

```

![b 的原型链](https://user-gold-cdn.xitu.io/2019/8/25/16cc75d62ddf654f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

>function B() {
>  A.call(this);
>  this.b = 'world';
>}
>
>call。让B的实例都有a的实例的属性（每个实例各一份）
>
>B.prototype = Object.create(A.prototype, {
>  constructor: { value: B, writable: true, configurable: true }
>});
>
>让B，能继承A，能继承A原型上的方法，公用方法。`B.prototype.__proto__ == A.prototype`

，构造函数 B 的实例 b 继承了构造函数 A 的实例属性，继承了构造函数 A 的原型对象上的属性，继承了构造函数 Object 的原型对象上的属性。

可看出，构造函数 A 与 构造函数 B 并没有继承关系，即**构造函数 B 没有继承构造函数 A 上面的属性**，在 ES6 中，用 extends 实现两个类的继承，两个类之间是有继承关系的，即子类继承了父类的方法，这是 ES6 与 ES5 继承的第一点区别，下面通过 ES6 的继承来说明这一点。

## es6继承

![B 的原型链](https://user-gold-cdn.xitu.io/2019/8/25/16cc7d27f649c562?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

比es5多了 `B.__proto__ == A   A.__proto__ == Function.prototype`

## 3. super() 与 A.call(this) 的区别

在 ES5 中，构造函数 B 的实例继承构造函数 A 的实例属性是通过 A.call(this) 来实现的，在 ES6 中，类 B 的实例继承类 A 的实例属性，是通过 super() 实现的。在不是继承原生构造函数的情况下，A.call(this) 与 super() 在功能上是没有区别的，用 [babel 在线转换](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015,react,stage-2&targets=&browsers=&builtIns=false&debug=false&code=) 将类的继承转换成 ES5 语法，babel 也是通过 A.call(thi s) 来模拟实现 super() 的。但是在继承原生构造函数的情况下，A.call(this) 与 super() 在功能上是有区别的，ES5 中 A.call(this) 中的 this 是构造函数 B 的实例，也就是在实现实例属性继承上，**ES5 是先创造构造函数 B 的实例，然后在让这个实例通过 A.call(this) 实现实例属性继承，****在 ES6 中，是先新建父类的实例对象this，然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承**。下面通过 2 段代码说明这个问题。

代码 1：

```
function MyArray() {
  Array.call(this);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true
  }
});

var colors = new MyArray();
colors[0] = "red";
colors.length;
复制代码
```

这段代码的思路就是，让构造函数 MyArray 继承原生构造函数 Array，然后验证 MyArray 的实例是否具有 Array 实例的特性。

代码 1 执行结果如下图：



![代码 1 执行结果](https://user-gold-cdn.xitu.io/2019/8/25/16cc7f029a25f4bf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



从结果可以看出，MyArray 的实例并不具有 Array 实例的特性，之所以会发生这种情况，是因为 MyArray 的实例无法获得原生构造函数 Array 实例的内部属性，通过 Array.call(this) 也不行。

代码 2：

```
class MyArray extends Array {
  constructor() {
    super();
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length;
复制代码
```

代码 2 执行结果如下图：

![代码 2 执行结果](https://user-gold-cdn.xitu.io/2019/8/25/16cc7f829d30c882?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



从结果可以看出，通过 super()，MyArray 的实例具有 Array 实例的特性。

## 4. 总结

**ES6 与 ES5 中的继承有 2 个区别，第一个是，ES6 中子类会继承父类的属性，第二个区别是，super() 与 A.call(this) 是不同的，在继承原生构造函数的情况下，体现得很明显，ES6 中的子类实例可以继承原生构造函数实例的内部属性，而在 ES5 中做不到。**



勉强是看懂了：https://juejin.im/post/5d615b7f6fb9a06b0202ccb5

## 和之前看的寄生组合继承有什么关系呢？ 

**绝对定位的原点是在padding的左上角**

## 绝对定位元素的特性

- 绝对定位元素完全脱离文档流，不会对后面兄弟元素的布局产生任何影响
- 其位置（或者说大小）是由`top` `right` `bottom` `left`四个属性决定的
- 绝对定位元素的`margin`不会和其他元素的`margin`折叠

上面说到绝对定位元素的大小是由`top` `right` `bottom` `left`四个属性决定的，**这四个属性是相对于绝对定位元素的`包含块`来定位的**。

### 包含块

- 绝对定位元素的包含块是由其最近的`position`属性设置为`relative`、`absolute`或`fixed`的祖先元素，按照以下方式生成的：
  - 如果这个祖先元素是行内元素...此种情况请参考后续文章
  - 否则，包含块是由祖先元素的`padding edge`组成（即相对于祖先元素padding-box进行定位）
- 如果绝对定位元素的所有祖先元素的`position`属性都没有设置`relative`、`absolute`或`fixed`，则其包含块为`初始包含块`。

## 防抖节流使用场景

比如懒加载时要监听计算滚动条的位置，但不必每次滑动都触发，可以降低计算的频率，而不必去浪费资源；另外还有做商品预览图的放大镜效果时，不必每次鼠标移动都计算位置。

节流（`throttle`）:不管事件触发频率多高，只在单位时间内执行一次。（规定时间内只执行一次，考的少，把上一个定时器当做锁）

防抖（`debounce`）：不管事件触发频率多高，一定在事件触发`n`秒后才执行，如果你在一个事件触发的 `n` 秒内又触发了这个事件，就以新的事件的时间为准，`n`秒后才执行，总之，触发完事件 `n` 秒内不再触发事件，`n`秒后再执行。（延迟执行，清空上一个锁，重新添加定时器事件）

### Vue中的computed实现原理

> 小提示：这个问题面试官问的很细，绝对是想问你是否阅读过源码。他首先问computed的实现原理，其次问了这样一个问题：现在有两个computed计算值，其中一个computed计算值为什么可以依赖另外一个computed计算值。这里顺便将watch的实现原理也贴上。

#### watch的实现原理

watch的分类：

- deep watch（深层次监听）
- user watch（用户监听）
- computed watcher（计算属性）
- sync watcher（同步监听）

watch实现过程：

- watch的初始化在data初始化之后（此时的data已经通过`Object.defineProperty`的设置成响应式）
- watch的key会在Watcher里进行值的读取，也就是立马执行get获取value（从而实现data对应的key执行getter实现对于watch的依赖收集），此时如果有`immediate`属性那么立马执行watch对应的回调函数
- 当data对应的key发生变化时，触发user watch实现watch回调函数的执行

#### computed运行原理

- computed的属性是动态挂载到vm实例上的，和普通的响应式数据在data里声明不同

- 设置computed的getter，如果执行了computed对应的函数，由于函数会读取data属性值，因此又会触发data属性值的getter函数，在这个执行过程中就可以处理computed相对于data的依赖收集关系了

- 首次计算computed的值时，会执行vm.computed属性对应的getter函数（用户指定的computed函数，如果没有设置getter，那么将当前指定的函数赋值computed属性的getter），进行上述的依赖收集

- **如果computed的属性值又依赖了其他computed计算属性值，那么会将当前target暂存到栈中，先进行其他computed计算属性值的依赖收集，等其他计算属性依赖收集完成后，在从栈中pop出来，继续进行当前computed的依赖收集**

  > 那Dep.target是什么？他就是我们后面介绍的Watcher实例，为什么要放在Dep.target里呢？是因为getter函数并不能传参，dep可以通过闭包的形式放进去，那watcher可就不行了，watcher内部存放了a+b这个表达式，也是由watcher计算a+b的值，在计算前他会把自己放在一个公开的地方（Dep.target），然后计算a+b，从而触发表达式中所有遇到的依赖的getter，这些getter执行过程中会把Dep.target加到自己的订阅列表中。等整个表达式计算成功，Dep.target又恢复为null.这样就成功的让watcher分发到了对应的依赖的订阅者列表中，订阅到了自己的所有依赖。

```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
复制代码
```

由于 `this.firstName` 和 `this.lastName` （上面是Vue官方示例）都是响应式变量，因此会触发它们的 getter，根据我们之前的分析，它们会把自身持有的 dep 添加到当前正在计算的 watcher 中，这个时候`Dep.target`就是这个 computed watcher，具体步骤如下：

- data 属性初始化 getter setter
- computed 计算属性初始化，提供的函数将用作属性 `vm.fullName` 的 getter
- **当首次获取 `fullName` 计算属性的值时，Dep 开始依赖收集**
- 在执行 message getter 方法时，如果 Dep 处于依赖收集状态，则判定`firstName`和`lastName`为`fullName`  的依赖，并建立依赖关系
- 当`firstName`或`lastName` 发生变化时，根据依赖关系，触发 `fullName` 的重新计算
- **如果计算值没有发生变化，不会触发视图更新**

通过以上的分析，我们知道计算属性本质上就是一个 computed watcher，也了解了它的创建过程和被访问触发 getter 以及依赖更新的过程，其实这是最新的计算属性的实现，之所以这么设计是因为 Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化才会触发渲染 watcher 重新渲染，本质上是一种优化。

#### computed计算值为什么还可以依赖另外一个computed计算值(一个watcher依赖另一个watcher)

> 小提示：这个问题当时完全不知道，哎，官方源码的套路太深了......

### 周期函数有哪些（`beforeCreated`和`created`中间都做了什么

）

初始化 `data`、`props`、`computed`、`watcher`、`provide`。官方源码具体位置[`src/core/instance/init.js`](https://github.com/vuejs/vue/blob/dev/src/core/instance/init.js)：

```
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```


深挖vue源码

### todo 说说 Webpack 的实现原理

> 小提示：这个直接回答不知道，问题较大，我这里猜测一下是类似 Babel 和 AST 抽象语法树相关，有空去看下源码。

### todo 首屏优化有哪些解决方案

> 小提示：这个问题在回答懒加载的过程中，面试官追问懒加载的 Webpack 配置，我说了和代码切割相关。

关于懒加载，这里推荐一篇非常好的文章：[Webpack 大法之 Code Splitting](https://zhuanlan.zhihu.com/p/26710831)。

### todo Node.js的加载机制（`require`和`module.exports`）

> 小提示：这个问题其实是非常常见的问题，建议大家阅读一下源码，有些也可能会问一下比较简单的问题，例如`module.exports`和`exports`的区别，或者也可能问CommonJS引入和ES6引入的区别。
>
> 

### 你觉得你最擅长什么

> 小提示：这个问题是个大坑阿，我这里直接回答我什么都不擅长，这样回答显然面试官是不会不满意的，建议大家在面试前好好想想自己到底擅长啥。

### todo React和Vue的区别

> 小提示：这里React真的好久没用了，几乎忘记了，大致说了下单向数据流、双向数据绑定、数据监听方式、JSX以及Vue的单文件组件、函数式编程、Vue的指令之类的

### todo React、Vue和JQuery在什么场景下怎么选型

这个问题希望同学可以补充一下。

### 什么情况下会阻塞DOM渲染

> 小提示：面试官这里应该想问DOM渲染的过程中可能有哪些情况会阻塞渲染。我当时回答不知道。

这个问题希望同学可以补充一下。

### 有哪些异步函数

> 小提示：回答了宏任务和微任务。

### 说说z-index有什么需要注意的地方

![层叠顺序元素的标注说明](https://image.zhangxinxu.com/image/blog/201601/2016-01-07_235108.png)

## 阿里企业智能事业部（一面）

### todo Webpack的loader和plugins的区别

> 小提示：当时直接回答不知道，确实Webpack我只会用，还没了解过内部的实现原理和构成。这个后续无论如何都要好好理解一下原理。

### HTTP状态码206是干什么的（断点续传）

> 小提示：工作中没有遇到过需要上传下载大型文件，所以这个问题当时老老实实回答不知道。具体应该和断点续传相关，可能也需要回答一些`range`的头部信息等。

### todo Service Worker有哪些作用

> 小提示：当时怕说错，老老实实回答不知道。后来查了一下应该和缓存以及HTTP请求拦截相关。

这个问题希望同学可以补充一下。

### todo 文件上传的二进制具体是怎么处理的

> 小提示：只知道上传的头信息是`application/x-www-form-urlencoded`，也可以对上传的文件的数据进行拦截处理，例如对上传文件的信息进行加密处理。
>
> 重要问题！important

## todo computed的实现原理

### todo Vue的整个实现原理

## 下面的全部todo

### 通讯

> 小提示：由于这边涉及到一些海康的设备（上下位机通信），面试官问我如何知道上位机软件给下位机设备发送了5次信息。这个其实大部分Web前端开发在工作上很难遇到类似的问题，辛亏我以前毕业设计中做过上下位机的TCP通讯。后来我从Leader面那里了解到二面面试官应该是做iot物联网开发这一块的。

请求帧数据结构如下：

| 帧头   | 帧序号 | 帧负载 | 帧校验 | 帧尾   |
| ------ | ------ | ------ | ------ | ------ |
| 2 Byte | 1 Byte | N Byte | 1 Byte | 1 Byte |

这里帧头使用2字节识别，校验可以采用CRC校验，帧序号用来识别发送了几次信息。

### Chrome插件如何屏蔽广告

> 小提示：这个问题当时回答不知道，其实后面想想最简单的办法是先找出广告元素的一些通用特性，然后在Chrome插件中通过注入脚本的形式将这些广告元素隐藏掉。

这里不知道有没有更好的其他方式，例如不知道Service Work对请求拦截处理是否可以有效屏蔽广告等，这个问题希望同学可以补充一下。

### 如何判断两个变量相等`Object.is`

> 小提示：这里需要分基本类型和引用类型，面试官在这里具体想问的是`Object.is`的实现原理。这是面试官问我的第一个问题，当时直接回答不知道，内心都觉得接下来要凉凉了。

### Watch的运行原理

### Vue的数据为什么频繁变化但只会更新一次

> 小提示：这里问的是Vue源码对于视图更新的优化。我这里的回答是乱糟糟的，希望有同学能够给出一个精准并且简短的回答。

Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 `Promise.then` 和 `MessageChannel`，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。

另外，关于`waiting`变量，这是很重要的一个标志位，它保证`flushSchedulerQueue`回调（$nextTick中执行）允许被置入`callbacks`一次。

因为Vue的事件机制是通过事件队列来调度执行，会等主进程执行空闲后进行调度，所以先会去等待所有的同步代码执行完成之后再去一次更新。这样的性能优势很明显，比如：

现在有这样的一种情况，`mounted`的时候`test`的值会被循环执行++1000次。 每次++时，都会根据响应式触发`setter->Dep->Watcher->update->run`。 如果这时候没有异步更新视图，那么每次++都会直接操作DOM更新视图，这是非常消耗性能的。 **所以Vue实现了一个queue队列，在下一个tick（或者是当前tick的微任务阶段）统一执行queue中Watcher的run**。同时，**拥有相同id的Watcher不会被重复加入到该queue中去**，所以不会执行1000次Watcher的run。最终更新视图只会直接将test对的DOM的0变成1000。 保证更新视图操作DOM的动作是在当前栈执行完以后下一个tick（或者是当前tick的微任务阶段）的时候调用，大大优化了性能。

执行顺序`update -> queueWatcher -> 维护观察者队列（重复id的Watcher处理） -> waiting标志位处理（保证需要更新DOM或者Watcher视图更新的方法flushSchedulerQueue只会被推入异步执行的$nextTick回调数组一次） -> 处理$nextTick（在为微任务或者宏任务中异步更新DOM）->`

- Vue是异步更新Dom的，Dom的更新放在下一个宏任务或者当前宏任务的末尾（微任务）中进行执行

由于VUE的数据驱动视图更新是异步的，即修改数据的当下，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。在同一事件循环中的数据变化后，DOM完成更新，立即执行`nextTick(callback)`内的回调。

vue和react一样，对dom的修改都是异步的。它会在队列里记录你对dom的操作并进行diff操作，后一个操作会覆盖前一个，然后更新dom。

### Event Loop

### 除了Flex还可以用什么进行布局

> 小提示：我猜这里面试官想问的是Grid，当时说不知道。

### 绝对定位、固定定位和z-index

> 小提示：感谢CBU技术部的面试官。

#### 绝对定位

- 一旦给元素加上`absolute`或`float`就相当于给元素加上了`display:block`
- `absolute`元素覆盖正常文档流内元素（不用设z-index，自然覆盖）
- 可以减少重绘和回流的开销（如`absolute+ top:-9999em`，或`absolute + visibility:hidden`，将动画效果放到`absolute`元素中）

#### 属性介绍

- `static`，默认值。位置设置为static的元素，它始终会处于文档流给予的位置。
- `inherit`，规定应该从父元素继承 position 属性的值。但是任何的版本的 Internet Explorer （包括 IE8）都不支持属性值 “inherit”。
- `fixed`，生成绝对定位的元素。默认情况下，可定位于相对于浏览器窗口的指定坐标。元素的位置通过 “left”, “top”, “right” 以及 “bottom” 属性进行规定。不论窗口滚动与否，元素都会留在那个位置。但当祖先元素具有`transform`属性且不为none时，就会相对于祖先元素指定坐标，而不是浏览器窗口。
- `absolute`，生成绝对定位的元素，相对于距该元素最近的已定位的祖先元素进行定位。此元素的位置可通过 “left”、”top”、”right” 以及 “bottom” 属性来规定。
- `relative`，生成相对定位的元素，相对于该元素在文档中的初始位置进行定位。通过 “left”、”top”、”right” 以及 “bottom” 属性来设置此元素相对于自身位置的偏移。

浮动、绝对定位和固定定位会脱离文档流，相对定位不会脱离文档流，绝对定位相对于该元素最近的已定位的祖先元素，如果没有一个祖先元素设置定位，那么参照物是body层。

绝对定位相对于包含块的起始位置：

- 如果祖先元素是块级元素，包含块则设置为该元素的内边距边界。
- 如果祖先元素是行内元素，包含块则设置为该祖先元素的内容边界。

问答题：

- 定位的元素的起始位置为父包含块的内边距（不会在border里，除非使用负值，会在padding里）
- 定位的元素的margin还是能起作用的
- background属性是会显示在border里的
- z-index是有层叠层级的，需要考虑同一个层叠上下文的层叠优先级
- z-index是负值不会覆盖包含块的背景色（但是如果有内容，会被包含块的内容覆盖）
- z-index的值影响的元素是定位元素以及flex盒子
- 上面一个定位元素，下面一个正常流的元素，定位元素会覆盖在正常流元素之上，除非给z-index是负值
- 页面根元素html天生具有层叠上下文，称之为“根层叠上下文”

### 小结

这一次面试官问我的第一个问题`Object.is`就没答上来，不过面试官显然没有因为开头答的不好就否定面试者。大家如果在面试时第一个问题就答不上来，不要慌，要保持良好的心态，把接下来能答的问题好好答上来。可能很多同学会疑问，好像还有好几个问题感觉没答上来，但是可能只要有一个问题答的非常出彩，仍然可以弥补那些没答上来的问题（这里面试官当时说Vue源码的实现过程我说的比较清楚，还没有一个面试者答的比我更清楚的）。


`**Object.is()**` 方法判断两个值是否是[相同的值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)。

[`===`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity) 运算符（和[`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality) 运算符）将数字值 `-0` 和 `+0` 视为相等，并认为 [`Number.NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN) 不等于 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)。

## Polyfill

```js
if (!Object.is) {
  Object.is = function(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  };
}
```

---



