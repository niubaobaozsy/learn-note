https://github.com/jimuyouyou/node-interview-questions

# node面试

- 终极目标是让大家对node有一个快速完整的认识

# 内容大纲

- [ES6新特性](https://github.com/jimuyouyou/node-interview-questions#es6新特性)
- [javascript高级话题(面向对象，作用域，闭包，设计模式等)](https://github.com/jimuyouyou/node-interview-questions#javascript高级话题面向对象作用域闭包设计模式等)
- [node核心内置类库(事件，流，文件，网络等)](https://github.com/jimuyouyou/node-interview-questions#node核心内置类库事件流文件网络等)
- [node高级话题(异步，部署，性能调优，异常调试等)](https://github.com/jimuyouyou/node-interview-questions#node高级话题异步部署性能调优异常调试等)
- [常用知名第三方类库(Async, Express等)](https://github.com/jimuyouyou/node-interview-questions#常用知名第三方类库async-express等)
- [其它相关后端常用技术(MongoDB, Redis, Apache, Nginx等)](https://github.com/jimuyouyou/node-interview-questions#其它相关后端常用技术mongodb-redis-apache-nginx等)
- [常用前端技术(Html5, CSS3, JQuery等)](https://github.com/jimuyouyou/node-interview-questions#常用前端技术html5-css3-jquery等)

有个整体认知

![img](https://github.com/jimuyouyou/node-interview-questions/raw/master/node_skillset.jpg)

node事件循环，没有理清楚，最好可以具体其他地方，最好有个实际运行例子

![img](https://github.com/jimuyouyou/node-interview-questions/raw/master/event_loop.jpg)

**ES6有哪些新特性？**

参考答案：类的支持，模块化，箭头操作符，let/const块作用域，字符串模板，解构，参数默认值/不定参数/拓展参数, for-of遍历, generator, Map/Set, Promise

- 1. js类继承的方法有哪些

参考答案：原型链法，属性复制法和构造器应用法. 另外，由于每个对象可以是一个类，这些方法也可以用于对象类的继承．

代码演示

1. 原型链法

```
	function Animal() {
		this.name = 'animal';
	}
	Animal.prototype.sayName = function(){
		alert(this.name);
	};

	function Person() {}
	Person.prototype = Animal.prototype; // 人继承自动物
	Person.prototype.constructor = 'Person'; // 更新构造函数为人
```

1. 属性复制法

```
	function Animal() {
		this.name = 'animal';
	}
	Animal.prototype.sayName = function() {
		alert(this.name);
	};

	function Person() {}

	for(prop in Animal.prototype) {
		Person.prototype[prop] = Animal.prototype[prop];
	} // 复制动物的所有属性到人量边
	Person.prototype.constructor = 'Person'; // 更新构造函数为人
```

1. 构造器应用法

```
	function Animal() {
		this.name = 'animal';
	}
	Animal.prototype.sayName = function() {
		alert(this.name);
	};

	function Person() {
		Animal.call(this); // apply, call, bind方法都可以．细微区别，后面会提到．
	}
```

```js
    function Man(name) {
      People.call(this);
    }

    Man.prototype = Object.create(People.prototype, {
      constructor: {
        value: Man
      }
    })
```

**js常用设计模式**的实现思路，单例，工厂，代理，装饰，观察者模式等
**装饰像ts中的装饰，可以为对象添加一些操作**

参考答案：

```js
	1) 单例：　任意对象都是单例，无须特别处理
	var obj = {name: 'michaelqin', age: 30};

	2) 工厂: 就是同样形式参数返回不同的实例
	function Person() { this.name = 'Person1'; }
	function Animal() { this.name = 'Animal1'; }

	function Factory() {}
	Factory.prototype.getInstance = function(className) {
		return eval('new ' + className + '()');
	}

	var factory = new Factory();
	var obj1 = factory.getInstance('Person');
	var obj2 = factory.getInstance('Animal');
	console.log(obj1.name); // Person1
	console.log(obj2.name); // Animal1

	3) 代理: 就是新建个类调用老类的接口,包一下
	function Person() { }
	Person.prototype.sayName = function() { console.log('michaelqin'); }
	Person.prototype.sayAge = function() { console.log(30); }

	function PersonProxy() {
		this.person = new Person();
		var that = this;
		this.callMethod = function(functionName) {
			console.log('before proxy:', functionName);
			that.person[functionName](); // 代理
			console.log('after proxy:', functionName);
		}
	}

	var pp = new PersonProxy();
	pp.callMethod('sayName'); // 代理调用Person的方法sayName()
	pp.callMethod('sayAge'); // 代理调用Person的方法sayAge()

	4) 观察者: 就是事件模式，比如按钮的onclick这样的应用.
	function Publisher() {
		this.listeners = [];
	}
	Publisher.prototype = {
		'addListener': function(listener) {
			this.listeners.push(listener);
		},

		'removeListener': function(listener) {
			delete this.listeners[this.listeners.indexOf(listener)];
		},

		'notify': function(obj) {
			for(var i = 0; i < this.listeners.length; i++) {
				var listener = this.listeners[i];
				if (typeof listener !== 'undefined') {
					listener.process(obj);
				}
			}
		}
	}; // 发布者

	function Subscriber() {

	}
	Subscriber.prototype = {
		'process': function(obj) {
			console.log(obj);
		}
	};　// 订阅者


	var publisher = new Publisher();
	publisher.addListener(new Subscriber());
	publisher.addListener(new Subscriber());
	publisher.notify({name: 'michaelqin', ageo: 30}); // 发布一个对象到所有订阅者
	publisher.notify('2 subscribers will both perform process'); // 发布一个字符串到所有订阅者
```

## node核心内置类库(事件，流，文件，网络等)

- 1. 为什么要用node?

参考答案: 总结起来node有以下几个特点:简单强大，轻量可扩展．简单体现在node使用的是javascript,json来进行编码，人人都会；强大体现在非阻塞IO,可以适应分块传输数据，较慢的网络环境，尤其擅长高并发访问；轻量体现在node本身既是代码，又是服务器，前后端使用统一语言;可扩展体现在可以轻松应对多实例，多服务器架构，同时有海量的第三方应用组件．

- 1. node的构架是什么样子的?

参考答案: 主要分为三层，应用app >> V8及node内置架构 >> 操作系统. V8是node运行的环境，可以理解为node虚拟机．node内置架构又可分为三层: 核心模块(javascript实现) >> c++绑定 >> libuv + CAes + http.

- 1. node有哪些核心模块?

参考答案: EventEmitter, Stream, FS, Net和全局对象

- 1. node有哪些全局对象?

参考答案: process, console, Buffer

- 1. process有哪些常用方法?

参考答案: process.stdin, process.stdout, process.stderr, process.on, process.env, process.argv, process.arch, process.platform, process.exit

node中的事件循环是什么样子的?**（todo：实际代码的输出）**
总体上执行顺序是：process.nextTick >> setImmidate >> setTimeout/SetInterval 看官网吧：

- 1. **怎么捕获EventEmitter的错误事件?**

参考答案: **监听error事件即可．如果有多个EventEmitter,也可以用domain来统一处理错误事件.**

**代码演示**

```
	var domain = require('domain');
	var myDomain = domain.create();
	myDomain.on('error', function(err){
		console.log('domain接收到的错误事件:', err);
	}); // 接收事件并打印
	myDomain.run(function(){
		var emitter1 = new MyEmitter();
		emitter1.emit('error', '错误事件来自emitter1');
		emitter2 = new MyEmitter();
		emitter2.emit('error', '错误事件来自emitter2');
	});
```

### 文件系统

- 1. 内置的fs模块架构是什么样子的?

参考答案: fs模块主要由下面几部分组成: 1) POSIX文件Wrapper,对应于操作系统的原生文件操作 2) 文件流 fs.createReadStream和fs.createWriteStream 3) 同步文件读写,fs.readFileSync和fs.writeFileSync 4) 异步文件读写, fs.readFile和fs.writeFile

- 1. 读写一个文件有多少种方法?

参考答案: 总体来说有四种: 1) POSIX式低层读写 2) 流式读写 3) 同步文件读写 4) 异步文件读写

- 1. 怎么读取json配置文件?

参考答案: 主要有两种方式，第一种是利用node内置的require('data.json')机制，直接得到js对象; 第二种是读入文件入内容，然后用JSON.parse(content)转换成js对象．二者的区别是require机制情况下，如果多个模块都加载了同一个json文件，那么其中一个改变了js对象，其它跟着改变，这是由node模块的缓存机制造成的，只有一个js模块对象; 第二种方式则可以随意改变加载后的js变量，而且各模块互不影响，因为他们都是独立的，是多个js对象.

- 1. fs.watch和fs.watchFile有什么区别，怎么应用?

参考答案: 二者主要用来监听文件变动．fs.watch利用操作系统原生机制来监听，可能不适用网络文件系统; fs.watchFile则是定期检查文件状态变更，适用于网络文件系统，但是相比fs.watch有些慢，因为不是实时机制．

- 1. node是怎样支持https,tls的?

参考答案: 主要实现以下几个步骤即可: 1) openssl生成公钥私钥 2) 服务器或客户端使用https替代http 3) 服务器或客户端加载公钥私钥证书  配置私密钥匙

