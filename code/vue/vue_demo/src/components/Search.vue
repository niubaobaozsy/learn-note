<template>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" v-model="searchName"/>
        <button @click="search">Search</button>
      </div>
    </section>
</template>

<script>
import PubSub from 'pubsub-js';
export default {
  name: 'search',
  data(){
      return {
          searchName:'',
      }
  },
  methods:{
      search:function(){
          const searchName = this.searchName.trim();
         
          if(searchName){
              PubSub.publish('search',searchName);
          }
      }
  },

}
</script>

<style>
.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}

</style>
