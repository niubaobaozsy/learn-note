# css3

css cascading style sheets

![1537002033746](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537002033746.png)

浏览器渲染选择器的顺序是从右往左

![1537002650860](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537002650860.png)

共花费六天时间。

## 选择器

![1537010003766](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537010003766.png)

### 1，基本选择器

#### 后代选择器  空格

#### 分组选择器  ，（结合符）也就是之前学的都选中的意思

css声明的优先级

#### 2，基本选择器扩展

##### 子元素选择器： > （只找儿子不找孙子）（直接后代选择器）

##### 相邻兄弟选择器：+ 就是找**紧跟**着这个元素的的相邻兄弟元素。中满足类为inner的

`#wrap  #firt + .inner`也就是在这个元素之后（紧跟），有同一个父亲

##### 通用兄弟选择器： ~  （也就是在这个元素之后，有同一个父亲即可）

#### 属性选择器

![1537011759622](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537011759622.png)

存在属性 [attr ~= val]属性中是有一些值，值用空格隔开，其中有包含val的那个被选中。

### 伪类与伪类元素选择器

伪类是为了拿到元素的状态

![1537013339889](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537013339889.png)

链接伪类只能在链接上用

l  v  h a（这样的顺序）因为link和visited会包括所有的情况，就不会再显示hover action中

### 表单伪类

被禁用和没有被禁用

![1537058803031](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537058803031.png)

### 结构性伪类

![1537061124791](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537061124791)

![1537060797303](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537060797303.png)

![1537060895253](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537060895253.png)

nth-child(index)和nth-of-type（index）区别

![1537061421007](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537061421007.png)



![1537061590925](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537061590925.png)

选中div中的子元素中是a标签中不是最后一个的其他所有a

![1537061761581](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537061761581.png)

empty就是元素的内容全部为空，空到不能有空格

### 伪元素选择器

让开发者可以选中不是dom的元素

伪元素最好用双：：表示，：也可以表示

![1537062027872](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537062027872.png)

一个元素只有两个元素：after和before

其他伪元素

![1537062103514](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537062103514.png)

选中第一个letter字母

：：first-line选中第一行

![1537062196954](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537062196954.png)

section选中被鼠标选中的区域

###  css是声明的优先级

![1537062622258](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537062622258.png)

![1537064721564](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537064721564.png)

#### 继承

![1537064911358](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537064911358.png)

1，我是内部div本身有color样式，继承样式没有特殊性，所以还是本身的color。而不是父元素的color

##### 层叠

![1537065145297](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537065145297.png)

## 自定义字体&字体图标

![1537065707173](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537065707173.png)

### css3 新增ui样式-文本新增样式

opacity不是一个继承属性，但是会影响自己的后代元素

rgba（0，0，0，.8）最后一位代表透明度，css里面可以省略小数点前面的0

文字透明，背景不透明

之前opacity只能作用于元素，一个元素的background-color和color会同时应用

![1537066686504](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537066686504.png)

#### 文字阴影

![1537066795350](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537066795350.png)

![1537066993241](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537066993241.png)

模糊背景

![1537067376133](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537067376133.png)

filter：blur（10px）让整个元素模糊

文字描边就是给文字的边瞄一下

文字排版

![1537067510424](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537067510424.png)

text-overflow是css3的属性

![1537067715773](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537067715773.png)

第一条让文字不换行（英文单词  按空格换行）

溢出部分隐藏，再来显示省略号

盒子不能靠内容撑开

### 盒模型新增样式

正值往外扩，负值往里收

垂直水平居中

![1537088671686](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537088671686.png)

已知宽高垂直水平居中

盒子阴影：box-shadow：新加的东西(可以设置阴影的大小) inset（设置是否是内嵌的阴影）----默认值none   不可继承

和文本阴影差不多。

css中坐标（往外扩是正，往内缩式负）

倒影和文字描边只有谷歌内核才能用

### 图片垂直水平居中

![1537090085565](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537090085565.png)

vertical-align 属性设置元素的垂直对齐方式。

​        middle        把此元素放置在父元素的中部。

