import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes =[
  {
    path: '/login',
    component: () => import('views/login/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/home', //首页重定向
    component: home
  },
  {
    path: '/home',
    name: 'home',
    component: home
  }
]
const router = new Router({
  routes,
  mode: 'history' //采用history方式路由，默认为hash模式
})

export default router
