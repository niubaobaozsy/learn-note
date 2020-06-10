## 数组

### 双指针法

两层遍历就能解决数组里面所有的问题，但是运行速度很慢。

双指针法适合需要全遍历，然后一边遍历一边缩小范围。丢掉那些不可能的状态。

丢掉当前那个元素，因为离得最远的那个为长的面积已经保留了。

https://leetcode-cn.com/problems/container-with-most-water/solution/container-with-most-water-shuang-zhi-zhen-fa-yi-do/    

---

38g个tag，一天一个，精选200题加hot 100题。每天三道算法题

## 动态规划

- 最优子结构
- 边界
- 状态改变方程

状态改变方程推导出状态，时间复杂度太高的情况下，应该去缓存上面两步的结果

----

在牛客网和leecode一定要尽量使用自动补全

----

## 回溯

没有理解整个回溯的过程

给定一组**不含重复元素**的整数数组 *nums*，返回该数组所有可能的子集（幂集）。

**说明：**解集不能包含重复的子集

这个题有个很好理解的解法

分治：123就是等于12的所有幂集再加上3。

回溯不好理解

-----

二叉树之和左右子树有关，就是递归，递归的话，就考虑单棵树就行。还有函数的返回

-----

#### [124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

难度困难422收藏分享切换为英文关注反馈

给定一个**非空**二叉树，返回其最大路径和。

本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。该路径**至少包含一个**节点，且不一定经过根节点。

```js
// 这两个参数，不一样，上面那个会在不断递归中发生改变，并传递。如果要用数字类型为一个存储量，可以不在递归函数中传递。而是用全局变量。
// 如果想要每次递归状态不一样，则用参数
//　当前是用result来记录最大的路径
// !root可以判断是否为null 是当root为引用类型。如果为数值类型，！就会导致！0为true。多余的判断不要乱写
var maxPathSum = function(root) {
  let result = -Infinity
    maxP(root)
    return result
};
// int val = INT_MIN;
// 	maxPathSum(root, val);
// 	return val;
console.log(maxPathSum(root))


var maxPathSum = function(root) {
    let maxSum = -Infinity;
    let helper = function(node){
        if (node == null) return 0;
        // 返回0就不需要
        let leftVal = Math.max(helper(node.left), 0);
        let rightVal = Math.max(helper(node.right), 0);
        let newPath = node.val + leftVal + rightVal;
        maxSum = Math.max(maxSum, newPath);
        return node.val + Math.max(leftVal, rightVal);
    }
    helper(root);
    return maxSum;
};
var maxPathSum = function(root) {
  let result = -Infinity
    let maxP=  function(root){
        let left = 0
        let right = 0
        if(!root || !root.val) return 0
        left = maxP(root.left)
        right = maxP(root.right)
        result=(Math.max(left+root.val,right+root.val,result,left+root.val+right,root.val))
        return Math.max(left+root.val,right+root.val,root.val)
    }
    maxP(root)
    return result
};
```

```
解题思路：
二叉树 abc，a 是根结点（递归中的 root），bc 是左右子结点（代表其递归后的最优解）。
最大的路径，可能的路径情况：

    a
   / \
  b   c
b + a + c。
b + a + a 的父结点。
a + c + a 的父结点。
其中情况 1，表示如果不联络父结点的情况，或本身是根结点的情况。
这种情况是没法递归的，但是结果有可能是全局最大路径和。
情况 2 和 3，递归时计算 a+b 和 a+c，选择一个更优的方案返回，也就是上面说的递归后的最优解啦。

另外结点有可能是负值，最大和肯定就要想办法舍弃负值（max(0, x)）（max(0,x)）。
但是上面 3 种情况，无论哪种，a 作为联络点，都不能够舍弃。

代码中使用 val 来记录全局最大路径和。
ret 是情况 2 和 3。
lmr 是情况 1。

所要做的就是递归，递归时记录好全局最大和，返回联络最大和。
```

----

sort，默认是按aci码来排序

----

##　二叉树的遍历，使用非递归，迭代

栈加指针，来实现这个递归的过程

