import request from "utils/request"

export function getDictionaryByCode(code){
  return request({
    url: '/dictionary/getDictionaryByCode/'+code,
    method: 'get'
  })
}

export function listByPage(params){
  return request({
    url: '/dictionary/listByPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url: '/dictionary/update',
    method: 'put',
    data: data
  })
}

export function create(data){
  return request({
    url:'/dictionary/create',
    method: 'post',
    data: data
  })
}

export function getById(id){
  return request({
    url:'/dictionary/getById/'+id,
    method: 'get'
  })
}

export function deleteById(id){
  return request({
    url:'/dictionary/delete/'+id,
    method: 'delete'
  })
}

export function deleteBatches(ids){
  return request({
    url:'/dictionary/deleteBatches',
    method: 'delete',
    data: ids
  })
}
