# javascript DOM事件BOM

####文档节点（document） 

• 文档节点document，代表的是整个HTML文 档，网页中的所有节点都是它的子节点。 

• document对象作为window对象的属性存在 的，我们不用获取可以直接使用。

 • 通过该对象我们可以在整个文档访问内查找节 点对象，并可以通过该对象创建各种节点对象。    

#### 获取元素节点

 • 通过document对象调用 

1. getElementById() – 通过id属性获取一个元素节点对象
2. getElementsByTagName() – 通过标签名获取一组元素节点对象 
3. getElementsByName() – 通过name属性获取一组元素节点对象    

#### 获取元素节点的子节点

 • 通过具体的元素节点调用

  1. getElementsByTagName() – 方法，返回当前节点的指定标签名后代节点 
  2. childNodes – 属性，表示当前节点的所有子节点 
  3. firstChild – 属性，表示当前节点的第一个子节点 
  4. lastChild – 属性，表示当前节点的最后一个子节点    

####获取父节点和兄弟节点 

• 通过具体的节点调用

  1. parentNode – 属性，表示当前节点的父节点 
  2. previousSibling – 属性，表示当前节点的前一个兄弟节点 
  3. nextSibling – 属性，表示当前节点的后一个兄弟节点    

#### 元素节点的属性 

• 获取， 元素对象.属性名 

例： element.value element.id element.className 

• 设置，对象.属性名=新的值 

例： element.value = “hello” element.id = “id01” element.className = “newClass”    

其他属性 

• nodeValue – 文本节点可以通过nodeValue属性获取和设置 文本节点的内容 

• innerHTML – 元素节点通过该属性获取和设置标签内部的 html代码    

#### 使用CSS选择器进行查询 

• **querySelector()** 

• querySelectorAll()

 • 这两个方法都是用document对象来调用，两个方法使用相同， 都是传递一个选择器字符串作为参数，方法会自动根据选择器 字符串去网页中查找元素。 

• **不同的地方是querySelector()只会返回找到的第一个元素，而 querySelectorAll()会返回所有符合条件的元素。** 

#### 节点的修改

 • 这里的修改我们主要指对元素节点的操作。

 • 创建节点 – document.createElement(标签名) 

• 删除节点 – 父节点.removeChild(子节点) 

• 替换节点 – 父节点.replaceChild(新节点 , 旧节点) 

• 插入节点 – 父节点.appendChild(子节点) – 父节点.insertBefore(新节点 , 旧节点)    

#### 事件处理中的this 

• 在事件处理程序内的 this 所引用的对象即 是设定了该事件处理程序的元素。 

• **也就是事件是给那个对象绑定的this就是哪 个对象。**    

#### 什么是BOM 

• ECMAScript无疑是JavaScript的核心，但是要想在浏 览器中使用JavaScript，那么BOM（浏览器对象模型） 才是真正的核心。 

• BOM 提供了很多对象，用于访问浏览器的功能，这些 功能与任何网页内容无关。

 • BOM将浏览器中的各个部分转换成了一个一个的对象， 我们通过修改这些对象的属性，调用他们的方法，从而 控制浏览器的各种行为    

#### location对象

 • location对象提供了与当前窗口中加载的文档有关的信息，还提供了一些导 航功能。

 • href属性： – href属性可以获取或修改当前页面的完整的URL地址，使浏览器跳转到指定页面。

 • assign() 方法 – 所用和href一样，使浏览器跳转页面，新地址错误参数传递到assign ()方法中 

• replace()方法 – 功能一样，只不过使用replace方法跳转地址不会体现到历史记录中。

 • reload() 方法 – 用于强制刷新当前页面    

#### navigator对象

 • navigator 对象包含了浏览器的版本、浏览 器所支持的插件、浏览器所使用的语言等 各种与浏览器相关的信息。

 • 我们有时会使用navigator的userAgent属 性来检查用户浏览器的版本。    

#### history对象

 • history 对象保存着用户上网的历史记录， 从窗口被打开的那一刻算起。

 • go() – 使用 go() 方法可以在用户的历史记录中任意跳 转，可以向后也可以向前。

 • back() – 向后跳转

 • forward() – 向前跳转    

#### document

 • document对象也是window的一个属性， 这个对象代表的是整个网页的文档对象。

 • 我们对网页的大部分操作都需要以 document对象作为起点。 

• 关于document对象的内容，我们后边还要 具体讲解。    