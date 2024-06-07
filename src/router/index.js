import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes =[
  {
    path: '/',
    redirect: '/login', //首页重定向
  },
  {
    path: '/login',
    meta: { title: '用户登录' },
    component: () => import('views/login/index'),
    hidden: true
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/welcome',
    component: () => import('views/home/index'),
    meta: { title: '首页' },
    children:[
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('views/home/components/index')
      },
      {
        path: '/product/list',
        name: 'product',
        meta: { title: '商品列表',icon: 'product' },
        component: () => import('views/product/index')
      }
    ]
  }
]
const router = new Router({
  routes,
  mode: 'history' //采用history方式路由，默认为hash模式
})

export default router
