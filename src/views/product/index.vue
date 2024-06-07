<template>
  <div class="app-container">
    <breadcrumb></breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <el-row>
        <el-col :span="4">
            <i class="el-icon-tickets" style='float: left'></i>
            <span style='float: left;position: relative;bottom: 71px;left: 4px'>数据列表</span>
        </el-col>
        <el-col :span="20">
          <el-button class="btn-add" @click="addBrand()" size="mini">
            添加
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
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
  methods:{
    addBrand(){
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.title_span{
  height: 60px;
  float: left;
  text-align: start;
}
</style>
