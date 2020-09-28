# html5

## 1，attr和prop的区别

当选中一部分之后，点击attr却失效了（购买图书的那个作业里面）

![1537697871697](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537697871697.png)

html中只要写了checked这个就是会被浏览器理解为选中

### attr和property

**attr是html中节点的属性attributes，分为预定义和自定义属性  html**

**property：js原生对象的属性  js**

每一个预定义的attribute都会有一个节点对象中的property

### attr和property的关系

html中的属性的值都是字符串。没有布尔值

![1537702201500](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537702201500.png)

上面qhf.setAttribute操作的是为attr属性

下面的qhf.checked操作的是property属性

非布尔属性attr和property的同步问题。

结论：不管什么情况property和attr都会同步

布尔属性attr和property的同步问题。

1，改变property时，不会同步attribute

**2，在没有动过property时**

​	**attribute会同步property**

​	**一旦动过property**

​		**attribute不会同步property的值**

也就是如果使用jquery中的attr方法来实现全选，只能在用户没有点之前能全选，如果用户选了一部分再全选就不行。用户操作的是property

### 浏览器根据attr还是property来渲染

浏览器只认property

用户操作的是谁：用户操作的是property

## h5中的小功能

### 1，和class相对应的property为className。

因为class  attr是一个关键字

html5中为class添加了一个classList 的prorperty。并且提供了添加删除的方法

toggle就是如果有就更新没有就添加

![1537705280014](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537705280014.png)

### 2，自定义的attr没有property

h5中  自定义属性加了data-前缀有一个集合property可以获得这些属性

![1537705491914](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537705491914.png)

![1537705567670](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537705567670.png)

注意驼峰命名

### 3，div中的文本是否可编辑

![1537705748450](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537705748450.png)

注意:只能写true（规范提高了，不是像checked一样） 

##  h5和h4的区别

1，<meta  charset="gbk">告诉浏览器用gbk渲染页面
​    
</meta>

2，doctype

![1537707410235](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537707410235.png)

document.compatMode可以知道什么模式有doctype标签就是标准模式没有就是怪异模式

doctype之前什么都不能有

见图知道ie的渲染模式

![1538016003768](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1538016003768.png)

### 根元素

![1537707866302](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537707866302.png)

h5中将规则内嵌到html标签里面了

### head元素

![1537707919861](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537707919861.png)

![1537707992632](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537707992632.png)

mine类型

## h5 语义化标签

![1537708160929](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537708160929.png)

### hgroup

连续多个h*标签出现就使用hgroup，多个h1出现也没事会自动降级

![1537708308735](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537708308735.png)

### 2，header

![1537708332750](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537708332750.png)

### 3，nav  主导航

![1537708417452](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537708417452.png)



### 4，section独立的模块

![1537708485550](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537708485550.png)

### 5，article  文章

### 6，aside  附属内容

![1537708543197](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537708543197.png)

前四个比较重要其他了解

接下来三段学canvas    之后最后一段学音乐媒体接口

## canvas

### 基本用法

画布元素，也是标签很多属性都是可以直接用的。

1，当不指定宽高时，canvas有默认宽高。

2，当html元素中设置宽高和用css设置不一样。css影响画布内容，会等比例缩放画布内容

所以不要用css设置canvas的宽高

![1537795218657](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537795218657.png)

#### 渲染上下文

![1537795500173](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537795500173.png)

getContext是获得画布的上下文。然后穿的参数是2d，绘画环境

### 绘制矩形

注意：canvas只支持一种原生的图形绘制：矩形，其他的形状需要定点连线

1，绘制矩形

fillRecta(x,y,width,height):x，y参考画布的左上角的，矩形定点的坐标，后面两个为高宽

注意xy不加单位

2，stokeRect时，边框像素渲染问题

strokeRect  画一个边框的矩形，默认是1px的边框，但是实际渲染出来是2px。因为是在100，100处上面画0.5px的边框下面画0.5px。然后实际渲染会把0.5px进位成1px（向上取整）

![1537795682473](G:/学习笔记/html5/image/%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537795682473.png)

clearRecct是画一个底色一模一样的矩形上去（不会出现重排问题）

![1537796364721](G:/学习笔记/html5/image/%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537796364721.png)

剩下一个1px的边框

这些方法在画笔上，渲染上下文。css是拿不到的

![1537795740698](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537795740698.png)

3，添加样式和颜色

​	![1537796509631](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537796509631.png)

设置填充和边框颜色和绘线的宽度

![1537796705144](G:\学习笔记\html5\image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537796705144.png)

js异步，当代码已经读到的时候，还没有开始绘制

但是canvas不同，和javafx一样，绘制机制和javafx相同

**设置画笔的颜色和宽度要在之前告诉。同步**

### lineWidth覆盖

后面会覆盖前面的

### lineJoin

![1537797099935](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537797099935.png)

## 绘制路径

步骤

![1537797251640](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537797251640.png)

moveTo把必放在某个位置

lineTo画直线

stroke描出路径边框

fill填充路径

![1537797421358](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537797421358.png)

