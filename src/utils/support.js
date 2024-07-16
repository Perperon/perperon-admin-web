import Cookies from "js-cookie";

const SupportKey='supportKey';

const RoleId='roleId';

const RoleName='roleName';

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

export function setRoleId(roleId) {
  return Cookies.set(RoleId, roleId,{ expires: 1 })
}

export function removeRoleId() {
  return Cookies.remove(RoleId)
}

export function getRoleName() {
  return Cookies.get(RoleName)
}

export function setRoleName(roleName) {
  return Cookies.set(RoleName, roleName,{ expires: 1 })
}

export function removeRoleName() {
  return Cookies.remove(RoleName)
}
