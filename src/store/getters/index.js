const index = {
  // sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.account.token,
  avatar: state => state.account.avatar,
  name: state => state.account.name,
  roles: state => state.account.roles,
  userInfo: state => state.account.userInfo,
  menus: state => state.account.menus,
  addRouters: state => state.permission.addRouters,
  getEditableTabs: state => state.editableTabs,
  getEditableTabsValue: state => state.editableTabsValue
}
export default index