- 1. exec,execFile,spawn和fork都是做什么用的?（todo **这个问题不清晰，必须要找个清楚的资料好好学下**）

参考答案: exec可以用操作系统原生的方式执行各种命令，如管道 cat ab.txt | grep hello; execFile是执行一个文件; spawn是流式和操作系统进行交互; fork是两个node程序(javascript)之间时行交互.

- 1. 两个node程序之间怎样交互?（todo 单拿出来好好看看）

参考答案: 用fork嘛，上面讲过了．原理是子程序用process.on, process.send，父程序里用child.on,child.send进行交互.
代码演示

```
	1) fork-parent.js
	var cp = require('child_process');
	var child = cp.fork('./fork-child.js');
	child.on('message', function(msg){
		console.log('老爸从儿子接受到数据:', msg);
	});
	child.send('我是你爸爸，送关怀来了!');

	2) fork-child.js
	process.on('message', function(msg){
		console.log("儿子从老爸接收到的数据:", msg);
		process.send("我不要关怀，我要银民币！");
	});
```

- 1. 怎样让一个js文件变得像linux命令一样可执行?

参考答案: 1) 在myCommand.js文件头部加入 #!/usr/bin/env node 2) chmod命令把js文件改为可执行即可 3) 进入文件目录，命令行输入myComand就是相当于node myComand.js了

