<template>
  <div class='app-container'>
    <div class='table-container'>
      <!--列表区-->
      <el-card>
        <el-alert
          title='注意:只允许为第三级分类设置相关参数!'
          type='warning' :closable='false' show-icon>
        </el-alert>
        <!--分类区-->
        <el-row class='el-ops'>
          <el-col class='el-col-lg-10'>
            <span>选择商品分类：</span>
            <el-cascader
              v-model='selectCategoryKey'
              :options='categoryParamsData'
              :props='caderProps'
              @change='handleChange'></el-cascader>
          </el-col>
        </el-row>
        <!--tab区-->
        <el-tabs type='border-card' v-model='activeName' @tab-click='handleClick'>
          <el-tab-pane label='动态参数' name='dynamicParam'>
            <el-button style='float: left' :disabled='isDisabled' type='primary' size='small' @click='addDialog'>
              动态参数添加
            </el-button>
            <el-table
              ref='multipleTable'
              :data='specsList'
              border
              stripe
              style='width: 100%'
              :default-sort="{prop: 'created', order: 'descending'}">

              <el-table-column type='expand'>
                <template slot-scope='scope'>
                  <el-tag v-for='(item,index) in scope.row.attrValue' :key='index' closable
                          @close='handleClose(index,scope.row)'>{{ item }}
                  </el-tag>
                  <el-input
                    class='input-new-tag'
                    v-if='scope.row.inputVisible'
                    v-model='scope.row.inputValue'
                    ref='saveTagInput'
                    size='small'
                    @keyup.enter.native='handleInputConfirm(scope.row)'
                    @blur='handleInputConfirm(scope.row)'
                  >
                  </el-input>
                  <el-button v-else class='button-new-tag' size='small' @click='showInput(scope.row)'>+</el-button>
                </template>
              </el-table-column>
              <el-table-column prop='name' label='参数名称' align='center'>
              </el-table-column>
              <el-table-column label='操作' align='center'>
                <template slot-scope='scope'>
                  <el-tooltip class='item' effect='dark' content='编辑' placement='top' v-has="'category:param:update'">
                    <el-button
                      size='mini'
                      type='primary' round
                      @click='editDialog(scope.$index,scope.row.id)'>
                      <svg-icon icon-class='edit'></svg-icon>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class='item' effect='dark' content='删除' placement='top' v-has="'category:param:delete'">
                    <el-button
                      size='mini'
                      type='danger' round
                      @click='deleteHandler(scope.$index,scope.row.id)'>
                      <svg-icon icon-class='delete'></svg-icon>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label='静态属性' name='staticParam'>
            <el-button style='float: left' :disabled='isDisabled' type='primary' size='small' @click='addDialog'>
              静态参数添加
            </el-button>
            <el-table
              ref='multipleTable'
              :data='attrsList'
              border
              stripe
              style='width: 100%'
              :default-sort="{prop: 'created', order: 'descending'}">

              <el-table-column type='expand'>
                <template slot-scope='scope'>
                  <el-tag v-for='(item,index) in scope.row.attrValue' :key='index' closable
                          @close='handleClose(index,scope.row)'>{{ item }}
                  </el-tag>
                  <el-input
                    class='input-new-tag'
                    v-if='scope.row.inputVisible'
                    v-model='scope.row.inputValue'
                    ref='saveTagInput'
                    size='small'
                    @keyup.enter.native='handleInputConfirm(scope.row)'
                    @blur='handleInputConfirm(scope.row)'
                  >
                  </el-input>
                  <el-button v-else class='button-new-tag' size='small' @click='showInput(scope.row)'>+</el-button>
                </template>
              </el-table-column>
              <el-table-column prop='name' label='参数名称' align='center'>
              </el-table-column>
              <el-table-column label='操作' align='center'>
                <template slot-scope='scope'>
                  <el-tooltip class='item' effect='dark' content='编辑' placement='top' v-has="'category:param:update'">
                    <el-button
                      size='mini'
                      type='primary' round
                      @click='editDialog(scope.$index,scope.row.id)'>
                      <svg-icon icon-class='edit'></svg-icon>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class='item' effect='dark' content='删除' placement='top' v-has="'category:param:delete'">
                    <el-button
                      size='mini'
                      type='danger' round
                      @click='deleteHandler(scope.$index,scope.row.id)'>
                      <svg-icon icon-class='delete'></svg-icon>
                    </el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <Pagination :query-info='params' @query='getParams'></Pagination>
      <category-param-details
        :is-edit='isEdit'
        :dialog-title='dialogTitle'
        :table-data='categoryParamsData'
        :is-dialog='isDialog' :id='id'
        :categoryId='categoryId'
        :activeName='activeName'
        @dislogDetails='handleDialog'>
      </category-param-details>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/common/Pagination'
