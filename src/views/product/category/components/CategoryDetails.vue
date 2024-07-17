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
      <el-form-item label='父级名称:'>
        <el-cascader
          v-model="cascaderKeys"
          :options="options"
          :props="cascaderProps"
          clearable
          :expand-trigger="'hover'"
          :check-strictly="true"
          @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label='分类名称:' prop='name'>
        <el-input v-model='addForm.name'></el-input>
      </el-form-item>
      <el-form-item label='分类图标:' prop='icon'>
        <el-input v-model='addForm.icon' ></el-input>
      </el-form-item>
      <el-form-item label='是否启用:' prop='status'>
        <el-radio-group v-model="addForm.status">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!--底部区-->
    <span slot='footer' class='dialog-footer'>
      <el-button @click='dialogVisibleBut'>取 消</el-button>
      <el-button type='primary' @click='onSubmit'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { update, create, getById,listByParentPage } from 'api/category'
import {ref} from 'vue'
import store from 'store'
import { formattedTime } from 'utils/date'
const defaultFrom = {
  pid: null,
  name: '',
  icon:'',
  status: true,
  level: 1,
  userId: ref(store.getters.userInfo.id)
}
export default {
  name: 'CategoryDetails',
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
      default: '添加',
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
      options:[],
      cascaderProps:{
        value: 'id',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true
      },
      cascaderKeys:[],
      addFormRules: {
        name: [
          { required: true, message: '分类名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }]
      }
    }
  },
  watch: {
    async isDialog(val) {
      if (this.isEdit) {
        try {
          const response = await getById(this.id);
          this.addForm = { ...response.data, updatedBy: store.getters.userInfo.id, updatedTime: formattedTime() };
          if (response.data.pid !== null) {
            const res = await getById(response.data.pid);
            if (res.data.pid !== null) {
              this.cascaderKeys.push(res.data.pid);
            }
            this.cascaderKeys.push(response.data.pid);
          }
        } catch (error) {
          console.error(error);
          this.$message.error('Error fetching data');
        }
      } else {
        this.addForm = { ...defaultFrom };
      }
      if (val) {
        try {
          const res = await listByParentPage();
          if (res.code !== 200) {
            return this.$message.error(res.message);
          }
          this.options = this.filterChildren(res.data.list)
        } catch (error) {
          console.error(error);
          this.$message.error('Error fetching data');
        }
      }
      this.dialogVisible = val;
    }
  },
  methods: {
    handleBeforeClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.addDialogClosed()
          this.dislogVisible = false
          this.$emit('dislogDetails',this.dislogVisible)
          done()
        })
    },
    addDialogClosed(){
      //关闭时重置表单
      this.$refs.addFormRef.resetFields()
      this.cascaderKeys = []
      this.addForm.pid = null
      this.addForm.level = 1
    },
    onSubmit(){
      this.$refs.addFormRef.validate((valid) => {
        if (!valid)  return
        console.log(this.addForm)
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
    dialogVisibleBut(){
      this.addDialogClosed()
      this.dislogVisible = false
      this.$emit('dislogDetails',this.dislogVisible)
    },
    handleChange(){
      if (this.cascaderKeys.length > 0) {
        this.addForm.pid = this.cascaderKeys[this.cascaderKeys.length - 1]
        this.addForm.level = this.cascaderKeys.length + 1
      }else{
        this.addForm.pid = null
        this.addForm.level = 0
      }
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
    }
  }
}
</script>

<style scoped>
.el-cascader{
  width: 100%;
}

</style>
