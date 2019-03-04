# 尚硅谷js高级（1）

## 数据类型

1、基本（值）类型

String : 任意字符串

Number：任意的数字

boolean：true/false

undefined： undefined

null：null

2、对象（引用）类型

Object：任意对象(对象用来存数据的)

Function: 一种特别的对象（可以执行）

Array：一种特别的对象（数值下标，内部数据是有序的）

3、判断类型

> typeof：

用法：`typeof a`测试变量a  返回数据类型的字符串表达（全部是小写）    

可以用来判断undefined、数值、字符串、**函数**。

不能判断null因为返回的是object。typeof也不能区分object和array

> instanceof：实例的意思

`console.log(b1 instanceof Object)`Object是一个构造方法，判断b1是否是Object的实例

判断对象的具体类型  

一个函数的返回结果是一个函数，用 `b1.b3()()`  b3是一个函数（）调用，之后返回的还是一个函数，只有()最后调用返回“xfzhang”

![1533866856476](D:\MyData\zousy1\AppData\Local\Temp\1533866856476.png)

> ===  ：

可以用来判断undefine和null（因为这两种类型只有一个值，所以可以用来判断类型）其他不行。

### 数据类型相关问题

#### undefined和null区别

undefined代表定义未赋值

null定义并赋值了，只是值为null

#### 什么时候给变量赋值为null

（初始赋值为null，表明之后要赋值为null）

结束前，让对象成为垃圾对象

内存

![1533868076690](D:\MyData\zousy1\AppData\Local\Temp\1533868076690.png)



#### 在js调用函数时传递变量参数时，是值传递还是引用传递

1、永远都是值传递，只不过有些变量的值是引用类型的（里面的是引用类型）

#### js引擎如何管理内存

释放内存：

局部变量：函数执行完自动释放

对象：成为垃圾对象=》垃圾回收器回收

### 对象

调用对象方法：有两种

1、.属性

2、['属性名']：

![1534082037098](D:\MyData\zousy1\AppData\Local\Temp\1534082037098.png)

### 函数

js可以让一个函数成为指定任意对象的方法进行调用

this.xxx = ‘atguigu’   因为修改的是obj的xxx属性。

![1534209016505](D:\MyData\zousy1\AppData\Local\Temp\1534209016505.png)

### 回调函数

1、什么函数才是回调函数

1）你定义的

2）你没有调用

3）但最终它执行了

2、常见的回调函数

  1、dom事件回调函数

2、定时器回调函数

3、ajax请求回调函数

4、生命周期回调函数

### 匿名函数自调用

![1534226104271](D:\MyData\zousy1\AppData\Local\Temp\1534226104271.png)

### 函数的this

this就是调用当前函数的对象

![1534232444322](D:\MyData\zousy1\AppData\Local\Temp\1534232444322.png)



## 函数高级

#### 函数的prototype

js可以动态添加对象

ctrl键点击函数，可以找到定义的源码

alt + shfit+r重命名

构造函数与原型对象相互引用关系

![1534234034261](D:\MyData\zousy1\AppData\Local\Temp\1534234034261.png)



> 每个函数都有一个prototype属性，它默认指向一个object空对象（即称为：原型对象0
>
> 原型对象中有一个属性constructor，它指向函数对象
>
> 2、给原型对象添加属性（一般都是方法）
>
> 作用：函数的所有实例对象自动拥有原型中的属性（方法）

![1534234229207](D:\MyData\zousy1\AppData\Local\Temp\1534234229207.png)

#### 显式原型与隐式原型

![1534236541503](D:\MyData\zousy1\AppData\Local\Temp\1534236541503.png)

函数对象（函数就是一个对象)有prototype属性，而实例对象有__proto__属性。

### 原型链

 ![1534323450714](D:\MyData\zousy1\AppData\Local\Temp\1534323450714.png)![1534323471031](D:\MyData\zousy1\AppData\Local\Temp\1534323497977.png)

原型链：

1、访问一个对象的属性时、先在自身属性中查找，找到返回。

​	如果没有，再沿着`__proto__`这条链向上查找，找到返回。

​	如果最终没有找到，返回undefined

别名：隐式原型链

作用：查找对象的属性（方法）



#### 原型链补充

1、函数的显示原型指向的对象：默认是空Object实例对象（但object不满足）。



> 原型和原型链这块不清楚，先放在这里。





-





