<template>
  <div class='app-container'>
    <!--卡片视图-操作区-->
    <el-card class='operate-container' shadow='never'>
      <el-row>
        <el-col :span='4'>
          <i class='el-icon-tickets' style='float: left'></i>
          <span style='float: left;position: relative;left: 4px'>数据列表</span>
        </el-col>
        <el-col :span='20'>
          <el-button class='btn-add' @click='addDialog' size='mini'>
            添加
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--列表区-->
    <div class='table-container'>
      <el-card>
        <el-table
          ref="multipleTable"
          :data='roleData'
          border
          stripe
          style='width: 100%'
          @selection-change='handleSelectionChange'
          :default-sort="{prop: 'created', order: 'descending'}">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row :class="['auth_bottom',index===0 ? 'auth_top' : '','auth_center']" v-for="(item,index) in scope.row.children" :key='item.id'>
                <!--一级权限-->
                <el-col :span='5'>
                  <el-tag>{{item.menuName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!--二、三级权限-->
                <el-col :span='19'>
                  <el-row :class="[indexOne!==0 ? 'auth_top':'','auth_center']" v-for='(child,indexOne) in item.children' :key="child.id">
                    <el-col :span='6'>
                      <el-tag type='success'>{{child.menuName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span='18'>
                     <el-tag v-for='(itera,indexTwo) in child.children' :key='itera.id' type='warning'>
                       {{itera.menuName}}
                     </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type='selection' width='55'>
          </el-table-column>
          <el-table-column prop="name" label="角色名称" align='center'>
          </el-table-column>
          <el-table-column prop="code" label="编码" align='center'>
          </el-table-column>
          <el-table-column label='状态' align='center'>
            <template slot-scope='scope'>
              <el-switch
                v-model='scope.row.status' @change='updateStatus(scope.row.id,scope.row.status)'>
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop='created' label='创建时间' sortable align='center'>
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
              <el-tooltip class='item' effect='dark' content='分配权限' placement='top'>
                <el-button
                  size='mini'
                  type='warning' round>
                  <svg-icon icon-class='authzation'></svg-icon>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <Pagination :query-info='params' @query='initList'></Pagination>
    <role-details :is-edit='isEdit' :is-dialog='isDialog' :id="id" @dislogDetails='handleDialog'></role-details>
  </div>
</template>

<script>
import {listByPage, update, deleteById} from 'api/roles'
import Pagination from 'components/common/Pagination'
import params from 'utils/query'
import RoleDetails from './components/RoleDetails'

export default {
  name: "index",
  components: {
    Pagination,
    RoleDetails
  },
  data() {
    return {
      multipleSelection: [],
      roleData: [],
      params: params,
      isEdit: false,
      isDialog: false,
      id: null
    }
  },
  created() {
    this.initList(this.params)
  },
  methods: {
    initList(queryInfo) {
      listByPage(queryInfo).then(res => {
        if (res.code != 200) return this.$message.error("获取数据失败")
        this.roleData = res.data.list
        this.params.total = res.data.total
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    updateStatus(id, status) {
      update({id: id, status: status}).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
      })
    },
    addDialog() {
      this.isDialog = true;
      this.isEdit = false;
    },
    editDialog(index, id) {
      this.isDialog = true;
      this.isEdit = true;
      this.id = id;
    },
    handleDialog(flag) {
      this.isDialog = flag;
      this.isEdit = flag;
      this.initList(this.params)
    },
    deleteHandler(index, id) {
      this.$confirm('确认要删除此用户', '删除提示', {
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
.el-tag{
  margin: 7px;
}
.auth_top{
  border-top: 1px solid #eee;
}
.auth_bottom{
  border-bottom: 1px solid #eee;
}
.auth_center{
  display: flex;
  align-items: center;
}
</style>
