import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import getters from './getters/index'
import permission from './modules/permission'
Vue.use(Vuex)

const store = new Vuex.Store({
  //状态
  state:{
    editableTabsValue: '/index',
    editableTabs:[
      {
        title: '首页',
        name: '/index'
      }
    ]
  },
  //state里面的属性需用mutations来改变
  mutations:{
    SET_TABS:(state,tab) =>{
      if (state.editableTabs.findIndex(e=>e.name===tab.path)===-1){
        state.editableTabs.push({
          title: tab.menuName,
          name: tab.path
        })
      }
      state.editableTabsValue = tab.path
    },
    SET_TABS_VALUE:(state,value) =>{
      state.editableTabsValue = value;
    },
    RESET_TABS:(state) =>{
      state.editableTabsValue = '/index';
      state.editableTabs=[
        {
          title: '首页',
          name: '/index'
        }
      ]
    }
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
