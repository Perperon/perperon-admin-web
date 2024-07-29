<template>
  <div class='app-container'>
    <el-card>
      <el-alert
        title='添加商品信息' center show-icon type='info' :closable='false'>
      </el-alert>
      <el-steps :space='250' :active="active - 0" finish-status="success" align-center>
        <el-step title="基本信息" ></el-step>
        <el-step title="商品参数" ></el-step>
        <el-step title="商品属性" ></el-step>
        <el-step title="商品图片" ></el-step>
        <el-step title="商品内容" ></el-step>
        <el-step title="完成" ></el-step>
      </el-steps>
      <el-tabs v-model='active' tab-position="left" style="height: 200px;">
        <el-tab-pane label="基本信息" name='0'>基本信息</el-tab-pane>
        <el-tab-pane label="商品参数" name='1'>商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name='2'>商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name='3'>商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name='4'>商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProductAdd',
  data(){
    return {
      active: 0
    }
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>

.el-steps{
   margin: 20px 0;
}

.el-step__title{
  font-size: 14px;
}
</style>
