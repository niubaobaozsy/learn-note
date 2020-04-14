# js  笔试面试

## 1，定时器（定时器函数的this一般为window）

https://www.jianshu.com/p/82824e5691de

当定时器时间置为0的时候，把同步的完成，立即做定时器的任务

https://jeffjade.com/2016/01/10/2016-01-10-javacript-setTimeout/

```js
    setInterval(function(){
        setTimeout(function(){
            alert("shdfs");
        },6000);//隔7秒执行alert之后，每隔1秒执行alert
    },1000);
```

当settimeout的time到了执行了一次之后，setTimeout就变成了普通代码不再会有定时的功能

## 2，typeof的返回值有哪些

object（这个值是null或者对象去），function，string，boolean，number，undefined

## 3，有哪些继承的方式，分别有哪些弊端

### 1，原型继承

目标  方法共用，属性不互相影响

就是让子函数的原型对象变成父函数的实例对象

高程3第163页

​	弊端：1，所有的子类实例都共享父类的属性，会互相影响

​			2，在创建子类型的实例的时候，不能向超类型的构造函数中传递参数

### 2，构造函数继承

在子类构造函数中，通过执行父类的构造函数，执行其对象的初始化代码，获得父类的属性的副本

优势就是可以借机给父类构造函数传递参数

弊端：函数没有复用。浪费内存

### 3，组合继承

利用原型继承方法，利用构造函数复制属性

以上是原理理解

### es5中使用Object.create()

规范了原型继承

Object.create()实际执行的是如下，将第一个参数，作为一个空函数的原型对象，再返回这个函数的实例

这个方法接受两个参数：一个用作新对象原型的对象和一个为新对象定义额外属性的对象（可选的）

```js
function object.create(0){
    function F(){};
    F.prototype = o;
    return new F();
}
```

### 寄生式继承 p171高程

```js
function createAnother(original){
    var clone = object(original);
    clone.ayhi = function(){};
    return clone
}
```

通过object来创造一个和original对应类型的对象，然后给这个对象重造，添加方法。再返回这个对象。这样使用这个函数创建的对象都会有对应的方法

### 寄生组合继承

使用构造继承的方法实现属性的继承，再用原型继承的方法实现方法的继承

p172有一个最简单实现寄生组合式继承的方式。

## charAt() 和indexOf（）

charAt返回指定索引位置处的字符

indexof（“name”，2）返回从第3个字符第一次出现name的字符位置

## 4，ajax

asynchronous javascript and xml 异步js和xml

js通过xmlhttprequest对象直接与服务器交互，通过httprequest接受web服务器返回的数据

#### ajax中文乱码解决

页面的js做两次encodeURI，服务器获取后做一次utf-8转码，因为两次进行编码后都变成了英文的字节码，所以到服务器无论如何解码都不会错误。

## 5，http协议的状态消息

1** 信息

2** 成功

3** 重定向

4** 客户端错误

5** 服务器错误

### 6，懒加载实现原理（提高性能的方法）

**2.1监听onscroll事件判断资源位置** 
 首先为所有懒加载的静态资源添加自定义属性字段，比如如果是图片，可以指定data-src为真实的图片地址，src指向loading的图片。 
 然后当资源进入视口的时候，将src属性值替换成data-src的值。 

### 7，事件委托

https://segmentfault.com/a/1190000012313105

8，`**Object.assign()**` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

9，用forEach遍历数组的话，不能用break跳出循环，也不能用return返回外层。



