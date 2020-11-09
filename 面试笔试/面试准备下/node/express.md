## 异步串行流程控制

为了用串行化流程控制让几个异步任务按顺序执行，需要先把这些任务按预期的执行顺序放 到一个数组中。如图，所示，这个数组将起到队列的作用:完成一个任务后按顺序从数组中取 出下一个

![img](https://pic4.zhimg.com/80/v2-5b5b41971e5c894405df35e55d2fe39f_720w.jpg)



数组中的每个任务都是一个函数。任务完成后应该调用一个处理器函数，告诉它错误状态和 结果。如果有错误，处理器函数会终止执行;如果没有错误，处理器就从队列中取出下一个任务 执行它

下面是一个简单实现方案：

```js
// 数组
var tasks = [
    function A(){
        //...
        next();
    },
    function B(){
        //...
        next()
    },
    function C(){
        //...
        next()
    }
    //...
];

function next(err, result){
    if(err) throw err;
    var currentTask = tasks.shift();
    if(currentTask) currentTask(result)
    next();
}

// 首次主动调用
next();
```

异步串行控制方案除了上面的这种以外，还可以用es6的promise的then链、async/await、yeild、社区工具等；

可以看到代码确实谈不上高级 ，串行导致的性能谈不上优秀，但是得益于此它足够简单易用。到此可以发现express的中间件架构就是一个中间件的的管理与数组遍历运行，这个方案就让社区形形色色各种各样的中间件很好的添加express能力，这点很简单也很重要，因为后续的路由、静态文件服务、代理等都是中间件，都在这个框架内运行。

----

- NodeJS的http模块创建的服务
- express中间件思想的本质 - 异步串行化流程控制
- express的router实现原理
- 模板引擎
- 静态文件服务

![img](https://pic2.zhimg.com/80/v2-df324fff2a6e6ae252bc89b40aa13b1d_720w.jpg)

express核心主要是一个中间件串行控制方案，内置来router、静态文件服务中间件、扩展了req，res，其他功能都是集成了其他模块来加强的；确实是一个简单易用的web框架。