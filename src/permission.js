import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from 'utils/auth' // 验权


const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = getToken();
  if (token) {
    if (to.path === '/login') {
      return next()
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let menus = res.data.menus;
          let permissions = res.data.permissions;
          store.dispatch('GenerateRoutes', { menus, permissions }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            //this.$message.error(err || 'Verification failed, please login again')
            next("/login")
          })
        })
      } else {
        next()
      }
    }
    } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }

})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
