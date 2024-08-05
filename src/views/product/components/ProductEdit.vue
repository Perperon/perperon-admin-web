<template>
  <div class='app-container'>
    <el-card>
      <el-alert
        title='修改商品信息' center show-icon type='info' :closable='false'>
      </el-alert>
      <el-steps :space='250' :active="active - 0" finish-status="success" align-center>
        <el-step title="基本信息" ></el-step>
        <el-step title="商品参数" ></el-step>
        <el-step title="商品属性" ></el-step>
        <el-step title="商品图片" ></el-step>
        <el-step title="商品内容" ></el-step>
        <el-step title="完成" ></el-step>
      </el-steps>
      <el-form :model='editForm' :rules='editFormRules' ref='editFormRef' label-position='top' label-width='100px'>
        <el-tabs v-model='active' tab-position="left" :before-leave='beforeTabLeave' @tab-click='handleTabClick'>
          <el-tab-pane label="基本信息" name='0'>
            <input type='hidden' v-model='editForm.userId'/>
            <input type='hidden' v-model='editForm.updatedBy'/>
            <input type='hidden' v-model='editForm.updated'/>
            <el-form-item label='商品名称' prop='name'>
              <el-input v-model='editForm.name' placeholder="请填写商品名称"></el-input>
            </el-form-item>
            <el-form-item label='商品类型:' prop='categoryId'>
              <el-cascader style='width: 100%' clearable
                           v-model='selectCategoryKey'
                           :options='categoryData'
                           :props='caderProps'
                           @change='handleChange'></el-cascader>
            </el-form-item>
            <el-form-item label='商品价格(元):' prop='price'>
              <el-input-number v-model='editForm.price' :min='0' :precision="2" :step="0.1" style='width: 100%'></el-input-number>
            </el-form-item>
            <el-form-item label='商品重量(克):' prop='weight'>
              <el-input-number v-model='editForm.weight' :min='0' :precision="2" :step="0.1" style='width: 100%'></el-input-number>
            </el-form-item>
            <el-form-item label='商品数量:' prop='number'>
              <el-input-number v-model='editForm.number' :min='0' :precision="1" style='width: 100%'></el-input-number>
            </el-form-item>
            <el-form-item label='是否有效:' prop='status'>
              <el-radio-group v-model="editForm.status">
                <el-radio :label="true">有效</el-radio>
                <el-radio :label="false">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class='putSubmit'>
              <el-button  type='primary' @click="downPut('1','0')">下一步</el-button>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name='1'>
            <el-form-item :label='item.name' v-for='item in dynamicData' :key='item.id'>
              <el-checkbox-group v-model="item.attrValue">
                <el-checkbox border :label='value' v-for='(value,index) in item.attrValue' :key='index'></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class='putSubmit'>
              <el-button  @click="downPut('0','1')">上一步</el-button>
              <el-button  type='primary' @click="downPut('2','1')">下一步</el-button>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name='2'>

            <el-form-item :label='item.name' v-for='item in staticData' :key='item.id'>
              <el-input v-model='item.attrValue'></el-input>
            </el-form-item>
            <el-form-item class='putSubmit'>
              <el-button  @click="downPut('1','2')">上一步</el-button>
              <el-button  type='primary' @click="downPut('3','2')">下一步</el-button>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name='3'>
            <local-upload @imageUrl='handleUpload' @removePath='handleRemove'></local-upload>
            <el-form-item class='putSubmit'>
              <el-button  @click="downPut('2','3')">上一步</el-button>
              <el-button  type='primary' @click="downPut('4','3')">下一步</el-button>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name='4'>
            <quill-editor v-model='editForm.content'></quill-editor>
            <el-form-item class='putSubmit'>
              <el-button  type='primary' @click="downPut('3','4')">上一步</el-button>
              <el-button  type='primary' @click="submit">添加商品</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import store from 'store'
import { listByPage } from 'api/category'
import { listByParamPage } from 'api/productParam'
import { formattedTime,isEntry} from 'utils/date'
import localUpload from 'components/common/Upload/localUpload'
import { update, getById } from 'api/product'

