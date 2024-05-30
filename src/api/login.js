import request from "utils/request"

export function login(data){
  return request({
    url: '/account/login',
    method: 'post',
    data: data
  })
}

export function logout(){
  return request({
    url:'/account/logout',
    method: 'post'
  })
}

export function getInfo(){
  return request({
    url:'/account/logout',
    method: 'post'
  })
}
