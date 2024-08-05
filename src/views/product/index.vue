<template>
  <div class="app-container">
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
          @click="searchProductList()"
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
    <!--列表区-->
    <div class='table-container'>
      <el-row :gutter='20'>
        <el-col :span="16">
          <el-button class="btnClass" @click="addProduct()">
            添加
          </el-button>
        </el-col>
        <el-col class='search' :span='4'>
          <el-input placeholder='请输入商品名称搜索' @keyup.enter.native='searchProductList' v-model="params.name" clearable @clear="searchProductList">
            <el-button @click="searchProductList" slot='append' icon='el-icon-search'></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-card>
        <el-table
          ref="multipleTable"
          :data='productData'
          border
          stripe
          style='width: 100%'
          @selection-change='handleSelectionChange'
          :default-sort="{prop: 'created', order: 'descending'}">
          <el-table-column type='selection' width='55'>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" align='center'>
          </el-table-column>
          <el-table-column prop="price" label="商品价格" align='center'>
            <template v-slot='scope'>
              <span>{{scope.row.price}}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="weight" label="商品重量" align='center'>
            <template v-slot='scope'>
              <span>{{scope.row.weight}}克</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="商品状态" align='center'>
            <template slot-scope='scope'>
              <el-button v-if='scope.row.status' type="success" icon="el-icon-check" size='mini' circle @click='updateStatus(scope.row.id,scope.row.status)'></el-button>
              <el-button v-else type="danger" icon="el-icon-circle-close" size='mini' circle @click='updateStatus(scope.row.id,scope.row.status)'></el-button>
            </template>
          </el-table-column>
          <el-table-column prop='created' label='创建时间' sortable align='center'>
          </el-table-column>
          <el-table-column width="200px" label="操作">
            <template slot-scope='scope'>
              <el-tooltip class='item' effect='dark' content='编辑' placement='top' v-has="'product:update'">
                <el-button
                  size='mini'
                  type='primary' round
                  @click='editProduct(scope.$index,scope.row.id)'>
                  <svg-icon icon-class='edit'></svg-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip class='item' effect='dark' content='删除' placement='top' v-has="'product:delete'">
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
    </div>
    <Pagination :query-info='params' @query='initList'></Pagination>
  </div>
</template>

<script>
import Pagination from 'components/common/Pagination'
import { params,resetParams } from 'utils/query'
import { listByPage,deleteById,update } from 'api/product'
export default {
  name: "product",
  data(){
    return{
      multipleSelection: [],
      productData: [],
      params: Object.assign({},params),
      id: null,
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
  components:{
    Pagination
  },
  methods:{
    initList(queryInfo) {
      listByPage(queryInfo).then(res => {
        if (res.code != 200) return this.$message.error("获取数据失败")
        this.productData = res.data.list
        this.params.total = res.data.total
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    searchProductList(){
      this.initList(this.params)
    },
    handleResetSearch() {
      this.params = Object.assign({}, resetParams);
    },
    updateStatus(id, status) {
      update({id: id, status: !status}).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.initList(this.params);
      })
    },
    deleteHandler(index,id){
      this.$confirm('确认要删除此商品', '删除提示', {
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
    },
    addProduct(){
      this.$store.commit("SET_TAB", { menuName: '添加商品', path: '/product/add' })
      this.$router.push('/product/add')
    },
    editProduct(index,id){
      this.$store.commit("SET_TAB", { menuName: '修改商品', path: '/product/edit' })
      this.$router.push({path:'/product/edit',query:{id:id}})
    }
  }
}
</script>

<style scoped lang="less">

</style>
