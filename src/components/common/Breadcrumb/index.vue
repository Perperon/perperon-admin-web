<template>
  <!--公共面包屑导航区-->
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="(item.redirect==='noredirect'|| index>0) && item.meta.parentName">{{item.meta.parentName}}&nbsp;&nbsp;/&nbsp;&nbsp;</span>
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1">{{item.meta.title}}</span>
        <a v-else @click="handlerClick(item.redirect,item.path)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    },
    handlerClick(redirect,path){
      this.$router.push({path: redirect==null?path:redirect})
      this.$store.commit('SET_TAB_VALUE',redirect==null?path:redirect)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-breadcrumb{
    margin-bottom: 15px;
  }
</style>
