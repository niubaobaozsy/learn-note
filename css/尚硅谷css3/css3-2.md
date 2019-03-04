# css3-2

## 过渡属性&过渡周期

font： 50px/200px “微软雅黑”；200px是行高

1，transition：**在更改属性时控制动画速度的方法**过渡动画

![1537148974332](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537148974332.png)

![1537149321181](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537149321181.png)

![1537149651934](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537149651934.png)

##### transition-property： background，width，height；

##### transition-duration： 5s，2s；

属性只能包括只有可以被过渡的属性，需要加上单位

当过渡时间个数不能满足过渡属性的个数时，是采用复制整个过渡时间列表的 5s，2s ，5s，2s 

#### transition-timing-function 控制过渡动画的速度和速率

![1537151152466](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537151152466.png)

![1537151248491](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537151248491.png)

#### transition-delay：

![1537151335994](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537151335994.png)

我在使用中的踩过的坑

1，列表不一致如何处理

2，时间不带单位会失效

每天要问自己，这个技术点面试的时候自己要怎样讲

### 过渡完成事件

属性维度的事件

![1537151784771](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537151784771.png)

![1537151822409](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537151822409.png)

前端应该抛弃过程式思想

js中的三行改变样式，是需要触发事件才会执行。不是所见即所得

## 过渡天坑

![1537175516324](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537175516324.png)

1，当hover上去的时候，第二个红框上的代码被解析，然后transition-property的值瞬间被改为height，鼠标移出之后又变回width。渲染比解析慢

2，![1537176619291](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537176619291.png)

![1537177003702](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537177003702.png)

![1537177022341](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537177022341.png)

## css2D变换

变换一般和过渡一起做出效果

 transform  属性允许你修改css视觉格式模型的坐标空间，transform属性，只对block级元素生效。

1，旋转： transform： rotate(360deg)；

2，平移：![1537177548913](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537177548913.png)

3，斜切

![1537177644449](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537177644449.png)

![1537177710339](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537177710339.png)

4，缩放

![1537177837598](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537177837598.png)

5，基点变化：transform-origin

transform-origin：100% 100%；两个值可以为px也可以为百分比，也可以为top left  right bottom。参照点为左上点。

#### 2d变换组合

![1537181347427](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537181347427.png)

也就是图形学中的平移

#### 扇形导航

1，在元素首次渲染还没有完成的情况下，是不会触发过渡的

2，在绝大部分变换函数中，如果变换函数的**位置****个数**不相同的也不会触发过渡

![1537182616209](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537182616209.png)



### 时钟没有做（以后做）

先把知识点过了，以后自己写代码

### 3d变换

js事件冒泡

1，js事件： DOM事件流（event  flow ）存在三个阶段：**事件捕获阶段、处于目标阶段、事件冒泡阶段。**

一般都是先捕获再冒泡，　**addEventListener(event, listener, useCapture)**　　

　　　　*·参数定义：*event---（事件名称，如click，不带on），listener---事件监听函数，*useCapture---*是否采用事件捕获进行事件捕捉，

　　　　　　　　**默认为false，即采用事件冒泡方式**

　　　　addEventListener在 IE11、Chrome 、Firefox、Safari等浏览器都得到支持。

捕获是从根节点一直传播到子节点。如果事件绑定了为true。就是已捕获方式的话，就会被触发。之后再进行冒泡，从子节点开始，一直向上冒泡

https://www.cnblogs.com/bfgis/p/5460191.html（这篇文章中讲的很好，但是没有讲委托机制）之后可以写一篇博客将委托机制

![1537233268751](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537233268751.png)

3d变换的坐标

#### 3d缩放



#### 3d旋转

transform： rotate3d（1，0，0，angle）

按照圆心到这个点连成的射线旋转

#### 3d平移

![1537234279399](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537234279399.png)

 translateZ（）就是往z轴平移对应到距离，也就是和景深相关

注意 ： translateZ（）不能写百分比，因为元素没有厚度

translate3d（100%，100%，100px）；

#### 景深（近大远小）

景深是一个不可继承属性，但可以作用于后代元素（不作用于本身，作用于后代元素）

除了下面的一种写法，还有自己单独的一个属性

![1537233616662](G:\学习笔记\css\尚硅谷css3\image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537233616662.png)

1，transform：perspective（depth）

这样的写法则是加给后代元素，并且perspective（depth）函数必须位于transform的首位，不然不起作用（一般不用）

2，一般用perspective属性，并且放在包裹区元素上

3，景深原理

1，灭点：景深越大，灭点越远，元素变形更小

![1537235801811](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537235801811.png)

2，景深基点

​	视角的位置，perspective属性决定z轴上的

perspective-orgin属性决定x轴和y轴上视点的距离  默认值 ：50% 50%；

## 3d舞台

transform-style

