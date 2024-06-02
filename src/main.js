import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'assets/css/normalize.css' // A modern alternative to CSS resets
import './assets/styles/index.scss' //global css
import './icons'
import './permission'

Vue.config.productionTip = false
Vue.use(ElementUI,{locale});
Vue.prototype.$message = ElementUI.Message;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
