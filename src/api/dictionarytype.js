import request from "utils/request"

export function listByPage(params){
  return request({
    url: '/dictionarytype/listByPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url: '/dictionarytype/update',
    method: 'put',
    data: data
  })
}

export function create(data){
  return request({
    url:'/dictionarytype/create',
    method: 'post',
    data: data
  })
}

export function getById(id){
  return request({
    url:'/dictionarytype/getById/'+id,
    method: 'get'
  })
}

export function deleteById(id){
  return request({
    url:'/dictionarytype/delete/'+id,
    method: 'delete'
  })
}

export function deleteBatches(ids){
  return request({
    url:'/dictionarytype/deleteBatches',
    method: 'delete',
    data: ids
  })
}
