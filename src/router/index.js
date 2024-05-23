import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import about from '@/components/about'

Vue.use(Router)
const routes =[
  {
    path: '/',
    redirect: '/home', //首页重定向
    component: home
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  }
]
const router = new Router({
  routes,
  mode: 'history' //采用history方式路由，默认为hash模式
})

export default router
