import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from 'utils/auth' // 验权


const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = getToken();

    if (to.path === '/login') {
      return next()
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
     //其他请求需获取token
      if(!token){
         next({path: '/'})
      } else{
        next()
        NProgress.done()
      }
    }

})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
