<template>
<div id="app">
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对React的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <Add :addComment="addComment"/>
      <List :comment="comment"/>
    </div>
  </div>
</div>
</template>

<script>
import Add from './components/Add';
import List from './components/List';

export default {
  name: 'App',
  data(){
    return {
      comment:[
        {name:"sam",message:"以后每个案例都动手实现"},
        {name:"tom",message:"学习使用充实"},
        {name:"zsy",message:"只有学习才是我所有一切的支柱"}
      ]
    }
  },
  methods:{
    addComment:function(coment){
      this.comment.unshift(coment);
    }
  },
  components:{
    Add,
    List
  },

}
</script>

<style>
.reply {
  margin-top: 0px;
}

li {
  transition: .5s;
  overflow: hidden;
}

.handle {
  width: 40px;
  border: 1px solid #ccc;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 1px;
  text-align: center;
}

.handle a {
  display: block;
  text-decoration: none;
}

.list-group-item .centence {
  padding: 0px 50px;
}

.user {
  font-size: 22px;
}
</style>
