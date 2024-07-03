<template>
<div class='app-container'>
  <div class='table-container'>
    <el-row :gutter='20'>
      <el-col :span='16'>
        <el-button v-has="'menu:add'"  @click='addDialog' class='btnClass'>
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
      <el-table-column width="200px" label="操作">
        <template slot-scope='scope'>
          <el-tooltip class='item' effect='dark' content='编辑' placement='top'>
            <el-button
              size='mini'
              type='primary' round
              @click='editDialog(scope.$index,scope.row.id)'>
              <svg-icon icon-class='edit'></svg-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip class='item' effect='dark' content='删除' placement='top'>
            <el-button
              size='mini'
              type='danger' round
              @click="deleteHandler(scope.$index,scope.row.id)">
              <svg-icon icon-class='delete'></svg-icon>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
    <menu-details :is-edit='isEdit' :dialog-title='dialogTitle' :table-data='menuData' :is-dialog='isDialog' :id="id" @dislogDetails='handleDialog'></menu-details>
  </div>
</div>
</template>

<script>
import {treeMenuList,update,deleteById} from 'api/menu'
import MenuDetails from './components/MenuDetails'
export default {
  name: "index",
  components:{
    MenuDetails
  },
  data(){
    return{
      multipleSelection: [],
      menuData: [],
      isEdit: false,
      isDialog: false,
      id: null,
      dialogTitle: null
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
    addDialog() {
      this.isDialog = true;
      this.isEdit = false;
      this.dialogTitle = '添加菜单'
    },
    editDialog(index, id) {
      this.isDialog = true;
      this.isEdit = true;
      this.id = id;
      this.dialogTitle = '修改菜单'
    },
    handleDialog(flag) {
      this.isDialog = flag;
      this.isEdit = flag;
      this.initList(this.params)
    },
    deleteHandler(index, id) {
      this.$confirm('确认要删除此菜单', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.initList(this.params);
        });
      });
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
