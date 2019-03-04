# vue2.5零基础入门到项目实战开发旅游网站app（2）

### 第五章  Vue中的动画特效

#### vue中的css动画原理

vue中的css过渡动画。原理是在特定时间为dom元素添加或删除一些css样式。

![TIM截图20180723211808](E:\学习笔记\image\TIM截图20180723211808.png)

![TIM截图20180723211947](E:\学习笔记\image\TIM截图20180723211947.png)



#### 在vue中使用animate.css库

使用可以使用动画库，复杂的就不用自己来写

注意使用animate库，需要自定义类

![TIM截图20180723213418](E:\学习笔记\image\TIM截图20180723213418.png)![TIM截图20180723213640](E:\学习笔记\image\TIM截图20180723213640.png)

第一次显示dom元素也有动画

既有css动画，过渡动画（没有仔细看）。并确定好总体动画时间。也可以自己定义时间

![TIM截图20180723213936](E:\学习笔记\image\TIM截图20180723213936.png)

velocity.js vue中的动画库

### 第六章  Vue项目预热

npm是一个node的包管理工具

webpack前端打包编译工具

vue中项目名不能包含大写字母

---

#### vue项目代码介绍

package.json：其中包含了很多依赖包，说明项目中要用到那些依赖。

.gitignore：表示上传到git上忽略那些文件。

.eslintrc.js：表示代码规范，只有符合规范才不会报错。

.editorconfig：编辑器的一些配置语法。其中包含了tab键表示几个空格。

.babelrcf：采用的是单文件组件的方法。这个文件将代码转化为浏览器可识别的代码。

src文件夹下

main.js是整个项目的入口文件

App.vue项目根组件

router文件夹下放的是路由文件

components文件夹下放的是小组件

assets文件夹下放的是图片类资源

config文件夹下

基础配置信息:index.js

开发环境配置信息：dev.env.js

线上环境配置信息：prod.env.js

build文件下是打包使用的配置文件

文件夹知道是干嘛的就行。以后不会去修改。

#### 单文件组件与vue中的路由

单文件组件：其中一个组件放在一个文件中。这个文件中的组件写成三部分：模板、处理组件的逻辑、组件样式。

```
<template>
	//显示的是当前路由地址所对应的内容
	<router-view/>
</template>
index.js文件里面
其中@表示的是src目录下
import Home from '@/pages/home/Home'
```

希望那个路由显示那个组件

在路由中添加好，再添加这个组件的home.vue

实践的写两个路由

-----

单页面：使用的是js来挂载页面。首次加载慢，搜索效果坏

多页面：每点击一下都是一个页面：卡，但是搜索效果好

----

####项目代码初始化

1、设定页面必须是手机端：通过手指放大不了，永远时候1：1

2、添加一个css文件使得，解决不同手机默认的样式是不一样的问题。（如谷歌和火狐处理不同样式结果不同）

在入口文件mian.js中引入reset.css文件

`import './assets/styles/reset.css' `

----

#### 1像素边框问题

在多倍屏中，1个像素是css像素。不是物理像素。添加文件解决

---

#### click事件在移动端会延时三秒执行问题

安装第三方模块`npm install fastclick --save`

-----



## 第七章  旅游网站首页开发

手机端来布局的时候不是px，而是已字节为单位

`1rem = html font-size = 50px`        `86px/100=.86rem`

> display 中的flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。 

![TIM截图20180725121701](E:\学习笔记\image\TIM截图20180725121701.png)

![TIM截图20180725122524](E:\学习笔记\image\TIM截图20180725122524.png)

![TIM截图20180725122533](E:\学习笔记\image\TIM截图20180725122533.png)



暂停：问题：左边和右边大小不一致。解决：和老师的reset文件不一致

line-height

![TIM截图20180725180358](E:\学习笔记\image\TIM截图20180725180358.png)



> 在样式中引入其他样式。`@import '~@/assets/styles/varibles.styl'`
>
> 其中~@表示src这个目录

为一个路径添加好类似@表示src的简写方式E:\code\study\travel\build\webpack.base.conf.js

```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'styles': resolve('src/assets/styles'),
    }
  },
```

注意修改了webpack里面的配置选项的话。就需要重启。

轮播插件：

防抖动代码：

```css
.wrapper
  overflow: hidden
  width: 100%
  height: 0
  padding-bottom: 31.25%
```



```css
.wrapper >>> .swiper-pagination-bullet-active
  background: #fff
  穿透作用域，使得wrapper下的所有swiper-pagination-bullet-active都有这个效果
```

```
width: 100% padding-bottom:50%
width: 50% padding-bottom:50%
意思就是当宽度为100那么高度就是宽度的一半
意思就是当宽度为50%那么高度也是50%
```



```
通过使用计算属性来把要循环的数组拆分成不同页数，然后通过循环计算属性来得到8个图标轮播图的效果
```

```css
当p标签中字符串很长时，剪切并显示...
overflow:hidden
white-space: nowrap
text-overflow: ellipsis
```



