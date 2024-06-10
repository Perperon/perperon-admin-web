<template>
  <div class='app-container'>
    <breadcrumb></breadcrumb>
    <!--卡片视图-搜索区-->
    <el-card class='box-card'>
      <el-row :gutter='20'>
        <el-col :span='6'>
          <el-input placeholder='请输入用户名搜索'>
            <el-button slot='append' icon='el-icon-search'></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
    <!--卡片视图-操作区-->
    <el-card class="operate-container" shadow="never">
      <el-row>
        <el-col :span="4">
          <i class="el-icon-tickets" style='float: left'></i>
          <span style='float: left;position: relative;left: 4px'>数据列表</span>
        </el-col>
        <el-col :span="20">
          <el-button class="btn-add" @click="addBrand()" size="mini">
            添加
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--用户列表区-->
    <div class="table-container">
      <el-table
        ref="multipleTable"
        :data='accountData'
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort = "{prop: 'created', order: 'descending'}">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户账号">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="用户昵称">
                <span>{{ props.row.nickName }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.status? '启用':'禁用' }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.created }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop='username' label='账号'  align="center">
        </el-table-column>
        <el-table-column prop='email' label='邮箱'  align="center">
        </el-table-column>
        <el-table-column prop='nickName' label='昵称'  align="center">
        </el-table-column>
        <el-table-column label='状态'  align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop='created' label='创建时间' sortable  align="center">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button
                size="mini"
                type="primary" round
              ><svg-icon icon-class='edit'></svg-icon></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
                size="mini"
                type="danger" round
              ><svg-icon icon-class='delete'></svg-icon></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button
                size="mini"
                type="warning" round
              ><svg-icon icon-class='roles'></svg-icon></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pageNum"
        :page-sizes="[1, 2, 4, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Breadcrumb from 'components/common/Breadcrumb'
import { listByPage } from 'api/login'

export default {
  name: 'account',
  data() {
    return {
      accountData: [],
      multipleSelection: [],
      queryInfo:{
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created() {
    this.accountList()
  },
  components: {
    Breadcrumb
  },
  methods: {
    addBrand() {
    },
    accountList() {
      listByPage(this.queryInfo).then(res => {
        if (res.code !== 200) return this.$message.error(res.msg)
        this.accountData = res.data.list
        this.total = res.data.total
        this.pageSize = res.data.pageSize;
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.queryInfo.pageNum = 1;
      this.queryInfo.pageSize = val;
      this.accountList();
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
      this.accountList();
      //console.log(`当前页: ${val}`);
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
</style>
