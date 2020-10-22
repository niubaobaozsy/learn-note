#  **深入学习 Node js Module**

重点学习

CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。

#### 模块出现循环依赖了，会出现死循环么？

首先我们先简单解释一下循环依赖，当模块 a 执行时需要依赖模块 b 中定义的属性或方法，而在导入模块 b 中，发现模块 b 同时也依赖模块 a 中的属性或方法，即两个模块之间互相依赖，这种现象我们称之为循环依赖。

介绍完循环依赖的概念，那出现这种情况会出现死循环么？我们马上来验证一下：

module1.js

```
exports.a = 1;
exports.b = 2;
require("./module2");
exports.c = 3;
```

module2.js

```
const Module1 = require('./module1');
console.log('Module1 is partially loaded here', Module1);
```

当我们在命令行中输入 `node lib/module1.js` 命令，你会发现程序正常运行，并且在控制台输出了以下内容：

```
Module1 is partially loaded here { a: 1, b: 2 }
```

**通过实际验证，我们发现出现循环依赖的时候，程序并不会出现死循环，但只会输出相应模块已加载的部分数据。**

common是这样，webpack呢？

通过源码我们可以发现，模块首次被加载后，会被缓存在 Module._cache 属性中，以提高模块的导入效率

**那就是要看看commonjs  amd  es6  webpack  三个模块加载的原理**

**大知识点**