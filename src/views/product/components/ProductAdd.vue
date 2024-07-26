<template>
  <div class='app-container'>
    <el-card>
      <el-alert
        title='添加商品信息' center show-icon type='info' :closable='false'>
      </el-alert>
      <el-steps :space='250' :active="1" finish-status="success" align-center>
        <el-step title="基本信息" ></el-step>
        <el-step title="商品参数" ></el-step>
        <el-step title="商品属性" ></el-step>
        <el-step title="商品图片" ></el-step>
        <el-step title="商品内容" ></el-step>
        <el-step title="完成" ></el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProductAdd'
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
