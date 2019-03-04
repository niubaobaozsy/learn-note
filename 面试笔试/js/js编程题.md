# js编程题

> 经验：如果是实现一个多种情况的函数，那么首先就是分析所有的情况，在想如何用分支控制实现。
>
> 如果是考其他技术点，那么重心放在技术点上。

### 1，数组去重

> 注意：NaN表示非数值，isNaN函数是用来判读一个东西是不是数值，任何不能被转换为熟知的值都会导致这个函数返回false例如 isNaN("blue");isNaN(true);为true，因为布尔值可以转化为数字
>
> 如果要判断一个数是不是NaN  ：a ！=a

```js
Array.prototype.uniq = function () {
   var resArr = [];
   var flag = true;
     
   for(var i=0;i<this.length;i++){
       if(resArr.indexOf(this[i]) == -1){
           if(this[i] != this[i]){   //排除 NaN
              if(flag){
                   resArr.push(this[i]);
                   flag = false;
              }
           }else{
                resArr.push(this[i]);
           }
       }
   }
    return resArr;
}
```

输入输出

```
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN]
```

```
[false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']
```

### 2，正则实现日期转换

> slice中参数是负值，表示从倒数第几个一直截取到最后一个字符

输入

```
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w')
```

```
2014-09-05 13:14:20 星期五
```

```js
function formatDate(t,str){
  var obj = {
    yyyy:t.getFullYear(),
    yy:(""+ t.getFullYear()).slice(-2),
    M:t.getMonth()+1,
    MM:("0"+ (t.getMonth()+1)).slice(-2),
    d:t.getDate(),
    dd:("0" + t.getDate()).slice(-2),
    H:t.getHours(),
    HH:("0" + t.getHours()).slice(-2),
    h:t.getHours() % 12,
    hh:("0"+t.getHours() % 12).slice(-2),
    m:t.getMinutes(),
    mm:("0" + t.getMinutes()).slice(-2),
    s:t.getSeconds(),
    ss:("0" + t.getSeconds()).slice(-2),
    w:['日', '一', '二', '三', '四', '五', '六'][t.getDay()]
  };
  return str.replace(/([a-z]+)/ig,function($1){return obj[$1]});
}
```

### 3，邮箱格式

```js
function isAvailableEmail(sEmail) {
   ``return` `/^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(sEmail);
}
```

### 4，数组排序

注意不能简单实用sort方法排序，因为sort排序是使用ascii排序10在2的前面

```js
function mySort() {
    var tags = new Array();
    for(var i = 0;i < arguments.length;i++) {
        tags.push(arguments[i]);
    }
    tags.sort(function(compare1,compare2) {
        return compare1- compare2;
    });
    return tags;
}
 
var result = mySort(50,11,16,32,24,99,57,100);
console.info(result);
```

