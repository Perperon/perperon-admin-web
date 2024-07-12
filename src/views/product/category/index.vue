<template>
  <div class='app-container'>
    <div class='table-container'>
      <el-row :gutter='20'>
        <el-col :span='16'>
          <el-button v-has="'product:add'" @click='addDialog' class='btnClass'>
            添加分类
          </el-button>
        </el-col>
      </el-row>

      <el-card>
        <!--列表区-->
        <el-table
          ref="multipleTable"
          :data='categoryData'
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
<!--          <el-table-column label='头像' width='80' align='center'>-->
<!--            <template slot-scope='scope'>-->
<!--              <img :src='host+scope.row.icon' width='50' height='50'/>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column prop='username' label='账号' align='center'>
          </el-table-column>
          <el-table-column prop='email' label='邮箱' align='center'>
          </el-table-column>
          <el-table-column prop='nickName' label='昵称' align='center'>
          </el-table-column>
<!--          <el-table-column label='状态' align='center'>
            <template slot-scope='scope'>
              <el-switch
                v-model='scope.row.status' @change='updateStatus(scope.row.id,scope.row.status)'>
              </el-switch>
            </template>
          </el-table-column>-->
          <el-table-column prop='created' label='创建时间' sortable align='center'>
          </el-table-column>
          <el-table-column label='操作' width='250'>
            <template slot-scope='scope'>
              <el-tooltip class='item' effect='dark' content='编辑' placement='top' v-has="'account:update'">
                <el-button
                  size='mini'
                  type='primary' round
                  @click='editDialog(scope.$index,scope.row.id)'>
                  <svg-icon icon-class='edit'></svg-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip class='item' effect='dark' content='删除' placement='top' v-has="'account:delete'">
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
      <category-details :is-edit='isEdit' :dialog-title='dialogTitle' :table-data='menuData' :is-dialog='isDialog' :id='id'
                    @dislogDetails='handleDialog'></category-details>
    </div>
  </div>
</template>

<script>
import CategoryDetails from './components/CategoryDetails'
export default {
  name: 'index',
  components:{
    CategoryDetails
  },
  data() {
    return {
      id: null,
      categoryData: [],
      multipleSelection: [],
      params: Object.assign({
        status: null,
      }, params),
      isEdit: false,
      isDialog: false,
      dialogTitle: null
    }
  },
  created() {
    this.initList()
  },
  methods: {
    initList(queryInfo) {
      listByPage(queryInfo).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        console.log(res.data.list)
        this.accountData = res.data.list
        this.params.total = res.data.total
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleSelectionChange(val) {
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
        })
      })
    },
  }
}
</script>

<style scoped>

</style>
