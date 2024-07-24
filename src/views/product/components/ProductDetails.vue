<template>
  <!--添加信息框-->
  <el-dialog
    :title='dialogTitle'
    :visible.sync='dialogVisible'
    width='40%'
    :before-close='handleBeforeClose'
    @close='addDialogClosed'>
    <!--内容区-->
    <el-form :model='addForm' :rules='addFormRules' ref='addFormRef' label-width='150px'>
      <input type='hidden' v-model='addForm.userId'/>
      <input type='hidden' v-model='addForm.updatedBy'/>
      <input type='hidden' v-model='addForm.updatedTime'/>
      <el-form-item label='商品名称:' prop='name'>
        <el-input v-model='addForm.name' placeholder="请填写商品名称"></el-input>
      </el-form-item>
      <el-form-item label='商品类型:' prop='categoryId'>
        <el-cascader style='width: 100%'
          v-model='selectCategoryKey'
          :options='categoryData'
          :props='caderProps'
          @change='handleChange'></el-cascader>
      </el-form-item>
      <el-form-item label='商品价格(元):' prop='price'>
        <el-input-number v-model='addForm.price' :min='0' :precision="2" :step="0.1" style='width: 100%'></el-input-number>
      </el-form-item>
      <el-form-item label='商品重量(克):' prop='weight'>
        <el-input-number v-model='addForm.weight' :min='0' :precision="2" :step="0.1" style='width: 100%'></el-input-number>
      </el-form-item>
      <el-form-item label='是否有效:' prop='status'>
        <el-radio-group v-model="addForm.status">
          <el-radio :label="true">有效</el-radio>
          <el-radio :label="false">无效</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!--底部区-->
    <span slot='footer' class='dialog-footer'>
      <el-button @click='dialogVisibleClose'>取 消</el-button>
      <el-button type='primary' @click='onSubmit'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { update, create, getById } from 'api/product'
import { listByPage } from 'api/category'
import {ref} from 'vue'
import store from 'store'
import { formattedTime, isEntry} from 'utils/date'
const defaultFrom = {
  name: '',
  price: 0,
  weight: 0,
  categoryId: '',
  status: true,
  userId: ref(store.getters.userInfo.id),
  updatedBy: '',
  updatedTime: null
}
export default {
  name: 'ProductDetails',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isDialog:{
      type: Boolean,
      default: false
    },
    dialogTitle:{
      type: String,
      default: null,
    },
    id:{
      type: String,
      default: null,
    }
  },
  data () {
    return {
      dialogVisible: false,
      addForm: Object.assign({},defaultFrom),
      selectCategoryKey: [],
      categoryData:[],
      caderProps: {
        value: 'id',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover'
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }],
        categoryId: [
          { required: true, message: '请选择商品类型', trigger: 'blur' }],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }],
        weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }]
      }
    }
  },
  watch: {
    async isDialog(val) {
      if (this.isEdit) {
        try {
          const response = await getById(this.id);
          this.addForm = response.data;
          this.addForm.updatedBy = store.getters.userInfo.id;
          this.addForm.updatedTime = formattedTime();
        } catch (error) {
          this.$message.error(error.message || 'An error occurred');
        }
      } else {
        this.addForm = Object.assign({},defaultFrom);
      }

      if (val) {
        try {
          const res = await listByPage();
          if (res.code !== 200) return this.$message.error(res.message);
          this.categoryData = this.filterChildren(res.data.list);

          if (!isEntry(this.addForm.categoryId)) {
            const { categoryId } = this.addForm;
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
        } catch (error) {
          this.$message.error(error.message || 'An error occurred');
        }
      }
      this.dialogVisible = val;
    }
  },
  methods: {
    handleBeforeClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dislogVisible = false
          this.$emit('dislogDetails',this.dislogVisible)
          done()
        })
    },
    addDialogClosed(){
      //关闭时重置表单
      this.$refs.addFormRef.resetFields()
      this.selectCategoryKey = []
    },
    onSubmit(){
      this.$refs.addFormRef.validate((valid) => {
        if (!valid)  return
        if (this.isEdit) {
          update(this.addForm).then(res => {
            if (res.code !== 200) return this.$message.error(res.message)
            this.$message.success(res.message)
            this.dialogVisible = false
            this.$emit('dislogDetails',this.dislogVisible)
          })
        }else{
          create(this.addForm).then(res => {
            if (res.code !== 200) return this.$message.error(res.message)
            this.$message.success(res.message)
            this.dialogVisible = false
            this.$emit('dislogDetails',this.dislogVisible)
          })
        }
      })
    },
    dialogVisibleClose(){
      this.dislogVisible = false
      this.$emit('dislogDetails',this.dislogVisible)
    },
    handleChange() {
      //只能选择三级分类
      if (this.selectCategoryKey.length !== 3) {
        this.selectCategoryKey = []
        return
      }
      this.addForm.categoryId = this.selectCategoryKey[this.selectCategoryKey.length - 1]
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
  }
}
</script>

<style scoped>

</style>
