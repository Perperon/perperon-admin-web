import request from "utils/request"

export function getDictionaryByCode(code){
  return request({
    url: '/dictionary/getDictionaryByCode/'+code,
    method: 'get'
  })
}
