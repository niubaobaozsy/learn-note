# css的两种盒模型

#### 前言

------

初学 css 的时候 div 的一些`宽高问题`经常会引起一些不好理解的问题，这里做一个关于`css盒模型`的分享。 

#### 问题

------

> 下面的代码可以直接复制出去运行哦

```
﻿<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>css盒模型</title>
</head>
<style type="text/css">
.content {
    width: 300px;
    height: 400px;
    border: 5px solid #242424;
    padding: 20px;
    background-color: #898989;
}
</style>
<body>
    <div class="content"></div>
</body>
</html>12345678910111213141516171819
```

   上面代码的逻辑很简单，就是设一个宽300px，高400px的div，并设置5px的边框和20px的padding。然后我们来看效果：

![TIM截图20180727172218](E:\学习笔记\image\TIM截图20180727172218.png)

这里我们会发现明明我们设置了`300*400`长宽比，为什么呈现出来的是一个`350*450`的盒子呢？ 
接着让我们打开调试页面一探究竟。 
我们可以找到下面的这张示意图：

![TIM截图20180727172227](E:\学习笔记\image\TIM截图20180727172227.png)

在这张图中，我们发现我们设置的`300*400`出现在了最里面的那个蓝框中，与此同时我们可以发现在这个盒模型中除了我们设置的内容（`content`），还有`margin`（外边距）、`border`（边框）、`padding`（内边框） 

> `margin(外边距)` - 清除边框外的区域，外边距是透明的。 
> `border(边框)` - 围绕在内边距和内容外的边框。 
> `padding(内边距)` - 清除内容周围的区域，内边距是透明的。 
> `content(内容)` - 盒子的内容，显示文本和图像。

为了正确设置元素在所有浏览器中的宽度和高度，你需要知道盒模型是如何工作的。

而我们在测试效果图看到的`350*450`盒子， 
350`（width）` = 300`（content）` + 20`（padding）`* 2 + 5`（border）`* 2 
450`（height）`= 400 `（content）`+ 20`（padding）`* 2 + 5`（border）`* 2 

#### css的两种盒模型

------

而引起上面效果的原因来自于 css 的两种盒模型的不同，这里我先对两种盒模型做个介绍。

##### W3C的标准盒模型

![TIM截图20180727172236](E:\学习笔记\image\TIM截图20180727172236.png)

> **在标准的盒子模型中，width指content部分的宽度**

##### IE的盒模型

![TIM截图20180727172246](E:\学习笔记\image\TIM截图20180727172246.png)

> **在IE盒子模型中，width表示content+padding+border这三个部分的宽度**

我们可以看出我们上面的使用的默认正是`W3C标准盒模型` 
而这里盒模型的选取更倾向于项目和开发者的习惯，并没有绝对的好坏之分。 

#### box-sizing的使用

------

如果想要切换盒模型也很简单，这里需要借助css3的`box-sizing`属性 

>   `box-sizing: content-box` 是W3C盒子模型 
>   `box-sizing: border-box` 是IE盒子模型

**box-sizing的默认属性是content-box** 

# css和html

1，font-size 百分比是根据父元素的font-size

2，！imporant的优先级比内联样式更高

3，rem  rem是[CSS3](http://www.html5cn.org/portal.php?mod=list&catid=16)新增的一个相对单位（root em，根em），这个单位引起了广泛关注。这个单位与em有什么区别呢？区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素

em. em的值并不是固定的. em会继承父级元素的字体大小。

