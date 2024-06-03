import request from "utils/request"

export function treeList(){
  return request({
    url: '/menu/treeList',
    method: 'get'
  })
}
