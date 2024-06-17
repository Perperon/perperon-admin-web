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

export function listByPage(params){
  return request({
    url:'/account/listByPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url:'/account/update',
    method: 'put',
    data: data
  })
}

export function create(data){
  return request({
    url:'/account/create',
    method: 'post',
    data: data
  })
}
