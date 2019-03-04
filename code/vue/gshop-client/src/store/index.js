// vuex最核心的管理对象store
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import state from './state'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})