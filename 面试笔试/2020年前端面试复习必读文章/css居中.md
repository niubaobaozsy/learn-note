# css居中的几种方式

## flex

先背下常见的一些属性  

flex-direction

flex-wrap

(flex-flow是上面两个缩写)

justify-content  flex-end  flex-start center space-between space-around

align-items  flex-start | flex-end | center | baseline | stretch;  (交叉轴对齐方式)

flex-grow 0

flex-shrink 1

flex-basis auto

```css
flex是三个属性的简写
flex-grow flex-shrink flex-basis (0 1 auto)
为1的时候 （1，1，auto）
缩的时候，大家一起缩，伸的时候，0 1 0  只有flex为1的伸
```

和之前看到的答案差不多，加了笔记的就可以讲

----

## 之前的答案

---

## css 垂直居中。

行内元素

```css
.parent {
    height: 100px;
    border: 1px solid #ccc; /*设置border是为了方便查看效果*/
}
.parent img {
    //注意此时应该保证图片自身的高度或者你设置的高度小于父元素的200px的行高,不然你看不出来居中的效果.
    line-height: 100px;
}
```

**固定宽高**

- position absolute + 负margin （top left 都为50%，然后用负的margin）

  ```css
  /* 定位代码 */
  .wp {
      position: relative;
  }
  .box {
      position: absolute;;
      top: 50%;
      left: 50%;
      margin-left: -50px;
      margin-top: -50px;
  }
  ```

- position absolute + margin auto

- position absolute + calc（calc可以里面写一个计算表达式，然后计算中间的距离）

- position absolute + transform（利用3d转换，实现负margin一样的功能）

- css-table

- flex 

  ```css
  .wp {
      display: flex;
      justify-content: center;
      align-items: center;
  }
  ```

- grid

### position absolute + margin auto

css代码如下：

```
    /* 此处引用上面的公共代码 */
    .container {
        position: relative;
    }
    .box-center {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
```

### position absolute + 负margin

css代码如下：

```
    /* 此处引用上面的公共代码 */
    .container {
        position: relative;
    }
    .box-center {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
    }
```

### position absolute + calc

css代码如下：

```
    /* 此处引用上面的公共代码 */
    .container {
        position: relative;
    }
    .box-center {
        position: absolute;
        top: calc(50% - 50px);
        left: calc(50% - 50px);
    }
复制代码
```

通过`calc`计算属性减去元素本身高度和宽度的一半。

### flex

css代码如下：

```
    /* 此处引用上面的公共代码 */
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .box-center {
        text-align: center;
    }
```