​	营造有层级的3d舞台

​		是一个不可继承属性，他作用于子元素



景深叠加

​	尽量避免叠加

![1537239426167](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537239426167.png)

### 立方体

1，搭建3d舞台

### backface-visibility：hidden

是否显示背面

![1537240423895](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537240423895.png)

除去层级之后，背面显示出来了。backface-visibility：hidden之后不再显示

![1537240501216](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537240501216.png)

学到这个就行。最后html5项目学一下，并且跟着敲

## 多棱柱（dome）

### 动画 Animation

```css
动画内的属性
animation-name: move;动画名字
animation-duration: 3s;完成一个动画的时间，过渡时间
animation-timing-function: linear;过渡中的速率，默认为由慢变快再变慢linear线性过渡
animation-direction:reverse;定义动画执行方向，默认normal。反转的也是关键帧 to-from
动画外的属性
animation-delay: 1s;延迟多久开始动画
animation-iteration-conut: 3;定义动画执行的次数重复的是画面帧，from-to  
animation-fill-mode:forwards;
backwards：from之前的状态与from的状态保持一致
forwards： to之后的撞他与to的状态保持一致
both：backwards+forwards

animation-play-state: 动画的暂停和运行；
animation-direaction：alternate；动画是from-to的方向
}
@keyframes move{
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(300deg);
    }
}
```

 

![1537276102715](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537276102715.png)

![1537276171967](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537276171967.png)

百分比是指时间



animation可以简写

![1537405735153](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537405735153.png)

加了animation-timing-function：step（1）；动画的节奏，一步一动。

![1537406190203](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537406190203.png)

就会瞬间完成一个动画帧之后就等一个delay秒

关键帧有五个，但是步数只有四个。

动画和过渡是控制元素动的轨迹效果

而具体属性的变化，在动的时候那些属性的变化还是需要transform

所以：动画+transform  或  过渡+transform

```js
Math.round(x)
round() 方法可把一个数字舍入为最接近的整数。
```

## 布局拓展

### flex布局（弹性盒子）

兼容性不好，但是是css3中唯一为布局而设计的一套属性

考虑老版本的flex flex应用最多的就是移动端

用新的也可以 postcss可以解决绝大部分的兼容性问题

1，flex不等同与浮动

2，新老版本的flex效果不一样

##### old容器：

注意：老版本  主轴侧轴是可以变化，又有对应的主侧轴的富裕空间管理。所以要搞清楚对应关系

1，容器的布局方向

旧版

![1537411955969](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537411955969.png)

新版：

display：flex；

flex-direction： column；

2，容器排列方向（决定了主轴箭头的方向）

老版本

![1537412101872](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537412101872.png)

![1537412173516](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537412173516.png)

新版：display：flex；

flex-direction： column-reverse；

3，富裕空间的管理

老版本

![1537412461675](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537412461675.png)

start     富裕空间在主轴的右边（x）下面（y）

end        富裕空间在主轴的左边

center        富裕空间在主轴的两边

justify       富裕空间在项目的之间

新版本：

![1537413515954](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537413515954.png)

flex-start     富裕空间在主轴的正方向

flex-end		富裕空间在主轴的反方向

center		 富裕空间在主轴的两边

space-between 	富裕空间在项目的之间

space-around（box  没有的）	富裕空间在项目的两边

![1537413812312](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537413812312.png)

侧轴富裕空间管理

老版本

![1537413863701](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537413863701.png)

start  侧轴上面  end   侧轴下面  center 两边![1537413975040](G:\学习笔记\css\尚硅谷css3\image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537413975040.png)

新版本

![1537414248483](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537414248483.png)

flex-start   富裕空间在侧轴的正方向

flex-end		富裕空间在侧轴的反方向

center		富裕空间在侧轴的两边

baseline		按基线对齐（基本用不到）

stretch		等高布局（如果高度没有设定，则会一样高）

![1537414537001](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537414537001.png)

##### old项目：

弹性空间的管理

### 新版flex布局详解

老师的结论

