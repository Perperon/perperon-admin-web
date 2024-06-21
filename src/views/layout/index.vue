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
          <el-avatar fit='scale-down' :size="50" :src="base+$store.getters.avatar"></el-avatar>
          &nbsp;&nbsp;{{$store.getters.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item>切换角色</el-dropdown-item>
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
            <el-menu-item :index="subItem.path" v-for='subItem in item.children' :key='subItem.id'>
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
      <!--内容区域-->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
      menuList: [],
      collapse: false,
      active: 'collapse-item',
      base: process.env.BASE_API
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
      this.$store.dispatch("GetInfo").then(res => {
        if (res.code !== 200) return this.$message.error(res.msg)
        console.log(res.data)
        this.menuList = res.data.menus
      })
    },
    isCollapse(){
      this.collapse = !this.collapse
      this.active=this.collapse===true? 'collapse-item-active':'collapse-item'
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.logoutAccount()
      }
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
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
