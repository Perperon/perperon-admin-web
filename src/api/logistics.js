import request from "utils/request"

export function listByPage(params){
  return request({
    url: '/logistics/listByPage',
    method: 'get',
    params: params
  })
}

export function getByLogisticsNo(logisticsNo){
  return request({
    url:'/logistics/getByLogisticsNo/'+logisticsNo,
    method: 'get'
  })
}
