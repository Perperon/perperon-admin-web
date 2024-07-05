import request from "utils/request"

export function deleteByRole(id){
  return request({
    url:'/rolemenu/delete/'+id,
    method: 'delete'
  })
}
