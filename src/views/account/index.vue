<template>
  <div class='app-container'>
    <!--卡片视图-搜索区-->
    <el-card class="filter-container" shadow="never">
      <div>
        <div style="float:left">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <el-button
          style="float:right"
          type="primary"
          @click="searchAccountList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 30px">
        <el-form :inline="true" :model="params" size="small" label-width="80px">
          <el-form-item label="状态：" class='select-form'>
            <el-select v-model="params.status" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in statusData"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!--用户列表区-->
    <div class='table-container'>
      <el-row :gutter='20'>
        <el-col :span='16'>
          <el-button  @click='addDialog' class='btnClass'>
            添加
          </el-button>
          <el-popconfirm
            confirm-button-text='确认'
            cancel-button-text='返回'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除这些数据吗？"
            @confirm="deleteAll">
            <el-button slot="reference" :disabled='btnFlag' class='btnClass'>删除</el-button>
          </el-popconfirm>
        </el-col>
        <el-col class='search' :span='4'>
          <el-input placeholder='请输入用户名搜索' @keyup.enter.native='searchAccountList' v-model="params.username" clearable @clear="searchAccountList">
            <el-button @click="searchAccountList" slot='append' icon='el-icon-search'></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data='accountData'
        border
        stripe
        style='width: 100%'
        @selection-change='handleSelectionChange'
        :default-sort="{prop: 'created', order: 'descending'}">
        <el-table-column type='expand'>
          <template slot-scope='props'>
            <el-form label-position='left' inline class='from-table'>
              <el-form-item label='用户账号'>
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label='邮箱'>
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label='用户昵称'>
                <span>{{ props.row.nickName }}</span>
              </el-form-item>
              <el-form-item label='所属角色'>
                <span>{{ props.row.roles }}</span>
              </el-form-item>
              <el-form-item label='状态'>
                <span>{{ props.row.status ? '启用' : '禁用' }}</span>
              </el-form-item>
              <el-form-item label='创建时间'>
                <span>{{ props.row.created }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type='selection' width='55'>
        </el-table-column>
        <el-table-column label='头像' width='80' align='center'>
          <template slot-scope='scope'>
            <img :src='host+scope.row.icon' width='50' height='50'/>
          </template>
        </el-table-column>
        <el-table-column prop='username' label='账号' align='center'>
        </el-table-column>
        <el-table-column prop='email' label='邮箱' align='center'>
        </el-table-column>
        <el-table-column prop='nickName' label='昵称' align='center'>
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
        <el-table-column label='操作' width='250'>
          <template slot-scope='scope'>
            <el-tooltip class='item' effect='dark' content='编辑' placement='top'>
              <el-button
                size='mini'
                type='primary' round
                @click='editDialog(scope.$index,scope.row.id)'>
                <svg-icon icon-class='edit'></svg-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='重置密码' placement='top'>
              <el-button
                size='mini'
                type='success' round
                @click="resetPwd(scope.$index,scope.row.id)">
                <svg-icon icon-class='resetPwd'></svg-icon>
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
            <el-tooltip class='item' effect='dark' content='分配角色' placement='top'>
              <el-button
                size='mini'
                type='warning' round
                @click='handleRoleDialog(scope.row.id,scope.row.roleList)'>
                <svg-icon icon-class='roles'></svg-icon>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination :query-info='params' @query='initList'></Pagination>
    <login-details :is-edit='isEdit' :dialogTitle='dialogTitle' :is-dialog='isDialog' :id="id" @dislogDetails='handleDialog'></login-details>
    <role-dialog v-model='roleDialogVisible' :roleList='roleList' :roleDialogVisible='roleDialogVisible' :id='id' @dislogDetails='handleRoleClose'></role-dialog>
  </div>
</template>

<script>
import { listByPage, update, deleteById, deleteBatches, resetPwd } from 'api/login'
import Pagination from 'components/common/Pagination'
import { params,resetParams } from 'utils/query'
import LoginDetails from './components/LoginDetails'
import RoleDialog from './components/RoleDialog'

export default {
  name: 'account',
  data() {
    return {
      accountData: [],
      multipleSelection: [],
      params: Object.assign({
              status: null,
      }, params),
      isEdit: false,
      isDialog: false,
      dialogTitle: null,
      id: null,
      host: process.env.BASE_API,
      btnFlag: true,
      roleDialogVisible: false,
      roleList: [],
      statusData: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    }
  },
  created() {
    this.initList()
  },
  components: {
    LoginDetails,
    Pagination,
    RoleDialog
  },
  methods: {
    initList(queryInfo) {
      listByPage(queryInfo).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.accountData = res.data.list
        this.params.total = res.data.total
      }).catch(err => {
        this.$message.error(err)
      })
    },
    searchAccountList(){
      this.initList(this.params);
    },
    handleResetSearch() {
      this.params = Object.assign({}, resetParams);
    },
    updateStatus(id, status) {
      update({ id: id, status: status }).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
      })
    },
    handleSelectionChange(val) {
      //console.log(val)
      this.multipleSelection = val
      if (this.multipleSelection.length>0){
        this.btnFlag = false
      }else {
        this.btnFlag = true
      }
    },
    addDialog() {
      this.isDialog = true;
      this.isEdit = false;
      this.dialogTitle = '添加用户'
    },
    editDialog(index, id) {
      this.isDialog = true;
      this.isEdit = true;
      this.id = id;
      this.dialogTitle = '修改用户'
    },
    handleDialog(flag){
      this.isDialog = flag;
      this.isEdit = flag;
      this.initList(this.params)
    },
    deleteAll(){
      let ids = []
      this.multipleSelection.forEach(r =>{
        ids.push(r.id)
      })
      deleteBatches(ids).then(res =>{
        this.$message({
          message: res.message,
          type: 'success',
          duration: 1000
        })
        this.initList(this.params);
      })
    },
    deleteHandler(index,id){
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
        })
      })
    },
    resetPwd(index,id){
      this.$confirm('确认要此用户密码吗？', '重置提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetPwd(id).then(res => {
          this.$message({
            message: res.message,
            type: 'success',
            duration: 1000
          });
        })
      })
    },
    handleRoleClose(flag){
      this.roleDialogVisible = flag;
      this.initList(this.params)
    },
    handleRoleDialog(id,roles){
      this.id = id
      this.roleList = roles
      this.roleDialogVisible = true
    }
  }
}
</script>

<style scoped lang='less'>
.box-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.title_span {
  height: 60px;
  float: left;
  text-align: start;
}
.search {
  float: right;
  margin-bottom: 10px;
}
.btnClass {
  float: left;
}
.select-form{
  float: left;
  margin-left: 0;
}
</style>
