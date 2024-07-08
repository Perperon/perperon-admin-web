import request from "utils/request"

export function treeMenuList(){
  return request({
    url: '/menu/treeMenuList',
    method: 'get'
  })
}

export function menuRoleList(roleId){
  return request({
    url: '/menu/menuRoleList/'+roleId,
    method: 'get'
  })
}

export function roleMenuList(roleId){
  return request({
    url: '/menu/roleMenuList/'+roleId,
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

export function create(data){
  return request({
    url:'/menu/create',
    method: 'post',
    data: data
  })
}

export function getById(id){
  return request({
    url:'/menu/getById/'+id,
    method: 'get'
  })
}

export function deleteById(id){
  return request({
    url:'/menu/delete/'+id,
    method: 'delete'
  })
}

export function grantMenu(data){
  return request({
    url: '/menu/grantMenu',
    method: 'post',
    data: data,
    headers:{'Content-type':'application/json'}
  })
}
