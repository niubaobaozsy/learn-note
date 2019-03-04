<template>
          <li class="list-group-item">
            <div class="handle">
              <a href="javascript:;">删除</a>
            </div>
            <p class="user"><span >{{value.name}}</span><span>说:</span></p>
            <p class="centence">{{value.message}}!</p>
          </li>
</template>

<script>
export default {
  name: 'Item',
  props:['value'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
