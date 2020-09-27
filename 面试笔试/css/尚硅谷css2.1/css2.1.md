# css2.1（1）

## 定位&盒模型相关

1，定位参照于谁来定位

2，什么是初始包含块

和视窗大小相同的矩形

3，left top right bottom  

​	width height	

​	margin padding：默认值都为auto

  boder-with默认值为 medium

html ，默认font-size为12px

4，百分比参照于什么

![1536809063459](image\1536809063459.png)

**width和hegiht分别参照父元素的width和height**

**margin和padding参照包含块的width**

![1536809181353](image\1536809181353.png)

包含块：如果没有定位，就是父级块元素。如有父级就是初始包含块

**如果有定位，是绝对定位，由最近开启定位的祖先元素的边框界定**

**是相对定位，则是最近的块级父级**

参看mdn文档注意看：属性的默认值以及属性的继承性

## 浮动

本身用来文字环绕图片，image是inline-block

**浮动提升层级问题**

![1536810226160](image\1536810226160.png)![1536810160865](image\1536810160865.png)

一共两个盒子：盒子分为两个半层，文字层和盒模型层。浮动只提升半层。也就是这个元素上可以容纳三个半层，第一个盒子浮动后，下面的盒子上去，但是只能上半层，文字留下来了。-（为什么是文字留下来了呢）

![1536824696569](image\1536824696569.png)

浮动目的是文字环绕，下面的div中的文字会环绕在上个div周围，同时又在黄色的里面。当实在是放不下的情况就会放在外面。

![1536824892361](image\1536824892361.png)

## 三列布局

三列布局的要求：两边固定，中间自适应。中间列内容完整显示（min-width：body的最小宽度，当变得小于这个值出现下拉滚动条）

定位实现圣杯布局：定位，脱离了文档流，实际是两边盖住了中间，不干净不采取

浮动实现三列布局：

为什么使用浮动可以解决定位带来的缺点

核心代码：

```html
    <style>
        body{
            min-width: 600px;
        }
        .left,.right{
            background-color: aqua;
            height: 200px;
            width: 200px;
        }
        .left{
            float: left;
        }
        .right{
            float: right;
        }
        *{
            margin:0;
            padding:0;
        }
        .midle{
            height: 200px;
            background-color: yellowgreen;
        }
    </style>
</head>
<body>
    <div class="left">left</div>
    <div class="right">right</div>
    <div class="midle">midle</div>
</body>
```

##### 当中列要优先显示

浮动三列布局实现不了上面这个，下面的可以

## 圣杯布局

让三个块都浮动，

![1536826602520](image\1536826602520.png)

为什么箭头所指的div的margin设置为负100%之后，会呈现出这这个效果

1，三个div都是浮动的，所有他们之间的边界是紧贴着的。

2，让left块的margin为-100%。100%是父元素的宽度的100%，也就是整个窗口的宽度。也就是黄色left框向前移动窗口宽度的margin。就到了上面。如下图所示，magin负了300px

![1536828113707](image\1536828113707.png)

3，让父元素的padding左右两边都缩小200px，这样中间元素就限制在了中间，空出两端给左右div

4，使用相对定位，让left和right两个div移动到对应的位置。

注意：相对定位只会让位置改变，元素之前的位置会保留，那么文字怎么可以移过去？

我猜想是因为浮动加定位让这个元素有一个半层级，除了放自己本身的那个位置还可以放文字。

猜想错误：相对定位确实会保留原来的位置，但是是因为没有脱离文档流。

但是浮动却让元素脱离文档流，也就是不再

核心代码

```css
 <style>
        body{
            min-width: 600px;
        }
        .midle{
            float: left;
            width: 100%;
            height: 200px;
            background-color: yellow
        }
        .left{
            position: relative;
            left:-200px;
            float: left;
            height: 200px;
            width: 200px;
            margin-left: -100%;
            background-color: yellowgreen;
        }
        .right{
            position: relative;
            right: -200px;
            float: left;
            height: 200px;
            width: 200px;
            margin-left: -200px;
            background-color: yellowgreen;
        }
        .wap{
            padding: 0 200px;
        }
    </style>
</head>
<body>
    <div class="wap">
        <div class="midle">midle</div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
```

## 等高布局

![1536839325623](image\1536839325623.png)

解决上诉问题

定位和浮动，水平居中的margin  auto失效

1,包裹的父元素清除浮动

2，让里面的div的 padding  10000px  margin-10000px

3，父元素  overflow为hidden

padding变得特别大，让背景颜色都扩大

然后margin-1000px让本来变大的盒子的位置变为原来大小。由于清除浮动了，加上overflow。所以所有超出父元素的padding就不见了。

高度是和父元素对齐的，但父元素又因为清除浮动，被最高的元素撑开，也就是高度等于最高的元素。

核心代码：

```css
        }
        body{
            min-width: 600px;
        }
        .midle{
            float: left;
            width: 100%;
            background-color: yellow;
            padding-bottom: 1000px;
            margin-bottom: -1000px;
            /* border: 1px solid red; */
        }
        .left{
            position: relative;
            left:-200px;
            float: left;
            width: 200px;
            margin-left: -100%;
            background-color: yellowgreen;
            padding-bottom: 1000px;
            margin-bottom: -1000px;
            border: 1px solid red;
        }
        .right{
            position: relative;
            right: -200px;
            float: left;
            width: 200px;
            margin-left: -200px;
            background-color: yellowgreen;
            padding-bottom: 1000px;
            margin-bottom: -1000px;
            /* border: 1px solid red; */
        }
        .wap{
            padding: 0 200px;
            /* border: 10px solid red; */
            /* overflow: hidden; */
        }
        .clearfixed::after{
            content: "";
            display: block;
            clear: both;
        }
    </style>
</head>
<body>
    <div class="wap clearfixed">
        <div class="midle">midle
            <h4>shdjf</h4>
            <h4>shdjf</h4>
            <h4>shdjf</h4>
            <h4>shdjf</h4>
            <h4>shdjf</h4>
            <h4>shdjf</h4>
            <h4>shdjf</h4>
            <h4>shdjf</h4>
            <h4>shdjf</h4>
        </div>
        <div class="left">
           left
        </div>
        <div class="right">right</div>
    </div>
```



## 双飞翼布局

最好不要有层级的提升

与圣杯布局的区别就在于: 最后如何把中间的div露出来

圣杯中，应为中间div浮动起来了，浮动起来了宽度就不再是auto，被内容撑开。所以设置为了100%

双飞翼就是在中间div中添加了一个div来包裹文字。然后给这个div设置padding。这样文字就出来了。

## 如何解决ie6绝对定位失效

（没看）

caniuse.com看所有浏览器对css的兼容性，可不可以用

