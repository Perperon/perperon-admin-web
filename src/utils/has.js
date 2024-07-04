import Vue from 'vue'
import store from 'store'

const has = Vue.directive('has',{
  bind: function(el,binding,vnode){
    const needPermission = binding.value
    if (!Vue.prototype.$_has(needPermission)){
      setTimeout(() =>{
          el.parentNode.removeChild(el)
      },0)
    }
  }
})


Vue.prototype.$_has=function(value){
  let isExist = false
  const permissions = store.getters.permissions
  if (permissions == undefined || permissions==null){
    return false;
  }
  const hasPermissions = permissions.includes(value)
  if (hasPermissions){
      isExist = true
  }
  return isExist
}

export {has}
