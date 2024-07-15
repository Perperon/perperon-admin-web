import Cookies from "js-cookie";

const SupportKey='supportKey';
const RoleId='roleId';

export function getSupport() {
  return Cookies.get(SupportKey)
}

export function setSupport(isSupport) {
  return Cookies.set(SupportKey, isSupport,{ expires: 1 })
}

export function setCookie(key,value,expires) {
  return Cookies.set(key, value,{ expires: expires})
}

export function getCookie(key) {
  return Cookies.get(key)
}

export function getRoleId() {
  return Cookies.get(RoleId)
}

export function setRoleId(isSupport) {
  return Cookies.set(RoleId, isSupport,{ expires: 1 })
}
