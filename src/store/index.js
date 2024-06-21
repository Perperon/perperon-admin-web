import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import getters from './getters/index'
import permission from './modules/permission'
Vue.use(Vuex)

const store = new Vuex.Store({
  //状态
  state:{
  },
  //state里面的属性需用mutations来改变
  mutations:{
  },
  //异步操作actions
  actions:{
  },
  //使用getters定义方法来调用计算或逻辑结果
  getters,
  //划分模块
  modules:{
    account,
    permission
  }
})


export default store
