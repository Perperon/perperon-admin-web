import request from "utils/request"

export function listByPage(params){
  return request({
    url: '/productcategory/listByPage',
    method: 'get',
    params: params
  })
}

export function listByParentPage(params){
  return request({
    url: '/productcategory/listByParentPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url: '/productcategory/update',
    method: 'put',
    data: data
  })
}

export function create(data){
  return request({
    url:'/productcategory/create',
    method: 'post',
    data: data
  })
}

export function getById(id){
  return request({
    url:'/productcategory/getById/'+id,
    method: 'get'
  })
}

export function deleteById(id){
  return request({
    url:'/productcategory/delete/'+id,
    method: 'delete'
  })
}