**也就是相当于after伪类元素和img共同作为父元素的inline-block子元素。然后在 把此元素放置在父元素的中部。也就是按中间基线对齐也就垂直居中了。基线由最高的决定，after的高度为100%那么就是按after元素的基线对齐**

#### resize（css3）

允许你控制一个元素的大小

![1537090621818](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537090621818.png)

需要overflow：auto配合

第三种已知宽高居中

![1537090799082](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537090799082.png)

![1537090962864](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537090962864.png)

box-sizing：border-box   

**让width和height为border-box。就是包括了padding**和border

![1537094589395](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537094589395.png)

## 新增ui样式

### 圆角

![1537094772091](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537094772091.png)

核心就是内部画一个已对应值为半径的圆，然后分成四份，重合到div的四个角

border-radius: 30px;

如果值是百分比，那么横向的参照width，垂直参考height

可以有四个值，上右下左

border-radius: 10px 20px 30px 40px;都是分别画对应的圆然后重合到对应方向上

![1537095265610](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537095265610.png)

 画椭圆

![1537095328471](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537095328471.png)

border-radius： 40px/60px；画了一个椭圆如下图所示

![1537095440070](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537095440070.png)

了解

#### BFC

bfc的margin重叠，水平也会发生重叠，但是bfc不会与浮动元素发生重叠

### 拓展

![1537096630293](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537096630293.png)

现象

![1537096654476](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537096654476.png)

浮动加了半层，中间的上去了半层。中间的提升了一层，下面的上来了半层

解决ie6固定定位失效问题

1，让滚动条放在body上身上

overflow：auto

![1537097979375](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537097979375.png)

滚动条怎么都不会出现在html上，**只有当html和body都出现了overflow属性才会让滚动条出现在body上**

那么禁用滚动条的方法就是

```css
html,body{
    height: 100%;
    overflow: hidden;
}
```



![1537098190384](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537098190384.png)

pink div绝对定位，但是他的父元素没有开启定位，所以相对于初始化块定位，但是滚动条出现在body上。

初始化块不是body哦，所以就不会动。

将初始化块的滚动条放到body上，再利用绝对定位相对初始化块定位，实现固定定位

### 边框图片(没看，不知道考不考，暂时不用)

### css2背景

background-color:默认值transpraent 透明的。这是css3

background-image属性用于为一个元素设置一个或多个背景图像（会盖住background-color）

background-repeat css属性定义背景图像的重复方式

background- position  百分比参照：背景区域尺寸减去图片大小。

![1537101525886](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537101525886.png)

### css3背景

background-origin：content-box

设置背景的渲染的起始位置：border-box  padding-box  content-box

background-clip 设置背景剪裁位置

在padding-box剪裁（默认在border-box剪裁，白色部分会被覆盖）

![1537100817992](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537100817992.png)

![1537101127240](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537101127240.png)

按文字剪切，文字颜色透明之后背景就是图片了

文字描边  倒影加这个在 -webkit才能用

background-size 设置图片大小

![1537101323112](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537101323112.png)

自适应压缩  background-size： 100% 100%；

高度和宽度都参照与背景大小。并且自适应压缩

![1537101392843](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537101392843.png)



要看mdn文档！！！！！

### 线性渐变  

渐变是图片

双颜色渐变：background-image：linear-gradient（red ，green）

多颜色渐变：background-image：linear-gradient（red ，green，yellow）

linear-gradient从上到下发生渐变

![1537102007730](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537102007730.png)

渐变角度

![1537102061066](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537102061066.png)

控制颜色的分布

![1537102216583](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537102216583.png)

前后的百分比是纯色，中间是指10%的位置到20%的位置是红色到黄色的渐变。

![1537102339101](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537102339101.png)

重复的渐变

![1537102385982](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537102385982.png)

![1537102425965](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537102425965.png)



之后的过渡和2d3d变形还有动画还有布局扩展很重要



跟着老师把dome自己敲出来，就算理解了

![1537146401953](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537146401953.png)

用chorme调试需要的px和角度，不然改来改去很麻烦

#### setInterval(code,millisec[,"lang"])

每隔一段时间一直调用里面的函数

![1537146834945](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537146834945.png)

动画循环动

![1537147924010](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537147924010.png)

![1537147952542](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537147952542.png)

![1537152107231](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537152107231.png)