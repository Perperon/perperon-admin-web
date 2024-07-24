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
          @click="searchDataList()"
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
        <el-col :span='16'>
          <el-button  @click='addDialog' class='btnClass' v-has="'dictionary:data:add'">
            添加
          </el-button>
          <el-popconfirm
            confirm-button-text='确认'
            cancel-button-text='返回'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除这些数据吗？"
            @confirm="deleteAll">
            <el-button slot="reference" :disabled='btnFlag' class='btnClass' v-has="'dictionary:data:delete'">删除</el-button>
          </el-popconfirm>
        </el-col>
        <el-col class='search' :span='4'>
          <el-input placeholder='请输入用户名搜索' @keyup.enter.native='searchDataList' v-model="params.name" clearable @clear="searchDataList">
            <el-button @click="searchDataList" slot='append' icon='el-icon-search'></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-card>
        <el-table
          ref="multipleTable"
          :data='typeData'
          border
          stripe
          style='width: 100%'
          @selection-change='handleSelectionChange'
          :default-sort="{prop: 'created', order: 'descending'}">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position='left' inline class='from-table'>
                <el-form-item label='字典名称'>
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label='类型名称'>
                  <span>{{ props.row.typeName }}</span>
                </el-form-item>
                <el-form-item label='code'>
                  <span>{{ props.row.code }}</span>
                </el-form-item>
                <el-form-item label='备注'>
                  <span>{{ props.row.remark }}</span>
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
          <el-table-column prop="name" label="字典名称" align='center'>
          </el-table-column>
          <el-table-column prop="code" label="编码" align='center'>
          </el-table-column>
          <el-table-column prop="typeName" label="类型名称" align='center'>
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
          <el-table-column width="200px" label="操作">
            <template slot-scope='scope'>
              <el-tooltip class='item' effect='dark' content='编辑' placement='top' v-has="'dictionary:data:update'">
                <el-button
                  size='mini'
                  type='primary' round
                  @click='editDialog(scope.$index,scope.row.id)'>
                  <svg-icon icon-class='edit'></svg-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip class='item' effect='dark' content='删除' placement='top' v-has="'dictionary:data:delete'">
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
    <dictionary-data-details :is-edit='isEdit' :dialog-title='dialogTitle' :is-dialog='isDialog' :id="id" @dislogDetails='handleDialog'></dictionary-data-details>
  </div>
</template>

<script>
import {listByPage, update, deleteById, deleteBatches} from 'api/dictionary'
import Pagination from 'components/common/Pagination'
import { params,resetParams } from 'utils/query'
import  DictionaryDataDetails  from 'views/dictionary/components/DictionaryDataDetails'
export default {
  name: "index",
  components: {
    Pagination,
    DictionaryDataDetails
  },
  data() {
    return {
      multipleSelection: [],
      typeData: [],
      params: Object.assign({},params),
      isEdit: false,
      isDialog: false,
      dialogTitle: null,
      id: null,
      btnFlag: true,
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
    this.initList(this.params)
  },
  methods: {
    initList(queryInfo) {
      listByPage(queryInfo).then(res => {
        if (res.code != 200) return this.$message.error("获取数据失败")
        this.typeData = res.data.list
        this.params.total = res.data.total
      })
    },
    searchDataList(){
      this.initList(this.params);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length>0){
        this.btnFlag = false
      }else {
        this.btnFlag = true
      }
    },
    handleResetSearch() {
      this.params = Object.assign({}, resetParams);
    },
    updateStatus(id, status) {
      update({id: id, status: status}).then(res => {
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message.success(res.message)
      })
    },
    addDialog() {
      this.isDialog = true;
      this.isEdit = false;
      this.dialogTitle = '添加字典类型'
    },
    editDialog(index, id) {
      this.isDialog = true;
      this.isEdit = true;
      this.id = id;
      this.dialogTitle = '修改字典类型'
    },
    handleDialog(flag) {
      this.isDialog = flag;
      this.isEdit = flag;
      this.initList(this.params)
    },
    deleteHandler(index, id) {
      this.$confirm('确认要删除此字典类型', '删除提示', {
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
    }
  }
}
</script>

<style lang='less' scoped>

</style>
