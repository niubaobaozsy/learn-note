# UI2

1. UI2的应用和页面

页面是UI2的核心，页面是一个相对独立可复用的界面展现和交互单元，它即可作为Web页面独立运行，也可作为一个页面片段嵌入到别的页面运行



多页应用和单页应用

多页就是会不断从一个页面调到另一个页面：浏览器

单页就是像vue一样，从始至终都是一个App,vue

---

解决多个js放在一起css和id和js冲突

xid + “页面实例标识” = id。

1、根据xid获取id：this.getIDByXID(xid)；
2、根据xid获取HTML节点：this.getElementByXid(xid)，此api的性能接近原生的document.getElementById；
3、根据xid获取组件实例：this.comp(xid)；

css也是将类名改成  类名+页面实例标识

js--->require.js



----

### wex5

场景：做一个可以curd的表格

1，先将model加入到设计面板上面

2，然后将需要用到的data放入

3，为data设计好每一列需要的值

4，如果需要表格首部的多选框

​	找到grid的属性multiselect，将它的值设为true

​	注意：表格的id十分重要，不能重复，如果重复则会导致checkbox出现问题

5，wex5的生命周期函数是绑定在model上的事件函数

​	等页面加载完毕之后的事件函数: onload

​	这说明，框架提供给的函数都放在设计中事件上，如果需要使用就为这个绑定自定义的事件

如果需要使用，则找到页面中的model 然后选中事件，找到对应的事件，并为它绑定自定义函数

```javascript
	//添加按钮事件
	Model.prototype.addButtonClick= function(event){
		console.log('我执行到这里来了')
		var dataLine = this.comp("dataLine");
		dataLine.newData({
		  "defaultValues":[
		    {id:new Date().getTime(),name:'小王',sex:'男',age:'19'}
		    ]
		});
	};
	//删除按钮事件
	Model.prototype.deteleButtonClick= function(event){
    //获取点击勾选的地方，删除数据，更新数据
        var dataLine = this.comp("dataLine");
        var grid = this.comp("grid1");
        var rowIDs = grid.getCheckeds();// 获取多选选中行的id，返回的是list数组
        var rows = [];
        var deteleStatus = true;
        if (rowIDs.length > 0) {
			for (var i = 0; i < rowIDs.length; i++) {// 遍历多选选中的行id
			//删除
				var rowsData = dataLine.getRowByID(rowIDs[i]);
				if(!dataLine.deleteData(rowsData)){
					deteleStatus = false;
				}
			}
		if(deteleStatus){
			$.cdc.success("删除成功！");
		}else{
			$.cdc.success("删除失败！");
		}
		dataLine.refreshData()
		} else {
			$.cdc.success("请选择要删除的行数据！");
		}
	};
```



----

可以看api文档的地方，编辑器——wex5文档——api文档

还有学长给的wex5文档