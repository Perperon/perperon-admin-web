import router from 'router/index';
//判断是否有权限访问该菜单
function hasPermission(menu, parentName) {
  if(!menu.component) return null
  const route = {
        path: menu.path,
        name: menu.menuName,
        meta: { parentName: parentName ,title: menu.menuName}
  }
    route.component = (resolve)=> require([`@/views${menu.component}`], resolve)
  return route;
}

const permission = {
  state: {
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menus } = data;
        const newRouters = router.options.routes
        menus.forEach(menu => {
             if (menu.children && menu.children.length > 0) {
               menu.children.forEach(child => {
                const route = hasPermission(child,menu.menuName)
                 if (route){
                     newRouters[2].children.push(route);
                 }
               })
             }
        })
        commit('SET_ROUTERS', newRouters);
        resolve();
      })
    }
  }
};

export default permission

