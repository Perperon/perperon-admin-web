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
      <el-form-item label='字典类型名称:' prop='name'>
        <el-input v-model='addForm.name'></el-input>
      </el-form-item>
      <el-form-item label='字典类型编号:' prop='code'>
        <el-input v-model='addForm.code' ></el-input>
      </el-form-item>
      <el-form-item label='是否启用:' prop='status'>
        <el-radio-group v-model="addForm.status">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='备注:' prop='remark'>
        <el-input type="textarea" v-model='addForm.remark'></el-input>
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
import { update, create, getById } from 'api/dictionarytype'
import {ref} from 'vue'
import store from 'store'
import { formattedTime } from 'utils/date'
const defaultFrom = {
  name: '',
  code: '',
  remark:'',
  status: true,
  userId: ref(store.getters.userInfo.id)
}
export default {
  name: 'DictionaryTypeDetails',
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
      addFormRules: {
        name: [
          { required: true, message: '字典类型名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }],
        code: [
          { required: true, message: '字典编码', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 30 个字符', trigger: 'blur' }]
      }
    }
  },
  watch: {
    async isDialog(val) {
      if (this.isEdit) {
        try {
          const response = await getById(this.id);
          this.addForm = { ...response.data, updatedBy: store.getters.userInfo.id, updatedTime: formattedTime() };
        } catch (error) {
          this.$message.error('Error fetching data');
        }
      } else {
        this.addForm = { ...defaultFrom };
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
      this.addDialogClosed()
      this.dislogVisible = false
      this.$emit('dislogDetails',this.dislogVisible)
    }
  }
}
</script>

<style scoped>
</style>