## node高级话题(异步，部署，性能调优，异常调试等)

- 1. 怎样绑定node程序到80端口?

参考答案: 多种方式 1) sudo 2) apache/nginx代理 3) 用操作系统的firewall iptables进行端口重定向

- 1. 有哪些方法可以让node程序遇到错误后自动重启?  （todo）

参考答案: 1) runit 2) forever 3) nohup npm start &

- 1. 有哪些常用方法可以防止程序崩溃?

参考答案: 1) try-catch-finally 2) EventEmitter/Stream error事件处理 3) domain统一控制 4) jshint静态检查 5) jasmine/mocha进行单元测试

- 1. 怎样调试node程序?

参考答案: node --debug app.js 和node-inspector

- 1. 如何捕获NodeJS中的错误，有几种方法? 参考答案: 1) 监听错误事件req.on('error', function(){}), 适用EventEmitter存在的情况; 2) Promise.then.catch(error),适用Promise存在的情况 3) try-catch,适用async-await和js运行时异常，比如undefined object



- 1. 程序总是崩溃，怎样找出问题在哪里?

参考答案: 1) node --prof 查看哪些函数调用次数多 2) **memwatch和heapdump获得内存快照进行对比，查找内存溢出**



## 常用知名第三方类库(Async, Express等)

- 1. async都有哪些常用方法，分别是怎么用?

参考答案: async是一个js类库，它的目的是解决js中异常流程难以控制的问题．async不仅适用在node.js里，浏览器中也可以使用．

1. async.parallel并行执行完多个函数后，调用结束函数

```
	async.parallel([
	    function(){ ... },
	    function(){ ... }
	], callback);
```

1. async.series串行执行完多个函数后，调用结束函数

```
	async.series([
	    function(){ ... },
	    function(){ ... }
	]);
```

1. async.waterfall依次执行多个函数，后一个函数以前面函数的结果作为输入参数

```
	async.waterfall([
	    function(callback) {
	        callback(null, 'one', 'two');
	    },
	    function(arg1, arg2, callback) {
	      // arg1 now equals 'one' and arg2 now equals 'two'
	        callback(null, 'three');
	    },
	    function(arg1, callback) {
	        // arg1 now equals 'three'
	        callback(null, 'done');
	    }
	], function (err, result) {
	    // result now equals 'done'
	});
```

1. async.map异步执行多个数组，返回结果数组

```
	async.map(['file1','file2','file3'], fs.stat, function(err, results){
	    // results is now an array of stats for each file
	});
```

1. async.filter异步过滤多个数组，返回结果数组

```
	async.filter(['file1','file2','file3'], fs.exists, function(results){
	    // results now equals an array of the existing files
	});
```

- 1. express项目的目录大致是什么样子的

参考答案: app.js, package.json, bin/www, public, routes, views.

- 1. express常用函数

参考答案: express.Router路由组件,app.get路由定向，app.configure配置，app.set设定参数,app.use使用中间件

- 1. express中如何获取路由的参数

参考答案: /users/:name使用req.params.name来获取; req.body.username则是获得表单传入参数username; express路由支持常用通配符 ?, +, *, and ()

- 1. express response有哪些常用方法

参考答案: res.download() 弹出文件下载
res.end() 结束response
res.json() 返回json
res.jsonp() 返回jsonp
res.redirect() 重定向请求
res.render() 渲染模板
res.send() 返回多种形式数据
res.sendFile 返回文件
res.sendStatus() 返回状态

---

## 其它相关后端常用技术(MongoDB, Redis, Apache, Nginx等)

- 1. mongodb有哪些常用优化措施

参考答案: 类似传统数据库，索引和分区．

- 1. mongoose是什么？有支持哪些特性?

参考答案: mongoose是mongodb的文档映射模型．主要由Schema, Model和Instance三个方面组成．Schema就是定义数据类型，Model就是把Schema和js类绑定到一起，Instance就是一个对象实例．常见mongoose操作有,save, update, find. findOne, findById, static方法等．

- 1. redis支持哪些功能

参考答案: set/get, mset/hset/hmset/hmget/hgetall/hkeys, sadd/smembers, publish/subscribe, expire

- 1. redis最简单的应用

参考答案:

```
	var redis = require("redis"),
	    client = redis.createClient();

	client.set("foo_rand000000000000", "some fantastic value");
	client.get("foo_rand000000000000", function (err, reply) {
	    console.log(reply.toString());
	});
	client.end();
```

- 1. apache,nginx有什么区别?

参考答案: 二者都是代理服务器，功能类似．apache应用简单，相当广泛．nginx在分布式，静态转发方面比较有优势．

---

