## array

`**find()**` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 

`**findIndex()**`方法返回数组中满足提供的测试函数的第一个元素的**索引**。若没有找到对应元素则返回-1。

`**flat()**` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

`depth` 可选

**指定要提取嵌套数组的结构深度，默认值为 1。**  **(多层这个还是要用递归实现)**

```
callback
```

为数组中每个元素执行的函数，该函数接收一至三个参数：

- `currentValue`

  数组中正在处理的当前元素。

- `index` 可选

  数组中正在处理的当前元素的索引。

- `array` 可选

  `forEach()` 方法正在操作的数组。

`thisArg` 可选

可选参数。当执行回调函数 `callback` 时，用作 `this` 的值。

遍历基本就是这个参数



> `**includes()**` 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。



### 参数

- `valueToFind`

  需要查找的元素值。**Note:** 使用 `includes()`比较字符串和字符时是区分大小写。

- `fromIndex` 可选

  从`fromIndex` 索引处开始查找 `valueToFind`。如果为负值，则按升序从 `array.length + fromIndex` 的索引开始搜 （即使从末尾开始往前跳 `fromIndex` 的绝对值个索引，然后往后搜寻）。默认为 0。



---

reduce

### 参数



- `callback`

  **执行数组中每个值 (如果没有提供 `initialValue则第一个值除外`)的函数，包含四个参数：**

  **`accumulator`**累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`（见于下方）。

  `currentValue`数组中正在处理的元素。

  `index` 可选数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。

  `array`可选调用`reduce()`的数组

- `initialValue`可选

  作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

  

----

`**some()**` 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

### 参数



- `callback`

  用来测试每个元素的函数，接受三个参数：`element`数组中正在处理的元素。`index` 可选数组中正在处理的元素的索引值。`array`可选`some()`被调用的数组。

- `thisArg`可选

  执行 `callback` 时使用的 `this` 值。

### 返回值



数组中有至少一个元素通过回调函数的测试就会返回**`true`**；所有元素都没有通过回调函数的测试返回值才会为false。



和find区别就是，find会返回第一个元素，some就是一个布尔值

---

splice

```js
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]

```

array.of(1,2,3)把一组值转化为数组

array.includes()返回一个布尔值，判断一个元素是否包含再数组中，第二个参数，是开始匹配的地方

判断两个值是否相等

object.is  -0+0是相等的，nan也能判断

