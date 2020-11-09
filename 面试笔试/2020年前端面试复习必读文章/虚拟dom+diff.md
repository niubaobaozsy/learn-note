### 虚拟dom

Virtual DOM是对DOM的抽象,本质上是JavaScript对象,这个对象就是更加轻量级的对DOM的描述.、

首先,我们都知道在前端性能优化的一个秘诀就是尽可能少地操作DOM,不仅仅是DOM相对较慢,更因为频繁变动DOM会造成浏览器的回流或者重回,这些都是性能的杀手,因此我们需要这一层抽象,在patch过程中尽可能地一次性将差异更新到DOM中,这样保证了DOM不会出现性能很差的情况

### Virtual DOM 的diff

Virtual DOM 的 diff才是整个Virtual DOM 中最难理解也最核心的部分,diff的目的就是比较新旧Virtual DOM Tree找出差异并更新.

---

新旧虚拟dom对比是虚拟dom中最核心的算法（patch，patch有补丁，修补的意思）.patch中最核心的是diff

使用patch算法计算出真正需要更新的节点，减少dom操作

patch的真正目的是修改dom节点

patch的过程就是创建，修改，删除节点

创建节点的两个场景：当oldVnode节点不存在时  && oldVnode和Vnode是完全不是同一个节点。说明要创建新的节点

删除场景：当只有oldVnde存在

更新场景：修旧节点是同一个

新增和删除节点都是简单的通过判断来进行，然后创建dom及子节点dom。同时考虑注释文本静态节点。

更新节点

1，创建节点，是创建一个新的节点到未处理节点前面。而不是插入到已处理后面（因为是按旧vonde生成dom，参考的是就dom，旧dom的已处理节点数不准确，因为可能同时添加了很多个新的节点。）

77页，优化策略

可以把别人写的diff算法放编辑器里面，断点查看

-----

首先说一下patch的核心diff算法，diff算法是通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，所以时间复杂度只有O(n)，是一种相当高效的算法。

/*  判断两个VNode节点是否是同一个节点，需要满足以下条件  key相同  tag（当前节点的标签名）相同  isComment（是否为注释节点）相同  是否data（当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息）都有定义  当标签是<input>的时候，type必须相同 */ 

patchVnode的规则是这样的：

1.如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），那么只需要替换elm以及componentInstance即可。

**2.新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心。**

3.如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。

4.当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。

5.当新老节点都无子节点的时候，只是文本的替换。



更新算法的diff流程

直接看源码可能比较难以滤清其中的关系，我们通过图来看一下。



![img](https://user-gold-cdn.xitu.io/2017/9/18/ed3fe3ef6c580e16711c39159ce87cd4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)img



首先，在新老两个VNode节点的左右头尾两侧都有一个变量标记，在遍历过程中这几个变量都会向中间靠拢。当oldStartIdx <= oldEndIdx或者newStartIdx <= newEndIdx时结束循环。

索引与VNode节点的对应关系：
oldStartIdx => oldStartVnode
oldEndIdx => oldEndVnode
newStartIdx => newStartVnode
newEndIdx => newEndVnode

**在遍历中，如果存在key，并且满足sameVnode，会将该DOM节点进行复用**，否则则会创建一个新的DOM节点。

首先，oldStartVnode、oldEndVnode与newStartVnode、newEndVnode两两比较一共有2*2=4种比较方法。

当新老VNode节点的start或者end满足sameVnode时，也就是sameVnode(oldStartVnode, newStartVnode)或者sameVnode(oldEndVnode, newEndVnode)，直接将该VNode节点进行patchVnode即可。



![img](https://user-gold-cdn.xitu.io/2017/9/18/dbf1c71d42eaddc6de60301aad17c860?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)img



如果oldStartVnode与newEndVnode满足sameVnode，即sameVnode(oldStartVnode, newEndVnode)。

这时候说明oldStartVnode已经跑到了oldEndVnode后面去了，进行patchVnode的同时还需要将真实DOM节点移动到oldEndVnode的后面。



![img](https://user-gold-cdn.xitu.io/2017/9/18/0b5beb1c771c3965a77c787fe55a3b57?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)img



如果oldEndVnode与newStartVnode满足sameVnode，即sameVnode(oldEndVnode, newStartVnode)。

这说明oldEndVnode跑到了oldStartVnode的前面，进行patchVnode的同时真实的DOM节点移动到了oldStartVnode的前面。



![img](https://user-gold-cdn.xitu.io/2017/9/18/dc9a1e0b27411b2585960e971559382f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)img



如果以上情况均不符合，则通过createKeyToOldIdx会得到一个oldKeyToIdx，里面存放了一个key为旧的VNode，value为对应index序列的哈希表。从这个哈希表中可以找到是否有与newStartVnode一致key的旧的VNode节点，如果同时满足sameVnode，patchVnode的同时会将这个真实DOM（elmToMove）移动到oldStartVnode对应的真实DOM的前面。



![img](https://user-gold-cdn.xitu.io/2017/9/18/ed03e90b708939205236225c582e26fb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)img



当然也有可能newStartVnode在旧的VNode节点找不到一致的key，或者是即便key相同却不是sameVnode，这个时候会调用createElm创建一个新的DOM节点。



![img](https://user-gold-cdn.xitu.io/2017/9/18/73241a7ea0b6f52c0df4d835a827f3b4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)img



到这里循环已经结束了，那么剩下我们还需要处理多余或者不够的真实DOM节点。

1.当结束时oldStartIdx > oldEndIdx，这个时候老的VNode节点已经遍历完了，但是新的节点还没有。说明了新的VNode节点实际上比老的VNode节点多，也就是比真实DOM多，需要将剩下的（也就是新增的）VNode节点插入到真实DOM节点中去，此时调用addVnodes（批量调用createElm的接口将这些节点加入到真实DOM中去）。



![img](https://user-gold-cdn.xitu.io/2017/9/18/22369d39d970155963bd71a1370e9b07?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)img



2。同理，当newStartIdx > newEndIdx时，新的VNode节点已经遍历完了，但是老的节点还有剩余，说明真实DOM节点多余了，需要从文档中删除，这时候调用removeVnodes将这些多余的真实DOM删除。



![img](https://user-gold-cdn.xitu.io/2017/9/18/c067fa75aa884a2c231d940de35ef7a1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

----

**有key，就会在四个指针都没有匹配的时候，在查找，于是则通过查找事先建立好的以旧的 VNode 为 key 值，对应 index 序列为 value 值的哈希表，如果找到，并且是同一个vnode，则移动该节点**

**如果找不到这个key，或者没有设置key，直接创建一个新的节点。**

移到未处理之前，okok冲冲冲

