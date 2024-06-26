import axios from 'axios'
import store from 'store'
import { Message, MessageBox } from 'element-ui'
import { getToken } from 'utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
})
//请求拦截器
service.interceptors.request.use(res =>{
  if (store.getters.token && res.url !== '/account/login') {
    res.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  //做请求前处理
  return res
},err =>{
  //请求异常处理
  console.log(err)
  Promise.reject(err)
})

service.interceptors.response.use(response =>{
  //返回数据前处理
  /**
   * code为非200是抛错 可结合自己业务进行修改
   */
  const res = response.data
  if (res.code !== 200) {
    Message({
      message: res.message,
      type: 'error',
      duration: 3 * 1000
    })

    // 401:未登录;
    if (res.code === 401) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return Promise.reject(res)
  } else {
    return response.data
  }
},err =>{
  console.log('err' + err)// for debug
  Message({
    message: err.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(err)
})

export default service
