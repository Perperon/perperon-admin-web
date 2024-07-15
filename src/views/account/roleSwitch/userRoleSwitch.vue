<template>
<div>
  <el-dialog
    title="切换角色"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose">
    <!--内容区-->
    <el-form :model='roleForm' ref='roleFormRef' label-width='100px'>
      <div class='roleLab'>
        <label>当前角色: {{this.$store.getters.roleName}}</label>
      </div>
      <el-radio-group v-model="roleForm.radioRole">
        <el-radio @change='changeRadio(role.name)'  v-for='role in roleForm.roleList' :id='role.id' :key='role.id' :label='role.id' name='radioRole'>{{role.name}}</el-radio>
      </el-radio-group>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handlerConfirm">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import { getMenu } from 'api/login'
import {setRoleId} from 'utils/support'
export default {
  name: 'userRoleSwitch',
  props:{
    id:{
      type: String,
      default: null
    },
    roleId:{
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
        radioRole: null,
        roleName: null
      },
      details:{
        dislogFlag: true,
        roleId: null
      }
    }
  },
  methods:{
    handleClose(){
      this.dialogVisible = false
      this.details.dislogFlag = false
      this.details.roleId = this.roleForm.radioRole
      this.$emit('dislogDetails',this.details)
    },
    changeRadio(roleName){
      this.roleForm.roleName = roleName
    },
    handlerConfirm(){
      this.$refs.roleFormRef.validate((valid) => {
        if (!valid) return
        getMenu(this.roleForm.radioRole).then(res => {
          if (res.code !== 200) return this.$message.error(res.message)
          let menus = res.data.menus;
          let permissions = res.data.permissions;
          this.$store.commit('SET_MENUS', menus)
          this.$store.commit('SET_ROLE_NAME', this.roleForm.roleName)
          setRoleId(this.roleForm.radioRole)
          this.$store.dispatch('GenerateRoutes', { menus, permissions }).then(() => { // 生成可访问的路由表
            this.$router.addRoutes(this.$store.getters.addRouters); // 动态添加可访问路由表
          })
          this.$message.success('切换角色成功')
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
        this.roleForm.id = id
        this.roleForm.radioRole = this.roleId
        this.roleForm.roleList = this.roleList
      }
    }
  }
}
</script>

<style scoped>
.roleLab{
  float: left;
  margin-left: 45px;
  margin-bottom: 15px;
}
</style>
