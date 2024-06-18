import request from "utils/request"

export function treeList(){
  return request({
    url: '/menu/treeList',
    method: 'get'
  })
}

export function listByPage(params){
  return request({
    url: '/menu/listByPage',
    method: 'get',
    params: params
  })
}

export function update(data){
  return request({
    url: '/menu/update',
    method: 'put',
    data: data
  })
}
