分别是：**浏览器CSS样式初始化、浏览器私有属性，CSS hack语法和自动化插件。**

**Normalize.css**，github star数量接近4万，自行选取展示其中几个样式设置，如下：

```text
html {
    line-height: 1.15; /* Correct the line height in all browsers */
    -webkit-text-size-adjust: 100%; /* Prevent adjustments of font size after orientation changes in iOS. */
}
body {
    margin: 0;
}
a {
    background-color: transparent; /* Remove the gray background on active links in IE 10. */
}
img {
    border-style: none; /*  Remove the border on images inside links in IE 10. */
}
```

通过CSS样式初始化，已经解决了一大部分因为浏览器默认样式导致的常规兼容性问题。接下来再看看浏览器的私有属性。



1. **浏览器私有属性**

-webkit- ，-moz- ，-ms-等，这是我们经常在某个CSS属性前添加的一些前缀，这些就是浏览器的私有属性。

说到私有属性的出现也是因为制定HTML和CSS标准的组织W3C动作很慢。

通常，有W3C组织成员提出一个新属性，比如圆角border-radius，大家都觉得好，但W3C制定标准，要走很复杂的程序。而浏览器商市场推广时间紧，如果一个属性已经够成熟了，就会在浏览器中加入支持。为避免日后W3C公布标准时有所变化，所以加入一个私有前缀，比如-webkit-border-radius，常用的前缀有：

- **-moz代表firefox浏览器私有属性**
- **-ms代表IE浏览器私有属性**
- **-webkit代表chrome、safari私有属性**
- **-o代表opera私有属性**

**对于书写顺序一定要注意，兼容性写法放到前面，把标准写法放到最后**

```text
-webkit-transform:rotate(-3deg); /*为Chrome/Safari*/
-moz-transform:rotate(-3deg); /*为Firefox*/
-ms-transform:rotate(-3deg); /*为IE*/
-o-transform:rotate(-3deg); /*为Opera*/
transform:rotate(-3deg); 
```

大家想一下，如果每个CSS属性写这么一堆兼容性代码，那无疑是对生命折磨，到后面就会讲如何通过自动化插件来处理。



todo: 那些属性需要加浏览器前缀

好像不用考虑，有工具可以实现

```js
vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        // browsers: ['last 2 versions']
         browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
      })
    ]
  }
```

**IE浏览器版本，如6、7、8，但IE10及以上版本已将条件注释特性移除，使用时需注意。**

- 举个例子

```text
<!--[if IE]>
    <p>你在非IE中将看不到我</p>
<![endif]-->

<!--[if IE]>
<style>
    .test{color:red;}
</style>
<![endif]-->

<!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
```

**属性hack：**在CSS样式属性名前加上一些只有特定浏览器才能识别的hack前缀。

```text
selector{<hack>?property:value<hack>?;}
```

**Autoprefixer**是一款自动管理浏览器前缀的插件，它可以解析CSS文件并且添加浏览器前缀到CSS内容里。