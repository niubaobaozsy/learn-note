# 手写call

那么我们该怎么模拟实现这两个效果呢？

试想当调用 call 的时候，把 foo 对象改造成如下：

```js
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};

foo.bar(); // 1复制代码
```

这个时候 this 就指向了 foo，是不是很简单呢？

但是这样却给 foo 对象本身添加了一个属性，这可不行呐！

不过也不用担心，我们用 delete 再删除它不就好了~

所以我们模拟的步骤可以分为：

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

以上个例子为例，就是：

```
// 第一步
foo.bar = bar
// 第二步
foo.bar()
// 第三步
delete foo.bar复制代码
```

fn 是对象的属性名，反正最后也要删除它，所以起成什么都无所谓。

根据这个思路，我们可以尝试着去写第一版的 **call2** 函数：

```js
// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取
    context.bar = this;
    context.bar();
    delete context.bar;
}

// 测试一下
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1
```

> 利用对象上的函数的上下文是这个对象来实现
>
> 将要绑定执行的函数（这个函数调用了.call，所以就是当前的this），放到要绑定为this的对象上，然后执行这个函数。最后将这个函数从对象中删除

bind方法内部调用了apply，不过利用函数柯里化延迟执行了

使用bind，执行bind函数，得到的是一个函数，只有执行这个函数的时候才会将实行this绑定也是就是执行apply方法

```js
this.value = 2
var foo = {
    value: 1
};
var bar = function(name, age, school) {
    console.log(name) // 'An'
    console.log(age) // 22
    console.log(school) // '家里蹲大学'
    console.log(this.value) // 1
}
Function.prototype.bind = function(newThis) {
    var aArgs   = Array.prototype.slice.call(arguments, 1) //拿到除了newThis之外的预置参数序列
    var that = this
    return function() {
        return that.apply(newThis, aArgs.concat(Array.prototype.slice.call(arguments)))
        //绑定this同时将调用时传递的序列和预置序列进行合并
    }
}
var result = bar.bind(foo, 'An')
result(22, '家里蹲大学')
```

