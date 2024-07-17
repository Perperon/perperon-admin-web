<template>
  <div class='app-container'>
    <div class='table-container'>
      <el-row :gutter='20'>
        <el-col :span='16'>
          <el-button v-has="'category:param:add'" @click='addDialog' class='btnClass'>
            添加分类参数
          </el-button>
        </el-col>
      </el-row>

      <!--列表区-->
      <el-card>
        <el-alert
          title="注意:只允许为第三级分类设置相关参数!"
          type="warning" :closable='false' show-icon>
        </el-alert>
        <!--分类区-->
        <el-row class='el-ops'>
          <el-col class='el-col-lg-10'>
            <span>选择商品分类：</span>
            <el-cascader
              v-model="selectCategoryKey"
              :options="categoryParamsData"
              :props="caderProps"
              @change="handleChange"></el-cascader>
          </el-col>
        </el-row>
        <!--tab区-->
        <el-tabs type="border-card" v-model='activeName' @tab-click='handleClick'>
          <el-tab-pane label="动态参数" name="first"><el-button :disabled='isDisabled' type='primary' size='small'>动态参数</el-button></el-tab-pane>
          <el-tab-pane label="静态参数" name="second"><el-button :disabled='isDisabled' type='primary' size='small'>静态参数</el-button></el-tab-pane>
        </el-tabs>
      </el-card>
      <Pagination :query-info='params' @query='initList'></Pagination>
<!--      <category-details :is-edit='isEdit' :dialog-title='dialogTitle' :table-data='categoryParamsData' :is-dialog='isDialog' :id='id'-->
<!--                        @dislogDetails='handleDialog'></category-details>-->
    </div>
  </div>
</template>

<script>
import Pagination from 'components/common/Pagination'
import { listByPage, deleteById } from 'api/category'
import { params } from 'utils/query'
export default {
  name: 'index',
  components:{
    Pagination
  },
  data() {
    return {
      id: null,
      selectCategoryKey: [],
      categoryParamsData: [],
      multipleSelection: [],
      params: Object.assign({
        status: null,
      }, params),
      caderProps:{
        value: 'id',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover'
      },
      isEdit: false,
      isDialog: false,
      dialogTitle: null,
      activeName: 'first'
    }
  },
  created() {
    this.initList()
  },
  computed:{
    isDisabled(){
      return this.selectCategoryKey.length !== 3
    }
  },
  methods: {
    initList(queryInfo) {
      listByPage(queryInfo).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.categoryParamsData = this.filterChildren(res.data.list)
        this.params.total = res.data.total
      }).catch(err => {
        this.$message.error(err)
      })
    },
    addDialog() {
      this.isDialog = true;
      this.isEdit = false;
      this.dialogTitle = '添加分类参数'
    },
    editDialog(index, id) {
      this.isDialog = true;
      this.isEdit = true;
      this.id = id;
      this.dialogTitle = '修改分类参数'
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
    handleChange(){
       //只能选着三级分类
      if (this.selectCategoryKey.length !== 3) {
        this.selectCategoryKey = []
        return
      }
      console.log(this.selectCategoryKey)
    },
    filterChildren(arr) {
      return arr.map(item => {
        if (item.children && item.children.length > 0) {
          item.children = this.filterChildren(item.children);
        } else {
          delete item.children;
        }
        return item;
      }).filter(item => item.name);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang='less' scoped>
.el-ops{
  margin-top: 5px;
}
.el-col-lg-10 {
  width: 20.66667%;
  margin-bottom: 6px;
}
</style>
