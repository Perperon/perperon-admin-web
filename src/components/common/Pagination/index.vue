<template>
  <div class="pagination-container">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryInfo.pageNum"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryInfo.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props:{
    query:{
      type: Function,
      default: undefined
    },
    queryInfo:{
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods:{
    //每页多少条
    handleSizeChange(val) {
      this.queryInfo.pageNum = 1;
      this.queryInfo.pageSize = val;
      this.$emit('query',this.queryInfo);
      //console.log(`每页 ${val} 条`);
    },
    //当前页
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
      this.$emit('query',this.queryInfo);
      //console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="less" scoped>
</style>
