<template>
  <!--添加信息框-->
  <el-dialog
    title='设置用户角色'
    :visible.sync='dialogVisible'
    width='40%'
    :before-close='handleBeforeClose'
    @close='handleClose'>
    <!--内容区-->
    <el-form :model='roleForm' ref='roleFormRef' label-width='100px'>
      <el-checkbox-group v-model='roleForm.checkedRoles'>
         <el-checkbox v-for='role in roleForm.roleList' :id='role.id' :key='role.id' :label='role.id' name='checkedRoles'>{{role.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form>
    <!--底部区-->
    <span slot='footer' class='dialog-footer'>
      <el-button @click='handleClose'>取 消</el-button>
      <el-button type='primary' @click='handlerConfirm'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {listByPage,grantRole} from 'api/roles'
export default {
  name: 'RoleDialog',
  props:{
    id:{
      type: String,
      default: null
    },
    roleList:{
      type: Array,
      default: []
    },
    roleDialogVisible:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      dialogVisible: false,
      roleForm:{
        id: null,
        roleList: [],
        checkedRoles: []
      }
    }
  },
  created() {

  },
  methods:{
    initList(){
      listByPage().then(res =>{
        if (res.code !=200) return this.$message.error(res.message)
        this.roleForm.roleList = res.data.list
        this.roleForm.id = this.id
      })
    },
    handleBeforeClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    handleClose(){
      this.dialogVisible = false
      this.$emit('dislogDetails',this.dislogVisible)
    },
    handlerConfirm(){
      this.$refs.roleFormRef.validate((valid) => {
        if (!valid) return
        grantRole(JSON.stringify({accountId: this.roleForm.id,rolesIds:this.roleForm.checkedRoles})).then(res => {
            if (res.code !== 200) return this.$message.error(res.message)
            this.$message.success(res.message)
            this.handleClose()
        })
      })
    }
  },
  watch:{
    roleDialogVisible (val) {
        let id = this.id
         this.dialogVisible = val
        if (id != null){
          this.roleForm.checkedRoles=[]
          this.roleList.forEach(item =>{
            this.roleForm.checkedRoles.push(item.id)
          })
          this.initList()
        }
      }
  }
}
</script>

<style scoped>

</style>
