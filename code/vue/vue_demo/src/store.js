//vuex核心管理对象模块：store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//默认向外暴露store
const state = {
  count: 0
}
const mutations = {
  IJAYIn(state){
      state.count++
  }
}
const actions = {
  jiayi({commit}){
      commit('IJAYIn')
  }
}
const getters = {
  aaa(state){
      console.log(state.count%2===0 ?'偶数':'奇数');
      return state.count%2===0 ?'偶数':'奇数';
  }
}
export default new Vuex.Store({
    state,//状态对象
    mutations,//包含多个更新state函数的对象
    actions,//包含多个对应事件回调函数的对象
    getters//包含多个getter计算属性函数的对象
})