const defaultFrom = {
  name: '',
  price: 0,
  weight: 0,
  number: 0,
  categoryId: '',
  content: null,
  attachList: [],
  publicParamList:[],
  status: true,
  userId: ref(store.getters.userInfo.id),
  updatedBy: '',
  updated: null
}
export default {
  name: 'ProductEdit',
  components: {
    localUpload
  },
  data(){
    return {
      active: 0,
      editForm:Object.assign({},defaultFrom),
      editFormRules:{
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
        categoryId: [
          { required: true, message: '请选择商品类型', trigger: 'blur' }],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }],
        weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }],
        number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }]
      },
      selectCategoryKey: [],
      categoryData:[],
      caderProps: {
        value: 'id',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover'
      },
      dynamicData: [],
      staticData:[]
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    async getCategory(){
      const res = await listByPage();
      if (res.code !== 200) return this.$message.error(res.message);
      this.categoryData = this.filterChildren(res.data.list);
      const response = await getById(this.$route.query.id);
      this.editForm = { ...response.data, updatedBy: store.getters.userInfo.id, updatedTime: formattedTime() };
      if (!isEntry(this.editForm.categoryId)) {
        const { categoryId } = this.editForm;
        const categoryIds = [];

        this.categoryData.forEach(item => {
          item.children.forEach(child => {
            if (!isEntry(child.children)) {
              child.children.forEach(third => {
                if (third.id === categoryId) {
                  categoryIds.push(item.id, child.id, third.id);
                  return;
                }
              });
            }
          });
        });
        this.selectCategoryKey = categoryIds;
      }
    },
    handleChange() {
      //只能选择三级分类
      if (this.selectCategoryKey.length !== 3) {
        this.selectCategoryKey = []
        return
      }
      this.editForm.categoryId = this.selectCategoryKey[this.selectCategoryKey.length - 1]
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
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === '0') {
        let flag = true
        this.$refs.editFormRef.validate((valid) => {
          if (!valid) {
            this.$message.error('请输入所有必填项信息');
            flag = false
          }
        })
        return flag
      }
    },
    downPut(activeName, oldActiveName){
      this.beforeTabLeave(activeName, oldActiveName)
      this.active = activeName
      this.$nextTick(() => {
        // 在这里执行你希望在 DOM 更新后执行的代码\
        this.handleTabClick()
      })
    },
    async handleTabClick(){
      if (this.active === '1') {
        const data = await listByParamPage({typeCode:'dynamicParam', categoryId: this.editForm.categoryId})
        if (data.code !== 200) return this.$message.error(data.message);
        data.data.list.forEach(e => {
          e.attrValue = !isEntry(e.attrValue) ? e.attrValue.split(' ') : []
        })
        this.dynamicData = data.data.list
      }else if( this.active === '2'){
        const data = await listByParamPage({typeCode:'staticParam', categoryId: this.editForm.categoryId})
        if (data.code !== 200) return this.$message.error(data.message);
        this.staticData = data.data.list
      }
    },
    handleUpload(info){
      this.editForm.attachList.push(info)
    },
    handleRemove(filepath){
      const index = this.editForm.attachList.findIndex(x => x.attachPath === filepath)
      this.editForm.attachList.splice(index, 1)
    },
    submit(){
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return this.$message.error('请输入所有必填项信息');
        //处理商品参数
        this.dynamicData.forEach( item => {
          if (item.attrValue.length>0){
            const newInfo = {
              categoryParamId: item.id,
              attrValue: item.attrValue.join(' '),
            }
            this.editForm.publicParamList.push(newInfo)
          }
        })
        this.staticData.forEach( item => {
          const newInfo = {
            categoryParamId: item.id,
            attrValue: item.attrValue,
          }
          this.editForm.publicParamList.push(newInfo)
        })
        //保存商品信息到数据库
        update(this.editForm).then(res =>{
          if (res.code!==200) return this.$message.error(res.message);
          this.$message.success(res.message);
          this.$router.push('/product/list')
          this.$store.commit("REMOVE_TABS",'/product/add')
        })
      })
    }
  }
}
</script>

<style lang='less'>

.el-steps{
  margin: 20px 0;
}
.putSubmit{
  float: right;
  margin-top: 5px;
}
.el-checkbox{
  margin: 0 10px 0 25px !important;
  float: left;
}
</style>
