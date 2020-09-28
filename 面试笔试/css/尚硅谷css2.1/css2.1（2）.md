# css2.1（2）

## 粘连布局

当你的内容不足，我就在下面。但是当你的文字变得很长，就会被文字撑开

![1536843457661](imge\1536843457661.png)

1，footer元素不能放在main元素同级，需要放在wrap元素外面。

```css
        *{
            margin:0;
            padding:0;
        }
       html, body{
            height: 100%;
        }
        .wrap{
            min-height: 100%;
            padding-bottom:50px;
        }
        .main{
            background-color: yellow;
        }
        .footer{
            height: 50px;
            background-color: yellowgreen;
            margin-top:-50px;
        }

    </style>
</head>
<body>
    <div class="wrap">
        <div class="main">
            <h4>mainmianmian</h4>
            <h4>mainmianmian</h4>       
        </div>
    </div>
    <div class="footer">
        footer
    </div>
```

## Bfc

![1536925435204](imge\1536925435204.png)

![1536926748810](imge\1536926748810.png)

bfc管理开启了bfc元素里面的所有块级元素

bfc布局规则：

1，内部box会垂直排列

2，bfc的区域不会与float box重叠

3，内部的BOX垂直方向的距离由margin决定，属于同一个BFC的两个相邻box的margin会发生重叠

#### 两列布局

让右边的div开启bfc，那么根据第二条规则，bfc区域不会与浮动元素重叠。自然就实现了两列布局

#### 溢出显示省略号（之后将）

## margin重叠

讲解BFC第三条规则（内部的BOX垂直方向的距离由margin决定，属于同一个BFC的两个相邻box的margin会发生重叠）

例如：垂直方向上的margin重叠

margin叠加的第二种形式，就是子父元素叠加产生的margin重叠

```css
    <div class="wrap">
    </div>
    <span>sdf</span>
    <div class="footer">
    </div>
```

当中间的span里面没有内容时，其实虽然dom上两个div没有相邻，但是实际上页面上是相邻。

当给span加字，就不再margin叠加。所以相邻是指盒模型中的盒子是否相邻，margin碰到一起是会。

## css hack

https://blog.csdn.net/dayu9216/article/details/70225261

让不同浏览器识别的选择器

## 检测ie低版本函数

![1536972336251](imge\1536972336251.png)

## 左右查询

b=a

a是右查询，所以是沿着作用链寻找，如果找不到就报错（找这个的值）

b是左查询，也是沿着作用链查找，如果找不到就var一个（找这个变量的地方）

## 垂直水平居中

已经知道高宽的水平垂直居中

子父元素都开启绝对定位

然后子元素将偏移量四个都设为0，margin设为auto。wdith为设置为具体px

![1536974011244](imge\1536974011244.png)

绝对定位盒子的特点：

![1536974135827](imge\1536974135827.png)

如果width变成auto的话，那么浏览器自动把width优先auto。如果其他都为auto，就会给margin平分。

这样达到了垂直居中，绝对定位盒子特点。

##### 未知高宽的垂直水平居中

1，transform: translate3d是参照自身高宽来转换的。但是兼容性不好

```
子父盒子开启绝对定位
子盒子{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate3d(-50%,-50% ,0);
}
```

## 字体

![1536974747792](imge\1536974747792.png)

chrome中字体大小  最小为12px   如果是负值直接渲染成16px   默认是16

默认字体为16px，，  2em就是32px（父元素是body）

![1536975387305](imge\1536975387305.png)

## 行高

![1536977889269](imge\1536977889269.png)

行高：两根红色线的距离

![1536977976181](imge\1536977976181)

行距：上面最后一根线到上面第一根线的距离

半行距就是行距的一半

![1536978479512](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1536978479512.png)

行高未看（一直到行内框概念）

## 文本其他属性

white-space（换不换行）text-overflow超出的文本默认出现

出现省略号的方法

![1536979004564](imge\%5CUsers%5Cshuing%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5C1536979004564.png)

## vartical-align

