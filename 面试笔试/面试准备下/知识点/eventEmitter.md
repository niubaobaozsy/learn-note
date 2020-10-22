# eventemitter

1，node中如何实现的，2 ，简易版本代码实现下(会简单的实现就行)

## 概览 EventEmitter

内部属性：

- `_events`：用来存储监听事件，可以是一个事件或事件数组。
- `_eventsCount`：记录已注册的监听事件个数。

主要方法：

- `emitter.addListener/on(eventName, listener)`       添加类型为 eventName 的监听事件到事件数组尾部
- `emitter.prependListener(eventName, listener)`      添加类型为 eventName 的监听事件到事件数组头部
- `emitter.emit(eventName[, ...args])`                触发类型为 eventName 的监听事件
- `emitter.removeListener/off(eventName, listener)`   移除类型为 eventName 的监听事件
- `emitter.once(eventName, listener)`                 添加类型为 eventName 的监听事件，以后只能执行一次并删除
- `emitter.removeAllListeners([eventName])`           移除全部类型为 eventName 的监听事件



**划重点 —— `Object.create(null)`  可以创建一个没有原型的对象 **。

----

```js
    function EventEmitter() {
      this._maxListeners = 10;
      this._events = Object.create(null);
    }

    // 向事件队列添加事件
    // prepend为true表示向事件队列头部添加事件
    EventEmitter.prototype.addListener = function (type, listener, prepend) {
      if (!this._events) {
        this._events = Object.create(null);
      }
      if (this._events[type]) {
        if (prepend) {
          this._events[type].unshift(listener);
        } else {
          this._events[type].push(listener);
        }
      } else {
        this._events[type] = [listener];
      }
    };

    // 移除某个事件
    EventEmitter.prototype.removeListener = function (type, listener) {
      if (Array.isArray(this._events[type])) {
        if (!listener) {
          delete this._events[type]
        } else {
          this._events[type] = this._events[type].filter(e => e !== listener && e.origin !== listener)
        }
      }
    };

    // 向事件队列添加事件，只执行一次
    EventEmitter.prototype.once = function (type, listener) {
      const only = (...args) => {
        listener.apply(this, args);
        this.removeListener(type, listener);
      }
      only.origin = listener;
      this.addListener(type, only);
    };

    // 执行某类事件
    EventEmitter.prototype.emit = function (type, ...args) {
      if (Array.isArray(this._events[type])) {
        this._events[type].forEach(fn => {
          fn.apply(this, args);
        });
      }
    };

    // 设置最大事件监听个数
    EventEmitter.prototype.setMaxListeners = function (count) {
      this.maxListeners = count;
    };
```

就是once就是去用变量控制，第一次的时候把变量锁死，然后把事件去掉

