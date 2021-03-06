# javascript基础语法和对象基础

#### avaScript中一共有5种基本数据类型：

 – 字符串型（ String）

 – 数值型（ Number）

 – 布尔型（ Boolean）

 – null型（ Null）

 – undefined型（ Undefined）

#### 这5种之外的类型都称为Object，所以总的来看JavaScript中共有六种数 据类型    

#### typeof运算符 

• 使用typeof操作符可以用来检查一个变量的数据类型。

 • 使用方式： typeof 数据，例如 typeof 123。

 • 返回结果：

 – typeof 数值 number

 – typeof 字符串 string

 – typeof 布尔型 boolean

 – typeof undefined undefined

**– typeof null object**    

将其他数值转换为字符串有三种方式： toString()、 String()、 拼串    

#### Number 类型用来表示整数和浮点数，

最常用的功能就是用来 表示10进制的整数和浮点数

 • Number表示的数字大小是有限的，

范围是： – ± 1.7976931348623157e+308

 – 如果超过了这个范围，则会返回± Infinity。

 • NaN， 即非数值（ Not a Number）是一个特殊的数值，

 JS中 当对数值进行计算时没有结果返回，则返回NaN

#### 数值的转换 

• 有三个函数可以把非数值转换为数值： Number()、 parseInt() 和parseFloat()。

 • Number()可以用来转换任意类型的数据，而后两者只能用于 转换字符串。

 • parseInt()只会将字符串转换为整数，而parseFloat()可以转换 为浮点数。        

#### Boolean(布尔型)

• 布尔型只能够取真（ true） 和假（ false） 两种数值。 除此以外，其他的值都不被支持。

• 其他的数据类型也可以通过Boolean()函数转换为布尔类型。

• 转换规则：

| 数据类型  | 转换为true     | 转换为false    |
| --------- | -------------- | -------------- |
| Boolean   | true           | false          |
| String    | 任何非空字符串 | “”（空字符串） |
| Number    | 任何非0数字    | 0和NaN         |
| Object    | 任何对象       | null           |
| Undefined | n/a            | undefined      |

#### Undefined 

• Undefined 类型只有一个值，即特殊的 undefined 。

• 在使用 var 声明变量但未对其加以初始化时，这个变量的值就 是 undefined。

 例如： – var message; – message 的值就是 undefined。

 • 需要注意的是**typeof对没有初始化和没有声明的变量都会返回 undefined。**    

#### Null 

• Null 类型是第二个只有一个值的数据类型，这个特殊的值是 null 。

 • **从语义上看null表示的是一个空的对象。所以使用typeof检查 null会返回一个Object。** 

**• undefined值实际上是由null值衍生出来的，所以如果比较 undefined和null是否相等，会返回true；** 

#### 运算符    

非

 • 非运算符使用 ! 表示。

 • 非运算符可以应**用于任意值**，无论值是什么类型，这个运 算符都会返回一个布尔值        

与 

• 与运算符使用 && 表示。 

• 与运算符可以应用于任何数据类型，且不一定返回布尔 值。

 • 对于非布尔值运算，会先将非布尔值转换为布尔值。

 • 对布尔值做运算时，如果两个值都为true则返回true， 否则返回false。 

• **非布尔值时：如果两个都为true，则返回第二个值，如 果两个值中有false则返回靠前的false的值。**    

或 

• 或运算符使用 || 表示。

 • 或运算符可以应用于任何数据类型，且不一定返回布尔值。

 • 对于非布尔值运算，会先将非布尔值转换为布尔值。

 • 对布尔值进行运算时，如果两个值都为false则返回false， 否则返回true。 

• 非布尔值时：如果两个都为false ， 则返回第二个值，否 则返回靠前true的值。

#### 相等

• JS中使用==来判断两个值是否相等，如果相等则返回true。

• 使用!=来表示两个值是否不相等，如果不等则返回true。

• 注意： null和undefined使用==判断时是相等的。

1、NaN和谁都不相等包括他本身通过（isNaN（）函数来判断是否为NaN）

2、很多时候是把两边转化为数字

3、有些特殊需要记住

| 表达式            | 值    | 表达式                                                | 值    |
| ----------------- | ----- | ----------------------------------------------------- | ----- |
| null == undefined | true  | true == 1 （转化为数字，true转化为数字为1，false为0） | true  |
| “NaN” == NaN      | false | true == 2 （转化为数字，true转化为数字为1，false为0） | false |
| 5 == NaN          | false | undefined == 0                                        | false |
| NaN == NaN        | false | null == 0                                             | false |
| NaN != NaN        | true  | “5” == 5                                              | true  |
| false == 0        | true  |                                                       |       |

#### 全等

• ===表示全等，他和==基本一致，不过==在判断两个值 时会进行自动的类型转换，而===不会

