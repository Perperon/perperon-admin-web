<template>

  <el-container class='home-container'>
    <!--头部区-->
    <el-header>
      <div>
        <svg-icon icon-class='home' style='width: 84px;height: 56px;color: #a2a9af'></svg-icon>
        <span>电商后台管理系统</span>
      </div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <!--头像-->
          <el-avatar fit='scale-down' :size="50" :src="avatar"></el-avatar>
          &nbsp;&nbsp;{{$store.getters.name}}({{roleName}})
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <a @click="handlerClick('/home')">首页</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click='roleDialog()'>切换角色</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="handlerClick('/userCenter')">个人中心</a>
          </el-dropdown-item>
          <el-dropdown-item command='logout' divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!--页面主题区-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="collapse? '64px':'200px'">
        <!--是否折叠-->
        <div @click='isCollapse' :class='active'><svg-icon icon-class='collapse' collapse-transition='false'></svg-icon></div>
        <!--侧边栏 菜单-->
        <el-menu
          class='el-menu-vertical-demo'
          background-color='#26384d'
          text-color='#dbdbdb'
          active-text-color='#0c7fef' unique-opened :collapse='collapse' router :default-active="$route.path">
          <!--一级菜单-->
          <el-submenu :index='item.path' v-for='item in menuList' :key='item.id'>
            <template slot='title'>
              <!--图标-->
              <svg-icon :icon-class='item.icon'></svg-icon>
              <!--文本-->
              <span>{{item.menuName}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="subItem.path" v-for='subItem in item.children' :key='subItem.id' @click='openTab(subItem)'>
              <template slot='title'  class='menuItem'>
                <!--图标-->
                <svg-icon :icon-class='subItem.icon'></svg-icon>
                <!--文本-->
                <span>{{subItem.menuName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
      <!--内容区域-->
      <el-main>
        <breadcrumb></breadcrumb>
        <tabs-page></tabs-page>
        <user-role-switch v-model='roleDialogVisible' :roleId='roleId'  :roleList='roleList' :roleDialogVisible='roleDialogVisible' :id='id' @dislogDetails='handleRoleClose'></user-role-switch>
        <router-view/>
      </el-main>
      <el-footer>
          <div>
            Copyright @2024-2030 个人学习项目版权 版权所有@Perperon &nbsp;&nbsp;<a href='https://github.com/Perperon/perperon-admin-web' target='_blank'>github官网</a>
          </div>
      </el-footer>
    </el-container>
    </el-container>
  </el-container>

</template>

<script>
import TabsPage from 'components/common/TabsPage'
import Breadcrumb from 'components/common/Breadcrumb'
import userRoleSwitch from 'views/account/roleSwitch/userRoleSwitch'
import {getRoleId} from 'utils/support'
import {isEntry} from 'utils/date'
export default {
  name: 'layout',
  components:{
    TabsPage,
    Breadcrumb,
    userRoleSwitch
  },
  data() {
    return {
      menuList: [],
      collapse: false,
      active: 'collapse-item',
      avatar: process.env.BASE_API + this.$store.getters.avatar,
      roleName: this.$store.getters.roleName,
      roleDialogVisible: false,
      roleList: [],
      id: null,
      roleId: null
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    logoutAccount() {
      this.$store.dispatch('LogOut').then((res) => {
        this.$message.success('退出成功')
        this.$router.push('/')
      })
    },
    //获取菜单
    getMenus(){
      this.menuList = this.$store.getters.menus
    },
    isCollapse(){
      this.collapse = !this.collapse
      this.active=this.collapse===true? 'collapse-item-active':'collapse-item'
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.logoutAccount()
      }
    },
    openTab(item){
      this.$store.commit("SET_TAB",item)
    },
    handlerClick(path){
      this.$router.push({path: path})
    },
    handleRoleClose(details){
      this.roleDialogVisible = details.dislogFlag;
      this.roleId = details.roleId
      this.roleName = this.$store.getters.roleName
      this.$store.commit("SET_TAB_VALUE",'/index')
      this.$store.commit('RESET_TABS')
      this.$router.push({path: '/index'})
      this.getMenus()
    },
    roleDialog() {
      if (!this.roleId){
        this.roleId=isEntry(getRoleId())?this.$store.getters.roleList[0].id:getRoleId()
      }
      this.roleList=this.$store.getters.roleList
      this.id = this.$store.getters.userInfo.id
      this.roleDialogVisible = true
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #304156;
  color: #924aa6;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}

.el-header div {
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
}

.el-aside {
  background-color: #26384d;
  color: #333;
  text-align: center;
  line-height: 200px;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}
.el-menu-item {
  padding: 0 5px;
}
.collapse-item{
  line-height: 24px;
  width: 23px;
  position: relative;
  left: 171px;
}
.collapse-item-active{
  line-height: 24px;
  width: 23px;
  position: relative;
  left: 30px;
}
.el-dropdown-link{
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #dde1e5;
}
.el-footer{
  background-color: #E9EEF3;
  padding: 20px;
  display: flex;
  color: #99a9bf;
  align-items: center;
}
</style>
