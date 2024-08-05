import request from "utils/request"

export function listByParamPage(params){
  return request({
    url: '/productparam/listByPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url: '/productparam/update',
    method: 'put',
    data: data
  })
}

export function deleteById(id){
  return request({
    url:'/product/delete/'+id,
    method: 'delete'
  })
}