• 也就是说”55”==55会返回true，而”55”===55会返回 false； 

• 同样我们还有!==表示不全等，同样比较时不会自动转型。

 • 也就是说”55”!=55会返回false， 而”55”!==55会返回 true；    

### 运算符的优先级

 • .、 []、 new • () • ++、 -- • !、 ~、 +(单目)、 -(单目)、 typeof、 void、 delete • %、 *、 / • +(双目)、 -(双目) • << 、 >>、 >>> • <、 <=、 >、 >= • ==、 !==、 === • & • ^ • | • && • || • ?: • =、 +=、 -=、 *=、 /=、 %=、 <<=、 >>=、 >>>=、 &=、 ^=、 |= • ,    



------

## 对象

Object对象 （没有类的概念）js创建一个动态的对象之后可以动态的为其添加键值对。但里面没有方法？也就是js中的对象就是键值对的集合。不不不，js中除了基础数据类型其他都是对象（**这里要注意的是JavaScript中的函数也是一个对象。**）

• Object类型，我们也称为一个对象。是JavaScript中的引用数据类型。

 • 它是一种复合值，它将很多值聚合到一起，可以通过名字访问这些值。

 • 对象也可以看做是属性的无序集合，每个属性都是一个名/值对。

 • 对象除了可以创建自有属性，还可以通过从一个名为原型的对象那里 继承属性。

 • 除了字符串、数字、 true、 false、 null和undefined之外， JS中的值 都是对象    

#### 创建对象(无类的概念，而是相当于) 

• 创建对象有两种方式：

 – 第一种 

```javascript
var person = new Object();
person.name = "孙悟空";
person.age = 18;
```

– 第二种 

```javascript
 var person = { 
     name:"孙悟空",
     age:18 
 }; 
```

对象属性的访问

 • 访问属性的两种方式： 

– .访问   • 对象.属性名 

 – []访问 • 对象[‘属性名’]    

#### 函数的声明（一） 

• 首先明确一点函数也是一个对象，所以函数也是在 堆内存中保存的。

 • 函数声明比较特殊，**需要使用function关键字声明。**

 • 上边的例子就是创建了一个函数对象，并将函数对 象赋值给了sum这个变量。其中()中的内容表示执 行函数时需要的参数， {}中的内容表示函数的主体。    

#### 传递参数 （很不一样）

• JS中的所有的参数传递都是按值传递的。

 也就是说把函数外部的值赋值给函数内部 的参数，就和把值从一个变量赋值给另一 个变量是一样的。

#### 执行环境（第一次接触啊，这个有点问题）

 • 执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的 行为。

• 每个执行环境都有一个与之关联的变量对象， 环境中定义的所有变量 和函数都保存在这个对象中。

 • 全局执行环境是最外围的一个执行环境。在 Web 浏览器中，全局执 行环境被认为是 window 对象， 因此所有全局变量和函数都是作为 window 对象的属性和方法创建的。

 • 某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中 的所有变量和函数定义也随之销毁。 

• 在内部环境可以读取外部环境的变量，反之则不行。        

#### this（指向当前作用域的东西，方便自身调用。浏览器会根据上下文环境来改变this）

this 引用的规则• 在最外层代码中， this 引用的是全局对象。

• 在函数内， this 根据函数调用方式的不同而有所不同：

| 函数的调用方式  | this引用的对象     |
| --------------- | ------------------ |
| 构造函数        | 所生成的对象       |
| 调用对象的方法  | 当前对象           |
| apply或call调用 | 参数指定的对象     |
| 其他方式        | 全局对象（window） |

 

 #### 构造函数（相当于定义好叫这个名字的对象里面有什么内容）

 • 构造函数是用于生成对象的函数，像之前调用的Object()就是一个构 造函数。

 • 创建一个构造函数：

```js
function MyClass(x,y) {
this.x = x;
this.y = y;
}
```

 • 调用构造函数： – 构造函数本身和普通的函数声明形式相同。 – 构造函数通过 new 关键字来调用， new 关键字会新创建一个对象并返回。 – 通过 new关键字调用的构造函数内的 this 引用引用了（被新生成的）对象。 



#### 属性的访问 

• 在对象中保存的数据或者说是变量，我们称为是一个对象的属性。

 • 读取对象的属性有两种方式： – 对象.属性名 – 对象['属性名'] 

• 修改属性值也很简单： – 对象.属性名 = 属性值 （这里的修改也包括了**增加一个属性**）

• 删除属性 – delete 对象.属性名 • constructor – 每个对象中都有一个constructor属性，它引用了当前对象的构造函数。       

