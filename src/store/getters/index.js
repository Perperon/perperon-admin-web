const index = {
  token: state => state.account.token,
  avatar: state => state.account.avatar,
  name: state => state.account.name,
  roles: state => state.account.roles,
  userInfo: state => state.account.userInfo,
  menus: state => state.account.menus,
  addRouters: state => state.permission.addRouters,
  permissions: state => state.permission.permissions,
  getEditableTabs: state => state.editableTabs,
  getEditableTabsValue: state => state.editableTabsValue
}
export default index