beginPath  清空路径

closePath   合并路径  fill方法会自动合并路径，但是stroke不会，要手动调用

![1537797479123](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537797479123.png)

当调fill和stroke方法时，会把所有的路径取出来都画一遍

所以每次画的时候都清空之前的，让每个容器都独立

![1537797866021](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537797866021.png)



![1537798142124](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537798142124.png)

路径方法绘制矩形，最后需要填充，调用绘画的方法

lineCap  线段末端长什么样

![1537798257196](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537798257196.png)

![1537798207813](G:\学习笔记\html5\image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537798207813.png)

#### save和restore

![1537834918979](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537834918979.png)

save会压栈，再将样式全压进去   不止是样式，还有状态都会初始化

和restore  出栈，将样式出栈

![1537838994266](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537838994266.png)

这两个需要成对出现。begainPath和路径栈有关

 ![1537836080650](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537836080650.png)

#### 签名

![1537836778111](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537836778111.png)

save和restore两个先于事件发生执行，所以事件发生时，颜色为黑色

如果想设置样式颜色，需要在事件函数代码里面写

#### 曲线

arc画圆的路径

![1537836917879](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537836917879.png)

arcTo   规定三个点画一个圆弧，默认第一个点为moveTo点

画的原理就是三点连成一个角，然后用一个对应半径的圆向角上去靠

![1537838629874](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537838629874.png)

##### 贝塞尔曲线

![1537838683458](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537838683458.png)

![1537838713050](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537838713050.png)

#### 变换

![1537838875679](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537838875679.png)

canvas上无法添加任何事件，因为js和css拿不到canvas的东西，不是dom节点。

1，translate操作原点。也就是画布的原点

translate是累加的

2，rotate  旋转，累加，旋转中心是原点

写度数：45*Math.PI/180

​	将原点的位置移到 50，50处

​	然后旋转45度

​	在100 100处画一个正方形

​		最后不是在画布的150，150处

说明转的是坐标系

![1537840189804](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537840189804.png)

先移动原点还是先旋转，最后的结果是不一样的

![1537840362590](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537840362590.png)

缩放  位置会改变，是因为缩放的不是一个元素，而是放大了区域里面的像素大小

![1537841778117](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537841778117.png)

#### 时钟

和javafx相同，每次改变都重新画表盘，用定时器画

![1537842688748](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537842688748.png)

### 使用图片

#### 在canvas中插入图片

![1537843720773](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537843720773.png)

在canvas中设置背景

![1537844123742](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537844123742.png)

createPattern返回一个背景对象，并把这个对象赋给fllStyle方法

![1537844313287](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537844313287.png)

#### 渐变

![1537844358223](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537844358223.png)

![1537844528072](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537844528072.png)

![1537844545718](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537844545718.png)



##### 飞鸟动画

视口高宽

![1537844958796](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537844958796.png)



#### 文本相关

绘制文本，一种填充方式，一种画边框方式

![1537845132813](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537845132813.png)

font中，字体大小和字体两个缺一不可

文本样式

textalign  是按字体便宜中的那条线为基线

![1537845165960](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537845165960.png)

![1537845445162](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537845445162.png)

了解

#### measureText

![1537845490589](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537845490589.png)

![1537845588215](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537845588215.png)

返回邱海峰三个字在canvas中的文本信息，字体大小

#### canvas中文本水平垂直居中

![1537845733416](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537845733416.png)

拿到文字的高宽，然后计算出来，然后实现文字的垂直水平居中，实际应用场景就是弹幕

### 像素操作

**也就是canvas支持你修改一个像素中的属性**

需求复制一个区域里面的样子到其他地方

![1537865729940](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537865729940.png)

ctx.getImageData(0,0,100,100）会返回imageData对象，这个对象包含以上属性

width，height ，data（每一个像素的rgba）。（canvas实际上是图片）

canvas的透明度是0到255，而css中的透明度是0到1

可以在canvas中写入像素

也可以创建一个imageData对象

![1537866440481](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537866440481.png)

修改之后put回去

![1537866498909](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537866498909.png)#### 

###  单像素操作

imageData里面

通过这个对象中的data获取对应一个像素的信息(画布图像上的信息)

获取3，3这点的颜色信息

```
color[0]= data[(x*w+y)*4]//x是坐标，y也是坐标，w是宽度。获得r值，他是r，g，ba
```

##### 马赛克应用

在一个矩形区域中选取一个像素，让这个区域中所有的颜色都变成这个像素的颜色。

### 合成

ctx.globalAlpha 设置全局透明度

![1537923783225](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537923783225.png)



##### 覆盖合成

这里提供了一些方法来处理图形与图形发生重叠的时候，根据自己需求处理图形

![1538013338674](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1538013338674.png)

注意：这个属性是加给画笔的，告诉画笔在画下一个图形时该怎么操作

![1538013543142](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1538013543142.png)

写成这样时，源在下面，目标在上面

## 音视频

video和audio标签，音视频  需要打开控件才能显示。默认控件每个浏览器样式不统一，采用自定义的控件。