```
	http://flexboxfroggy.com/
	1.flex基础点
		---什么是容器，什么是项目，什么是主轴，什么是侧轴？
		---项目永远排列在主轴的正方向上*****************
		---flex分新旧两个版本
			-webkit-box
			-webkit-flex / flex
2.注意点
	---我们都知道新版本的flex要比老版本的flex强大很多，有没有必要学习老版本的flex？
		移动端开发者必须要关注老版本的flex
			因为很多移动端设备内核低只老版本的flex
	
	---老版本的box通过两个属性四个属性值控制了主轴的位置和方向
	      新版本的flex通过一个属性四个属性值控制了主轴的位置和方向

3.老版本
	容器
		容器的布局方向
			-webkit-box-orient:horizontal/vertical
			控制主轴是哪一根
				horizontal：x轴
				vertical  ：y轴
		容器的排列方向
			-webkit-box-direction：normal/reverse
			控制主轴的方向
				normal：从左往右（正方向）
				reverse：从右往左（反方向）
		富裕空间的管理
			只决定富裕空间的位置，不会给项目区分配空间
			主轴
				-webkit-box-pack
					主轴是x轴
						start：在右边
						end:	在左边
						center：在两边
						justify：在项目之间
					主轴是y轴
						start：在下边
						end：在上边
						center：在两边
						justify：在项目之间
			侧轴
				-webkit-box-algin
					侧轴是x轴
						start：在右边
						end：  在左边
						center：在两边
					侧轴是y轴
						start：在下边
						end：   在上边	
						center：在两边
					
4.新版本
	容器
		容器的布局方向
		容器的排列方向
			flex-direction
			控制主轴是哪一根，控制主轴的方向
				row;		从左往右的x轴	
				row-reverse;从右往左的x轴
				column;		从上往下的y轴
				column-reverse;从下往上的y轴
		富裕空间的管理
			只决定富裕空间的位置，不会给项目区分配空间
			主轴
				justify-content
						flex-start：		在主轴的正方向
						flex-end:		在主轴的反方向
						center：			在两边
						space-between：	在项目之间
						 space-around：  在项目两边
						
			侧轴
				align-items
						flex-start：在侧轴的正方向
						flex-end：    在侧轴的反方向
						center：		在两边
						baseline    基线对齐
     					stretch		等高布局（项目没有高度）	
```

####  弹性空间管理

老版本

-webkit-box-flex：1；弹性因子，是将主轴上的富裕空间按比例分配到项目的width（如果是y轴就分配到height）上。弹性因子是每个项目的属性，每个项目可以设置自己的弹性因子。

项目有5个，富裕空间有150px。那么每个项目分的150/（5*1）.加在项目的width上

![1537444869815](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537444869815.png)

新版本

flex-grow： 1；

### 新版本新增

##### 容器

1，flex-wrap控制侧轴方向，换行

![1537446296685](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537446296685.png)

默认值nowrap不换行

![1537446344344](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537446344344.png)

wrap换行  wrap-reverse 将侧轴箭头方向反向

2，换行，每一行之间的距离如何控制  align-content。控制多行多列，富裕空间的管理

![1537446515451](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537446515451.png)

align-items也是管理侧轴富裕空间的，

align-content当多行多列看这个属性，单行单列看align-items这个属性。start是指富裕空间在侧轴的正方向

3，flex-flow属性，控制主侧轴是那根，主侧轴的方向

![1537447161956](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537447161956.png)

#### 项目上新增的属性

1，order：设置项目的顺序

![1537448837920](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537448837920.png)

2，align-self   给单个项目设置属性 。（align-self）

![1537449835407](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537449835407.png)

flex-grow和box-flex默认值都是0

box-flex为老版本

flex-grow定义盒子的拉伸因子

flex-shink定义项目盒子的收缩因子

![1537498302615](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537498302615.png)

flex-shrink前提是必须flex-wrp：nowrap保证在一行

![1537580171488](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537580171488.png)

![1537580224661](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537580224661.png)

## flex布局实例

1，等分布局（内容不同时，依然等分）

flex： 1（只要每个item的flex相同，不管为2还是为300都是等分布局）

![1537582627924](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537582627924.png)

flex的简写属性的意义需要知道

## 响应式布局方案

css3媒体查询是所有响应式布局的核心

![1537583837801](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537583837801.png)

1，媒体类型     媒体查询选择器

```css
@media screen {只有在彩色屏幕的时候才能使用这上面的样式  里面写规则

    #wrap{

    border： 1px solid；
    }
}
```



不会贡献css优先级。并且一般写在最后面，用来覆盖之前定义的样式。

2，媒体属性

![1537584588314](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537584588314.png)

```
@media screen and (width:800px){只有在彩色屏幕的时候并且width为800px才能使用这上面的样式  里面写规则
    #wrap{

        border： 1px solid；
        }
}
```



3，关键字

​	and ：代表与的意思，一般用and来连接媒体类型和属性

​	only：和浏览器兼容性有关

​		在老版本中只支持媒体类型，不支持带媒体属性的查询

加了only的老版本会忽略这条规则

​	（，）：代表or

![1537585076337](image\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1537585076337.png)

后面那个没有写媒体类型，那么默认就是所有的屏幕属性满足即可。前面的为一整块

## 多列布局

1，栏目宽度不用

2，栏目列数 column-count指定要多少栏

3，栏目间距

4，栏目分割线

可能有大量文本时又用

## 总结css3

1，选择器的优先级

那个声明起作用，选择去哦还有从右往左渲染

2，box-sizing  背景和圆角

3，过渡，2d3d变形，动画

4，flex  响应式比较重要



