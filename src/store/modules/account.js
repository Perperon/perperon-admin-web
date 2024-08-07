import { login, logout, getInfo, getMenu } from 'api/login'
import { getToken, setToken, removeToken } from 'utils/auth'
import { getRoleId,removeRoleId,getRoleName,removeRoleName } from 'utils/support'
import { isEntry } from 'utils/date'

const account = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roleName:'',
    roles: [],
    roleList: [],
    menus: [],
    userInfo: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLE_NAME: (state, roleName) => {
      state.roleName = roleName
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLE_LIST: (state, roleList) => {
      state.roleList = roleList
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          const tokenStr = data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_NAME', data.nickName)
          commit('SET_AVATAR', data.icon)
          commit('SET_USERINFO', data.userInfo)
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLE_NAME', isEntry(getRoleName())?data.roleList[0].name:getRoleName())
            commit('SET_ROLES', data.roles)
            commit('SET_ROLE_LIST', data.roleList)
            getMenu(isEntry(getRoleId())?data.roleList[0].id:getRoleId()).then(res => {
              const data = res.data
              commit('SET_MENUS', data.menus)
              resolve(res)
            })
          } else {
            reject('getInfo: auth must be a non-null array !')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_ROLE_LIST', [])
          commit('SET_USERINFO', null)
          commit('RESET_TABS')
          removeToken()
          removeRoleId()
          removeRoleName()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default account
