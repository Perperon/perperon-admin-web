<template>
  <breadcrumb></breadcrumb>
</template>

<script>
import Breadcrumb from 'components/common/Breadcrumb'
export default {
  name: "product",
  data(){
    return{
      levelList: null
    }
  },
  components:{
    Breadcrumb
  },
  created() {
   this.getBreadcrumb()
  },
  methods:{
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      console.log(matched)
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style scoped lang="less">

</style>
