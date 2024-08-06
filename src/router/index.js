import Vue from 'vue'
import Router from 'vue-router'
import layOut from 'views/layout/index'
Vue.use(Router)

export const routes =[
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
      },
      {
        path: '/userCenter',
        name: '个人中心',
        meta: { title: '个人中心' },
        component: () => import('views/account/userCenter/index')
      }
    ]
  }
]
const router = new Router({
  routes,
  mode: 'history' //采用history方式路由，默认为hash模式
})

// 解决重复点击导航时，控制台出现报错
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router