#### 原型继承（相当于每个对象都可以继承一些方法和属性）

 • JS是一门面向对象的语言，而且它还是一个基于原型的面向对 象的语言。

 • 所谓的原型实际上指的是，在构造函数中存在着一个名为原型 的(prototype)对象，这个对象中保存着一些属性，凡是通过该 构造函数创建的对象都可以访问存在于原型中的属性。

 • 最典型的原型中的属性就是toString()函数，实际上我们的对象 中并没有定义这个函数，但是却可以调用，那是因为这个函数 存在于Object对应的原型中    

#### 设置原型 

• 原型就是一个对象，和其他对象没有任何区别，可以通过构造 函数来获取原型对象。 

– 构造函数. prototype

• 和其他对象一样我们可以添加修改删除原型中的属性，也可以 修改原型对象的引用。

 • 需要注意的是prototype属性只存在于函数对象中，其他对象 是没有prototype属性的。 

• 每一个对象都有原型，包括原型对象也有原型。特殊的是 Object的原型对象没有原型。    

获取原型对象的方法

 • 除了可以通过构造函数获取原型对象以外，还可以 通过具体的对象来获取原型对象。

 – Object.getPrototypeOf(对象)

 – 对象.__proto__

 – 对象. constructor.prototype

 • 需要注意的是，我们可以获取到Object的原型对象， 也可以对它的属性进行操作，但是我们不能修改 Object原型对象的引用。    

 #### instanceof

 • 之前学习基本数据类型时我们学习了typeof用来检查一个变量 的类型。

 • 但是typeof对于对象来说却不是那么好用，因为任何对象使用 typeof都会返回Object。而我们想要获取的是对象的具体类型。

 • 这时就需要使用instanceof运算符了，它主要用来检查一个对 象的具体类型。 

• 语法： – var result = 变量 instanceof 类型    

#### Array

 • Array用于表示一个有序的数组。

 • JS的数组中可以保存任意类型的数据。

 • 创建一个数组的方式有两种： – 使用构造器：

 • var arr = new Array(数组的长度); 

• var arr = new Array(123,’hello’,true);

 – 使用[]（这当中的[]就是一个数组字面量）

 • var arr = []; 

• var arr = [123,’hello’,false];

 • 读取数组中的值使用数组[索引]的方式，注意索引是从0开始的。    

#### 字面量

就是使用和意思123是个字面量

var obj ={ };

{}就是个字面量。

#### DATe

直接使用new Date()就可以创建一个Date对象。

 • 创造对象时不传参数默认创建当前时间。可以传递一个毫秒数 用来创建具体的时间。    

#### Function

 • Function类型代表一个函数，每一个函数都是一个Function类 型的对象。而且都与其他引用类型一样具有属性和方法。 

• 由于函数是对象，因此函数名实际上也是一个指向函数对象的 指针，不会与某个函数绑定。 

• 函数的声明有两种方式： – function sum(){} – var sum = function(){}; 

• 由于存在函数声明提升的过程，**第一种方式在函数声明之前就 可以调用函数，而第二种不行 。**   

#### 函数也可以作为参数（在弹层中已经遇到过）

 • 函数也是一个对象，所以函数和其他对象一样 也可以作为一个参数传递给另外一个函数。 

• 但是要注意的是使用函数作为参数时，变量后 边千万不要加()，不加()表示将函数本身作为 参数，加上以后表示将函数执行的结果作为参 数。    

####函数对象的方法 

• 每个函数都有两个方法call()和apply()。 

```js
fun.call();fun.apply();就是调用函数和fun()效果一样。
但是call和apply两个方法可以通过fun.cal(obj);传一个obj，使得函数this的上下文环境变为obj。
```



• call()和apply()都可以指定一个**函数的运行 环境对象，换句话说就是设置函数执行时 的this值**。

• 使用方式： – 函数对象.call(this对象,参数数组) – 函数对象.apply(this对象,参数1,参数2,参数N)    

#### 基本包装类型 

String 

• String 类型是字符串的对象包装类型，可 以像下面这样使用 String 构造函数来创建。

 – var str = new String("hello world"); 

• 可以使用length属性来获取字符串的长度。    

#### Math对象的属性

| 属性         | 说明                             |
| ------------ | -------------------------------- |
| Math.E       | 自然对数的底数，即常量 e 的值    |
| Math.LN10    | 10的自然对数                     |
| Math.LN2     | 2的自然对数                      |
| Math.LOG2E   | 以2为底 e 的对数                 |
| Math.LOG10E  | 以10为底 e 的对数                |
| Math.PI      | π的值                            |
| Math.SQRT1_2 | 1/2的平方根（即2的平方根的倒数） |
| Math.SQRT2   | 2的平方根                        |

 #### Math的方法

 • 最大最小值 – Math.max()获取最大值 – Math.min()获取最小值

 • 舍入： – 向上舍 Math.ceil() – 向下舍 Math.floor() – 四舍五入 Math.round()

 • 随机数： Math.random() – 选取某个范围内的随机值： 

• 值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)    

 