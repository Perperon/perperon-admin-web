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
      <el-form-item label='用户名:' prop='username'>
        <el-input v-model='addForm.username' :disabled="isEdit"></el-input>
      </el-form-item>
      <el-form-item label='昵称:' prop='nickName'>
        <el-input v-model='addForm.nickName' ></el-input>
      </el-form-item>
      <el-form-item label='邮箱:' prop='email'>
        <el-input v-model='addForm.email' ></el-input>
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
import { update, create, getById } from 'api/login'

const defaultFrom = {
  username: '',
  nickName: '',
  status: true,
  email: ''
}
export default {
  name: 'LoginDetails',
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
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        nickName: [
          { required: true, message: '请输入你的昵称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]

      }
    }
  },
  watch: {
    isDialog(val) {
      this.dialogVisible = val
      if (this.isEdit){
        getById(this.id).then(response => {
          this.addForm = response.data
        })
      }else{
        this.addForm = Object.assign({},defaultFrom)
      }
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
    dialogVisibleBut(){
      this.dislogVisible = false
      this.$emit('dislogDetails',this.dislogVisible)
    }
  }
}
</script>

<style scoped>

</style>