先将中间和左边的元素都入栈，然后当指针指向null，就将当前栈顶中的有元素出栈，同时，将出栈的元素压入结果数组中。如此重复

```js
var inorderTraversal = function(root) {
    let result = [],
        stack = [];
    while (root || stack.length > 0) {
        if (root) {
            stack.push(root);
            root = root.left;
            continue;
        }
        root = stack.pop();
        result.push(root.val)
        if (root) {
            root = root.right
        }
         
    }
    return result;
}
var inorderTraversal = function(root) {
    let res = [];
    let node = root;
    let stack = [];
    while (stack.length > 0 || node !== null) {
        if (node) {
            stack.push(node);
            node = node.left
        } else {
            node = stack.pop();
            res.push(node.val);
            node = node.right;
        }
    }
    return res;
};
```



我自己想的，会出现重复的元素，有个颜色标记的方法

他们都没有重复将中间元素压入栈。而我的重复压入栈了（队列，所以一定要避免重复入栈）

---

\1. 新数据插入到链表头部；

\2. 每当缓存命中（即缓存数据被访问），则将数据移到链表头部；

\3. 当链表满的时候，将链表尾部的数据丢弃。

---

到这里其实我们就能发现一些规律，我们可以像[三数之和](https://github.com/ConardLi/awesome-coding-js/blob/master/数据结构分类/数组/三数之和.md)那样，我们可以通过大小指针来逼近结果，从而达到降低一层时间复杂度的效果。

```js
    var threeSum = function (nums) {
      const result = [];
      nums.sort((a, b) => a - b);
      for (let i = 0; i < nums.length; i++) {
        // 跳过重复数字
        if (i && nums[i] === nums[i - 1]) { continue; }
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
          const sum = nums[i] + nums[left] + nums[right];
          if (sum > 0) {
            right--;
          } else if (sum < 0) {
            left++;
          } else {
            result.push([nums[i], nums[left++], nums[right--]]);
            // 跳过重复数字
            while (nums[left] === nums[left - 1]) {
              left++;
            }
            // 跳过重复数字
            while (nums[right] === nums[right + 1]) {
              right--;
            }
          }
        }
      }
      return result;
    }
```

```js
var threeSum = function(nums) {
    let result = []
    nums.sort((i,j)=>{
      return i-j
    })
    for(let i=0;i<nums.length;i++){
        let other = 0-nums[i]
      let left = i+1;
      let right = nums.length-1
      while(left<right){ //待改
        if(other-(nums[left]+nums[right])>0){
          left++
        }else if(other-(nums[left]+nums[right])<0){
          right--
        } else{
         let flag = false
         result.forEach(item=>{
           if(item[0]==nums[i] && item[1]==nums[left] && item[2]==nums[right]){
             flag = true
           }
         })
         if(!flag){
           result.push([nums[i],nums[left],nums[right]])
         }
          left++
          right--
        }
      }
    }
    return result
};
```

对比一下，很长的那种判断，并且两次以上用到了，就用一个临时变量存储下

代码长度减少，可读性强，容易找错，

去重，因为排序过了，当每次循环当前元素和上一个相同，则结束本次循环

双指针，移动指针的时候，如果当前元素和上一个相等，则再移动一次。得到一个结果时

------

## [394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)

```js
s = "3[a]2[bc]", 返回 "aaabcbc".
s = "3[a2[c]]", 返回 "accaccacc".
s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".
```

```js
var decodeString = function(str) {
  const reg = /(\d+)\[([^\[\]]+)\]/g;
  const res = str.replace(reg, (match, p1, p2) => p2.repeat(p1));
  return reg.test(res) ? decodeString(res): res;
};
console.log(decodeString("3[a3[bb]]2[bc]"))
const reg = / (\d+) \[ ( [ ^\[ \] ] + ) \] /g;
// 这个正则匹配单层的[]，不匹配多层
// [ ^\[ \] ] +  []中的^是反集不包含的意思
```

还有一种解法是栈，用括号匹配算法。暂时不做，太难了，之后提升再做

----

