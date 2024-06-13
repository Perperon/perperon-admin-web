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
          <el-button class='btn-add' @click='dialogVisible = true' size='mini'>
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
            <el-form label-position='left' inline class='demo-table-expand'>
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
              >
                <svg-icon icon-class='edit'></svg-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='删除' placement='top'>
              <el-button
                size='mini'
                type='danger' round
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

    <!--添加信息框-->
    <el-dialog
      title='添加用户'
      :visible.sync='dialogVisible'
      width='40%'
      :before-close='handleClose'>
      <!--内容区-->
      <el-form :model='addForm' :rules='addFormRules' ref='addFormRef' label-width='150px'>
        <el-form-item label='用户名:' prop='username'>
          <el-input v-model='addForm.username' ></el-input>
        </el-form-item>
        <el-form-item label='昵称:' prop='nickName'>
          <el-input v-model='addForm.nickName' ></el-input>
        </el-form-item>
        <el-form-item label='邮箱:' prop='email'>
          <el-input v-model='addForm.email' ></el-input>
        </el-form-item>
        <el-form-item label='是否启用:' prop='status'>
          <el-radio-group v-model="addForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!--底部区-->
      <span slot='footer' class='dialog-footer'>
    <el-button @click='dialogVisible = false'>取 消</el-button>
    <el-button type='primary' @click='dialogVisible = false'>确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from 'components/common/Breadcrumb'
import { listByPage, update } from 'api/login'
import Pagination from 'components/common/Pagination'
import params from 'utils/query'

export default {
  name: 'account',
  data() {
    return {
      dialogVisible: false,
      addForm: {
        username: '',
        nickName: '',
        status: 1,
        email: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        nickName: [
          { required: true, message: '请输入你的昵称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]

      },
      accountData: [],
      multipleSelection: [],
      params: params
    }
  },
  created() {
    this.initList()
  },
  components: {
    Breadcrumb,
    Pagination
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    initList(queryInfo) {
      listByPage(queryInfo).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.accountData = res.data.list
        this.params.total = res.data.total
        //this.params.pageSize = res.data.pageSize;
      }).catch(err => {
        this.$message.error(err)
      })
    },
    searchAccountList(){
      this.initList(this.params);
    },
    updateStatus(id, status) {
      //console.log(data)
      update({ id: id, status: status }).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-form-item {
  font-family: 微软雅黑;
  font-weight: bold;
}
.el-radio-group {
  margin-right: 412px;
}
</style>
