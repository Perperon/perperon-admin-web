<template>
  <div class='app-container'>
    <breadcrumb></breadcrumb>
    <!--卡片视图-搜索区-->
    <el-card class='box-card'>
      <el-row :gutter='20'>
        <el-col :span='6'>
          <el-input placeholder='请输入用户名搜索' v-model="params.username" clearable @clear="searchAccountList">
            <el-button @click="searchAccountList" slot='append' icon='el-icon-search'></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
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
    <!--用户列表区-->
    <div class='table-container'>
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
        <el-table-column label='操作'>
          <template slot-scope='scope'>
            <el-tooltip class='item' effect='dark' content='编辑' placement='top'>
              <el-button
                size='mini'
                type='primary' round
                @click='editDialog(scope.$index,scope.row.id)'
              >
                <svg-icon icon-class='edit'></svg-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='删除' placement='top'>
              <el-button
                size='mini'
                type='danger' round
                @click="deleteHandler(scope.$index,scope.row.id)"
              >
                <svg-icon icon-class='delete'></svg-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='分配角色' placement='top'>
              <el-button
                size='mini'
                type='warning' round
              >
                <svg-icon icon-class='roles'></svg-icon>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination :query-info='params' @query='initList'></Pagination>
    <login-details :is-edit='isEdit' :is-dialog='isDialog' :id="id" @dislogDetails='handleDialog'></login-details>
  </div>
</template>

<script>
import Breadcrumb from 'components/common/Breadcrumb'
import { listByPage, update, deleteById } from 'api/login'
import Pagination from 'components/common/Pagination'
import params from 'utils/query'
import LoginDetails from './components/LoginDetails'

export default {
  name: 'account',
  data() {
    return {
      accountData: [],
      multipleSelection: [],
      params: params,
      isEdit: false,
      isDialog: false,
      id: null
    }
  },
  created() {
    this.initList()
  },
  components: {
    LoginDetails,
    Breadcrumb,
    Pagination
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
    updateStatus(id, status) {
      update({ id: id, status: status }).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    addDialog(){
      this.isDialog = true;
      this.isEdit = false;
    },
    editDialog(index,id){
      this.isDialog = true;
      this.isEdit = true;
      this.id = id;
    },
    handleDialog(flag){
      console.log(flag);
      this.isDialog = flag;
      this.isEdit = flag;
      this.initList(this.params)
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
        });
      });
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
</style>
