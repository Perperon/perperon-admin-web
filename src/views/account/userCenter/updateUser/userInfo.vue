<template>
  <el-form :model='editForm' :rules='editFormRules' ref='editFormRef' label-width='150px'>
    <el-form-item label='用户名:' prop='username'>
      <el-input v-model='editForm.username' :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label='昵称:' prop='nickName'>
      <el-input v-model='editForm.nickName' ></el-input>
    </el-form-item>
    <el-form-item label='邮箱:' prop='email'>
      <el-input v-model='editForm.email' ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {update} from 'api/login'
const defaultFrom = {
  username: '',
  nickName: '',
  status: true,
  email: ''
}
export default {
  name: 'userInfo',
  props:{
    userData:{
      type: Object,
      default: null
    }
  },
  created() {
    this.editForm = this.userData
  },
  data(){
    return{
      editForm: Object.assign({},defaultFrom),
      editFormRules: {
        nickName: [
          { required: true, message: '请输入你的昵称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods:{
    onSubmit() {
      this.$refs.editFormRef.validate((valid) => {
        if (valid){
          update(this.editForm).then(res => {
            if (res.code !== 200) return this.$message.error(res.message)
            this.$message.success(res.message)
            console.log(res)
          })
        }
      })
    },
    reset(){
      console.log(this.userData)
      this.editForm = this.userData
    }
  }
}
</script>

<style scoped>
.el-button{
  float: left;
}
</style>
