# 熟悉api调用是写好手撕算法的第一步

#### str.split(' ').join('%20')

#### sort

默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

数字排序 nums.sort((i,j)=>{i-j})

-----

1.丢弃小数部分,保留整数部分 

js:parseInt(7/2) 

2.向上取整,有小数就整数部分加1 

js: Math.ceil(7/2) 

3,四舍五入. 

js: Math.round(7/2) 

4,向下取整 

js: Math.floor(7/2)

---

`slice()、 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。**原始数组不会被改变**。、

这个方法，1，截取函数，不包括end的那个，2，数组和字符串两个行为相同 3，不会改变原函数

**`splice()`** 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。**此方法会改变原数组。**

### 从第 2 位开始删除 0 个元素，插入“drum”



```js
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 0, "drum");
```

### 从第 2 位开始删除 1 个元素，插入“trumpet”



```js
var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
var removed = myFish.splice(2, 1, "trumpet");
```

---

`array**find()**` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。