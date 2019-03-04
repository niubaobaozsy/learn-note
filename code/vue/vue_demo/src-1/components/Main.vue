<template>
    <div class="row">
        <h2 v-if="firstView">请输入用户名</h2>
        <h2 v-if="loading">loading</h2>
        <h1 v-if="errorMsg">{{errorMsg}}</h1>
      <div class="card" v-for="(user,index) in users" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.avatarUrl" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>
    </div>
</template>

<script>
import PubSub from 'pubsub-js';
import axios from 'axios'
export default {
  name: 'usermain',
  data(){
      return {
        firstView:true,
        loading : false,
        errorMsg:'',
        users:null
      }
  },
    mounted(){
        PubSub.subscribe('search',(msg,searchName)=>{
            console.log(this)
            const url = `https://api.github.com/search/repositories?q=${searchName}&sort=stars`;
            this.firstView= false;
            this.loading = true;
            this.users = null;
            this.errorMsg = '';
            axios.get(url).then(response=>{
                const users = response.data.items;
                this.loading = false;
                this.users = users.map(item=>({
                    url:item.owner.url,
                    avatarUrl:item.owner.avatar_url,
                    name:item.owner.login
                }));

            }).catch(error=>{
                this.loading = false;
                this.errorMsg = error
            })
        })
    }

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
