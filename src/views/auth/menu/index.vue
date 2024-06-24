<template>
<div class='app-container'>
  <div class='table-container'>
  <el-card>
    <!--列表区-->
    <el-table
      ref="multipleTable"
      :data='menuData'
      border
      stripe
      style='width: 100%'
      @selection-change='handleSelectionChange'
      :default-sort="{prop: 'created', order: 'descending'}">
      <el-table-column prop="menuName" label="菜单" align='center'>
      </el-table-column>
      <el-table-column prop="path" label="路径" align='center'>
      </el-table-column>
      <el-table-column label='状态' align='center'>
        <template slot-scope='scope'>
          <el-switch
            v-model='scope.row.status' @change='updateStatus(scope.row.id,scope.row.status)'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label='状态' align='center'>
        <template slot-scope='scope'>
          <el-tag v-if="scope.row.level === 1">一级菜单</el-tag>
          <el-tag type="success" v-else-if="scope.row.level === 2">二级菜单</el-tag>
          <el-tag type="warning" v-else-if="scope.row.level === 3">三级菜单</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  </div>
  <Pagination :query-info='params' @query='initList'></Pagination>
</div>
</template>

<script>
import {listByPage,update} from 'api/menu'
import Pagination from 'components/common/Pagination'
import params from 'utils/query'
export default {
  name: "index",
  components:{
    Pagination
  },
  data(){
    return{
      multipleSelection: [],
      menuData: [],
      params: params
    }
  },
  created() {
    this.initList(this.params)
  },
  methods:{
    initList(queryInfo){
      listByPage(queryInfo).then(res =>{
        if (res.code != 200) return this.$message.error("获取数据失败")
        this.menuData=res.data.list
        this.params.total = res.data.total
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    updateStatus(id, status) {
      update({ id: id, status: status }).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
      })
    },
  }
}
</script>

<style scoped>

</style>
