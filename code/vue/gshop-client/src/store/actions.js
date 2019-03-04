import {reqAddress, reqCategorys, reqShops, reqUserInfo, reqLogout} from '../api' 
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER_INFO, RESET_USER_INFO} from './mutation-types'
export default { // 异 步 获 取 地 址 
    async getAddress({commit, state}) {
         const geohash = state.latitude + ',' + state.longitude 
         const result = await reqAddress(geohash) 
         commit(RECEIVE_ADDRESS, {address: result.data}) 
    },
//异 步 获 取 分 类 列 表 
    async getCategorys({commit}) {
         const result = await reqCategorys() 
         commit(RECEIVE_CATEGORYS, {categorys: result.data}) },
//异 步 获 取 商 家 列 表
    async getShops({commit, state}) { 
        const {latitude, longitude} = state 
        const result = await reqShops({latitude, longitude}) //发送请求
        commit(RECEIVE_SHOPS, {shops: result.data}) },//将返回的数据并保存
        //同步 更新user
    recordUser({commit},userInfo){
        commit(RECEIVE_USER_INFO,{userInfo})
    },
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code === 0){
            const userInfo = result.data
            commit(RECEIVE_USER_INFO,{userInfo})
        }
    },
    async logout({commit}){
        const result = await reqLogout()
        if(result.code === 0){
            commit(RESET_USER_INFO)
        }
    },

}
