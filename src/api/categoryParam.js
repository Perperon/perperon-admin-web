import request from "utils/request"

export function listByParamPage(params){
  return request({
    url: '/productcategoryparam/listByPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url: '/productcategoryparam/update',
    method: 'put',
    data: data
  })
}

export function create(data){
  return request({
    url:'/productcategoryparam/create',
    method: 'post',
    data: data
  })
}

export function getById(id){
  return request({
    url:'/productcategoryparam/getById/'+id,
    method: 'get'
  })
}

export function deleteById(id){
  return request({
    url:'/productcategoryparam/delete/'+id,
    method: 'delete'
  })
}
