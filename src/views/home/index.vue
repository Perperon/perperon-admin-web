<template>

  <el-container  class='home-container'>
    <!--头部区-->
    <el-header>
      <div>
        <svg-icon icon-class="home"  style="width: 56px;height: 56px;color: #a2a9af"></svg-icon>
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="logoutAccount">退出登录</el-button>
    </el-header>
    <!--页面主题区-->
    <el-container>
      <!--侧边栏-->
      <el-aside width='200px'>Aside</el-aside>
      <!--内容区域-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  created() {

  },
  methods: {
    logoutAccount() {
      this.$store.dispatch('LogOut').then((res) => {
        this.$message.success('退出成功')
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #8d9299;
  color: #fff;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}

.el-aside {
  background-color: #d2d8de;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
