<template>
<div class='app-container'>
  <div class='table-container'>
    <el-row :gutter='20'>
      <el-col :span='16'>
        <el-button  @click='addDialog' class='btnClass'>
          添加
        </el-button>
      </el-col>
    </el-row>

  <el-card>
    <!--列表区-->
    <el-table
      :data='menuData'
      row-key='id'
      border
      stripe
      style='width: 100%'
      :tree-props="{children:'children',hasChildren:'hasChildren'}"
      :default-sort="{prop: 'created', order: 'descending'}">
      <el-table-column prop="menuName" label="菜单" align='center'>
      </el-table-column>
      <el-table-column prop="icon" label="图标" align='center'>
        <template v-slot='scope'>
             <svg-icon :icon-class='scope.row.icon'></svg-icon>
        </template>
      </el-table-column>
      <el-table-column prop="perms" label="权限标识" align='center'>
      </el-table-column>
      <el-table-column prop="component" label="组件路径" align='center'>
      </el-table-column>
      <el-table-column prop="path" label="路由路径" align='center'>
      </el-table-column>
      <el-table-column prop="menuType" label="菜单类型" align='center'>
        <template v-slot='scope'>
           <el-tag size='small' v-if="scope.row.menuType === 'N'" effect='dark'>目录</el-tag>
           <el-tag size='small' v-if="scope.row.menuType === 'C'" type='success' effect='dark'>菜单</el-tag>
           <el-tag size='small' v-if="scope.row.menuType === 'F'" type='warning' effect='dark'>按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column label='状态' align='center'>
        <template slot-scope='scope'>
          <el-switch
            v-model='scope.row.status' @change='updateStatus(scope.row.id,scope.row.status)'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label='菜单等级' align='center'>
        <template slot-scope='scope'>
          <el-tag v-if="scope.row.level === 1">一级菜单</el-tag>
          <el-tag type="success" v-else-if="scope.row.level === 2">二级菜单</el-tag>
          <el-tag type="warning" v-else-if="scope.row.level === 3">三级菜单</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  </div>
</div>
</template>

<script>
import {treeMenuList,update} from 'api/menu'
export default {
  name: "index",
  data(){
    return{
      multipleSelection: [],
      menuData: []
    }
  },
  created() {
    this.initList()
  },
  methods:{
    initList(){
      treeMenuList().then(res =>{
        if (res.code != 200) return this.$message.error("获取数据失败")
        this.menuData=res.data
      })
    },
    updateStatus(id, status) {
      update({ id: id, status: status }).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
      })
    },
    addDialog(){

    }
  }
}
</script>

<style scoped>
.btnClass{
  float: left;
  margin-bottom: 5px;
}
</style>
