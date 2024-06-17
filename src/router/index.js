import Vue from 'vue'
import Router from 'vue-router'
import layOut from 'views/layout/index'
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
    redirect: '/index',
    component: layOut,
    meta: { title: '首页' },
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('views/home/index')
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    redirect: '/product/list',
    component: layOut,
    meta: { title: '商品管理',icon: 'product' },
    children:[
      {
        path: '/product/list',
        name: 'productList',
        meta: { title: '商品列表',icon: 'product_list' },
        component: () => import('views/product/index')
      }
      ]
  },
  {
    path: '/account',
    name: 'account',
    redirect: '/account/list',
    component: layOut,
    meta: { title: '用户管理',icon: 'user' },
    children:[
      {
        path: '/account/list',
        name: 'accountList',
        meta: { title: '用户列表',icon: 'user_list' },
        component: () => import('views/account/index')
      },{
        path: '/account/add',
        name: 'accountAdd',
        meta: { title: '用户添加',icon: 'user_add' },
        component: () => import('views/account/components/LoginDetails')
      }
    ]
  }
]
const router = new Router({
  routes,
  mode: 'history' //采用history方式路由，默认为hash模式
})

export default router
