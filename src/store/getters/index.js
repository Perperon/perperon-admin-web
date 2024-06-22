const index = {
  // sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.account.token,
  avatar: state => state.account.avatar,
  name: state => state.account.name,
  roles: state => state.account.roles,
  menus: state => state.account.menus,
  addRouters: state => state.permission.addRouters
}
export default index
