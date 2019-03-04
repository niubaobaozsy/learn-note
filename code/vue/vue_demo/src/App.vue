<template>
<div>
<p>{{$store.state.count}}</p>
<p>计算属性{{$store.getters.aaa}}</p>
<button @click="jiayi">点我加一</button>
</div>
</template>

<script>
export default {
  name: 'App',
//   computed:{
//       aaa(){
//           return this.$store.getters.aaa;
//       }
//   },也是可以的，计算属性不用在组件中定义了，可以直接调vuex中的getters中的属性
    methods:{
        jiayi(){
           this.$store.dispatch('jiayi')
        }
    }

}
</script>
<style>

</style>
