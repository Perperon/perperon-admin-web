<template>
  <el-form :model='pwdForm' :rules='pwdFormRules' ref='pwdFormRef' label-width='150px'>
    <el-form-item label='旧密码:' prop='oldPassword'>
      <el-input v-model='pwdForm.oldPassword' type='password'  placeholder='请输入旧密码' show-password></el-input>
    </el-form-item>
    <el-form-item label='新密码:' prop='newPassword'  >
      <el-input v-model='pwdForm.newPassword' type='password' placeholder='请输入新密码' show-password></el-input>
    </el-form-item>
    <el-form-item label='确认密码:' prop='password' >
      <el-input v-model='pwdForm.password' type='password' placeholder='请再次新密码' show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onPwd">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updatePwd } from 'api/login'
export default {
  name: 'userPwd',
  props:{
    userId:{
      type: String,
      default: null
    }
  },
  data(){
    const equalToPassword = (rule,value,callback) =>{
      if (this.pwdForm.newPassword != value){
        callback(new Error("两次输入的密码不一致！"))
      } else{
        callback()
      }
    }
    return{
      pwdForm: {
        id: null,
        oldPassword: null,
        newPassword: null,
        password: null
      },
      pwdFormRules:{
        oldPassword:[{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        newPassword:[
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur' }],
        password:[
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { required: true, validator: equalToPassword, trigger: 'blur' }]
      }

    }
  },
  created() {
    this.pwdForm.id = this.userId
  },
  methods:{
    onPwd(){
      this.$refs.pwdFormRef.validate((valid) => {
        if (valid){
          updatePwd(this.pwdForm).then(res => {
            if (res.code !== 200) return this.$message.error(res.message)
            this.$message.success(res.message)
            console.log(res)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

