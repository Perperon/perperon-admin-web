<template>
  <div class='app-container'>
    <div class='table-container'>
      <el-row :gutter='20'>
        <el-col :span='16'>
          <el-button v-has="'product:category:add'" @click='addDialog' class='btnClass'>
            添加分类
          </el-button>
        </el-col>
      </el-row>

      <el-card>
        <!--列表区-->
<!--        <el-table
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
                <el-form-item label='分类名称'>
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label='分类图标'>
                  <span>{{ props.row.icon }}</span>
                </el-form-item>
                <el-form-item label='状态'>
                  <span>{{ props.row.status ? '启用' : '禁用' }}</span>
                </el-form-item>
                <el-form-item label='创建人'>
                  <span>{{ props.row.userName }}</span>
                </el-form-item>
                <el-form-item label='创建时间'>
                  <span>{{ props.row.created }}</span>
                </el-form-item>
                <el-form-item label='更新人'>
                  <span>{{ props.row.updatedName }}</span>
                </el-form-item>
                <el-form-item label='更新时间'>
                  <span>{{ props.row.updated }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type='selection' width='55'>
          </el-table-column>
          <el-table-column label='分类图标' width='80' align='center'>
            <template slot-scope='scope'>
              <svg-icon :icon-class='scope.row.icon'></svg-icon>
            </template>
          </el-table-column>
          <el-table-column prop='name' label='分类名称' align='center'>
          </el-table-column>
          <el-table-column label='状态' align='center'>
            <template slot-scope='scope'>
              <el-switch
                v-model='scope.row.status' @change='updateStatus(scope.row.id,scope.row.status)'>
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop='userName' label='创建人' sortable align='center'>
          </el-table-column>
          <el-table-column prop='created' label='创建时间' sortable align='center'>
          </el-table-column>
          <el-table-column label='操作' width='250'>
            <template slot-scope='scope'>
              <el-tooltip class='item' effect='dark' content='编辑' placement='top' v-has="'product:category:update'">
                <el-button
                  size='mini'
                  type='primary' round
                  @click='editDialog(scope.$index,scope.row.id)'>
                  <svg-icon icon-class='edit'></svg-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip class='item' effect='dark' content='删除' placement='top' v-has="'product:category:delete'">
                <el-button
                  size='mini'
                  type='danger' round
                  @click="deleteHandler(scope.$index,scope.row.id)">
                  <svg-icon icon-class='delete'></svg-icon>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>-->
        <tree-table
          :data='categoryData'
          :columns='columns'
          :selection-type='false'
          :expand-type='false'
          show-index index-text='#' border>
          <template slot="icons" slot-scope="scope">
            <svg-icon :icon-class='scope.row.icon'></svg-icon>
          </template>
          <template slot="isok" slot-scope="scope">
            <i class="el-icon-success" v-if='scope.row.status' style='color: lightgreen'></i>
            <i class="el-icon-error" v-if='!scope.row.status' style='color: lightcoral'></i>
          </template>
          <template slot="level" slot-scope="scope">
            <el-tag v-if='scope.row.level===1'>一级</el-tag>
            <el-tag type="success" v-else-if='scope.row.level===2'>二级</el-tag>
            <el-tag type="warning" v-else-if='scope.row.level===3'>三级</el-tag>
          </template>
          <template slot="opt" slot-scope="scope">
            <el-tooltip class='item' effect='dark' content='编辑' placement='top' v-has="'product:category:update'">
              <el-button
                size='mini'
                type='primary' round
                @click='editDialog(scope.$index,scope.row.id)'>
                <svg-icon icon-class='edit'></svg-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='删除' placement='top' v-has="'product:category:delete'">
              <el-button
                size='mini'
                type='danger' round
                @click="deleteHandler(scope.$index,scope.row.id)">
                <svg-icon icon-class='delete'></svg-icon>
              </el-button>
            </el-tooltip>
          </template>
        </tree-table>
      </el-card>
      <Pagination :query-info='params' @query='initList'></Pagination>
      <category-details :is-edit='isEdit' :dialog-title='dialogTitle' :table-data='categoryData' :is-dialog='isDialog' :id='id'
                    @dislogDetails='handleDialog'></category-details>
    </div>
  </div>
</template>

<script>
import CategoryDetails from './components/CategoryDetails'
import Pagination from 'components/common/Pagination'
import { listByPage, update, deleteById } from 'api/category'
import { params } from 'utils/query'
export default {
  name: 'index',
  components:{
    CategoryDetails,
    Pagination
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
      dialogTitle: null,
      columns:[
        {
          label: '分类名称',
          headerAlign: 'center',
          align: 'center',
          prop: 'name'
        },
        {
          label: '分类图标',
          headerAlign: 'center',
          align: 'center',
          prop: 'icon',
          type: 'template',
          template: 'icons',
        },
        {
          label: '状态',
          headerAlign: 'center',
          align: 'center',
          prop: 'status',
          type: 'template',
          template: 'isok',
        },
        {
          label: '排序',
          headerAlign: 'center',
          align: 'center',
          prop: 'level',
          type: 'template',
          template: 'level',
        },
        {
          label: '操作',
          headerAlign: 'center',
          align: 'center',
          type: 'template',
          template: 'opt',
        }
      ]
    }
  },
  created() {
    this.initList()
  },
  methods: {
    initList(queryInfo) {
      listByPage(queryInfo).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.categoryData = res.data.list
        this.params.total = res.data.total
      }).catch(err => {
        this.$message.error(err)
      })
    },
    updateStatus(id, status) {
      update({ id: id, status: status }).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
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
      this.$confirm('确认要删除此商品类型', '删除提示', {
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
