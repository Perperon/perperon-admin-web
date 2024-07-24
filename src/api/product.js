import request from "utils/request"

export function listByPage(params){
  return request({
    url: '/product/listByPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url: '/product/update',
    method: 'put',
    data: data
  })
}

export function create(data){
  return request({
    url:'/product/create',
    method: 'post',
    data: data
  })
}

export function getById(id){
  return request({
    url:'/product/getById/'+id,
    method: 'get'
  })
}

export function deleteById(id){
  return request({
    url:'/product/delete/'+id,
    method: 'delete'
  })
}