import CategoryParamDetails from './components/CategoryParamDetails'
import { listByPage } from 'api/category'
import { listByParamPage, deleteById, update } from 'api/categoryParam'
import { params } from 'utils/query'
import { isEntry } from 'utils/date'

export default {
  name: 'index',
  components: {
    Pagination,
    CategoryParamDetails
  },
  data() {
    return {
      id: null,
      selectCategoryKey: [],
      categoryParamsData: [],
      multipleSelection: [],
      params: Object.assign({}, params),
      caderProps: {
        value: 'id',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover'
      },
      isEdit: false,
      isDialog: false,
      dialogTitle: null,
      activeName: 'dynamicParam',
      specsList: [],
      attrsList: [],
      categoryId: null
    }
  },
  created() {
    this.initList()
  },
  computed: {
    isDisabled() {
      return this.selectCategoryKey.length !== 3
    }
  },
  methods: {
    initList() {
      listByPage().then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.categoryParamsData = this.filterChildren(res.data.list)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    addDialog() {
      this.isDialog = true
      this.isEdit = false
      this.categoryId = this.params.categoryId
      this.dialogTitle = this.activeName === 'dynamicParam' ? '添加动态分类参数' : '添加静态分类属性'
    },
    editDialog(index, id) {
      this.isDialog = true
      this.isEdit = true
      this.id = id
      this.dialogTitle = this.activeName === 'dynamicParam' ? '修改动态分类参数' : '修改静态分类属性'
    },
    handleDialog(flag) {
      this.isDialog = flag
      this.getParams()
    },
    deleteHandler(index, id) {
      this.$confirm('确认要删除该数据吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          this.getParams()
        })
      })
    },
    handleChange() {
      this.getParams()
    },
    async getParams() {
      //只能选择三级分类
      if (this.selectCategoryKey.length !== 3) {
        this.selectCategoryKey = []
        this.specsList = []
        this.attrsList = []
        return
      }
      //发起请求，获取数据
      this.params.typeCode = this.activeName
      this.params.categoryId = this.selectCategoryKey[this.selectCategoryKey.length - 1]
      const res = await listByParamPage(this.params)
      if (res.code !== 200) return this.$message.error(res.message)
      res.data.list.forEach(e => {
        e.attrValue = !isEntry(e.attrValue) ? e.attrValue.split(' ') : []
        e.inputVisible = false
        e.inputValue = ''
      })
      if (this.activeName === 'dynamicParam') {
        this.specsList = res.data.list
      } else {
        this.attrsList = res.data.list
      }
      this.params.total = res.data.total
    },
    filterChildren(arr) {
      return arr.map(item => {
        if (item.children && item.children.length > 0) {
          item.children = this.filterChildren(item.children)
        } else {
          delete item.children
        }
        return item
      }).filter(item => item.name)
    },
    handleClick() {
      this.getParams()
    },
    showInput(row) {
      row.inputVisible = true
      //$nextTick这个方法接受一个回调函数作为参数。在DOM更新周期之后，这个回调函数将被执行
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(row) {
      row.inputVisible = false
      if (isEntry(row.inputValue.trim())) {
        row.inputValue = ''
        return
      }
      row.attrValue.push(row.inputValue.trim())
      row.inputValue = ''
      this.updateAttrValue(row)
    },
    handleClose(index, row) {
      row.attrValue.splice(index, 1)
      this.updateAttrValue(row)
    },
    updateAttrValue(row) {
      //参数值-保存数据到后端
      update({ attrValue: row.attrValue.join(' '), id: row.id }).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.el-ops {
  margin-top: 5px;
}

.el-col-lg-10 {
  width: 20.66667%;
  margin-bottom: 6px;
}

.el-tag {
  margin: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
