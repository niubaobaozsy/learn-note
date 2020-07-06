```js
    var sleep = function (time, i) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(i);
        }, time);
      })
    };


    var start = async function () {
      for (let i = 0; i < 6; i++) {
        let result = await sleep(1000, i);
        console.log(result);
      }
    };

    start();
```

每隔1秒答应对应的i值

0，1，2，3，4，5