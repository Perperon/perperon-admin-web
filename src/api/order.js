import request from "utils/request"

export function listByPage(params){
  return request({
    url: '/order/listByPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url: '/order/update',
    method: 'put',
    data: data
  })
}

export function updateStatus(data){
  return request({
    url: '/order/updateStatus',
    method: 'put',
    data: data
  })
}

export function create(data){
  return request({
    url:'/order/create',
    method: 'post',
    data: data
  })
}

export function getById(id){
  return request({
    url:'/order/getById/'+id,
    method: 'get'
  })
}

export function deleteById(id){
  return request({
    url:'/order/delete/'+id,
    method: 'delete'
  })
}
