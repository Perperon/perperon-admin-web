<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const whitePath = ['/login','/','/home'];
export default {
  name: 'App',
  watch: {
    $route() {
      this.getTabs()
    }
  },
  methods:{
    // 获取当前路由的name和path,判断是否在白名单中,不在则加入到tab中,否则不处理
    getTabs(){
      if (whitePath.indexOf(this.$route.path) === -1){
        let obj ={
            menuName: this.$route.name,
            path: this.$route.path
        }
        // 判断是否已经存在该tab,如果存在则不处理,否则加入到tab中
        this.$store.commit('SET_TABS',obj)
      }
    }
  }
};
</script>

<style></style>
