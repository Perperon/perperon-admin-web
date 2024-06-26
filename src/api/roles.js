import request from "utils/request"

export function listByPage(params){
  return request({
    url: '/role/listByPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url: '/role/update',
    method: 'put',
    data: data
  })
}

export function create(data){
  return request({
    url:'/role/create',
    method: 'post',
    data: data
  })
}

export function getById(id){
  return request({
    url:'/role/getById/'+id,
    method: 'get'
  })
}

export function deleteById(id){
  return request({
    url:'/role/delete/'+id,
    method: 'delete'
  })
}

export function grantRole(data){
  return request({
    url:'/role/grantRole',
    method: 'post',
    data: data,
    headers:{'Content-type':'application/json'}
  })
}
