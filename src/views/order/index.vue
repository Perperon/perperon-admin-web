<template>
  <div class='app-container'>
    <!--卡片视图-搜索区-->
    <el-card class='filter-container' shadow='never'>
      <div>
        <div style='float:left'>
          <i class='el-icon-search'></i>
          <span>筛选搜索</span>
        </div>
        <el-button
          style='float:right'
          type='primary'
          @click='searchOrderList()'
          size='small'>
          查询搜索
        </el-button>
        <el-button
          style='float:right;margin-right: 15px'
          @click='handleResetSearch()'
          size='small'>
          重置
        </el-button>
      </div>
      <div style='margin-top: 30px'>
        <el-form :inline='true' :model='params' size='small' label-width='80px'>
          <el-form-item label='状态：' class='select-form'>
            <el-select v-model='params.status' class='input-width' placeholder='全部' clearable>
              <el-option v-for='item in statusData'
                         :key='item.value'
                         :label='item.label'
                         :value='item.value'>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!--列表区-->
    <div class='table-container'>
      <el-row :gutter='20'>
        <el-col class='search' :span='4'>
          <el-input placeholder='请输入商品名称搜索' @keyup.enter.native='searchOrderList' v-model='params.name' clearable
                    @clear='searchOrderList'>
            <el-button @click='searchOrderList' slot='append' icon='el-icon-search'></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-card>
        <el-table
          ref='multipleTable'
          :data='orderData'
          border
          stripe
          style='width: 100%'
          @selection-change='handleSelectionChange'
          :default-sort="{prop: 'created', order: 'descending'}">
          <el-table-column type='selection' width='55'>
          </el-table-column>
          <el-table-column prop='orderNo' label='订单编号' align='center'>
          </el-table-column>
          <el-table-column prop='orderPrice' label='订单价格价格' align='center'>
            <template v-slot='scope'>
              <span>{{ scope.row.orderPrice }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop='status' label='是否付款' align='center'>
            <template slot-scope='scope'>
              <el-tag type='success' v-if='scope.row.status'>已付款</el-tag>
              <el-tag type='danger' v-else>未付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop='sendStatus' label='是否发货' align='center'>
            <template slot-scope='scope'>
              <el-tag type='success' v-if='scope.row.sendStatus'>已发货</el-tag>
              <el-tag type='danger' v-else>未发货</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop='created' label='下单时间' sortable align='center'>
          </el-table-column>
          <el-table-column width='200px' label='操作'>
            <template slot-scope='scope'>
              <el-tooltip class='item' effect='dark' content='编辑' placement='top' v-has="'order:update'">
                <el-button
                  size='mini'
                  type='primary' round
                  @click='editDialog(scope.$index,scope.row.id)'>
                  <svg-icon icon-class='edit'></svg-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip class='item' effect='dark' content='订单详情' placement='top' v-has="'order:details'">
                <el-button
                  size='mini'
                  type='success' round
                  @click='editDetails(scope.$index,scope.row.id)'>
                  <svg-icon icon-class='order_details'></svg-icon>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <order-details :dialog-title='dialogTitle' :is-dialog='isDialog' :id="id" @dislogDetails='handleDialog'></order-details>
    <order-timeline :dialog-title='title' :is-dialog='isDetails' @dislogDetails='handleDetails'></order-timeline>
    <Pagination :query-info='params' @query='initList'></Pagination>
  </div>
</template>

<script>
import Pagination from 'components/common/Pagination'
import { params, resetParams } from 'utils/query'
import { listByPage } from 'api/order'
import OrderDetails from './components/OrderDetails'
import OrderTimeline from './components/OrderTimeline'

export default {
  name: 'order',
  data() {
    return {
      multipleSelection: [],
      orderData: [],
      params: Object.assign({}, params),
      id: null,
      dialogTitle:'',
      title:'',
      isDialog:false,
      isDetails:false,
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
    Pagination,
    OrderDetails,
    OrderTimeline
  },
  methods: {
    initList(queryInfo) {
      listByPage(queryInfo).then(res => {
        if (res.code != 200) return this.$message.error('获取数据失败')
        this.orderData = res.data.list
        this.params.total = res.data.total
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    searchOrderList() {
      this.initList(this.params)
    },
    handleResetSearch() {
      this.params = Object.assign({}, resetParams)
    },
    editDialog(index, id) {
      this.isDialog = true;
      this.id = id;
      this.dialogTitle = '修改订单'
    },
    handleDialog(flag) {
      this.isDialog = flag;
      this.isEdit = flag;
      this.initList(this.params)
    },
    editDetails(index, id) {
      this.isDetails = true;
      this.title = '物流进度'
    },
    handleDetails(flag) {
      this.isDetails = flag;
      this.initList(this.params)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
