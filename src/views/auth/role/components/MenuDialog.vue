<template>
  <!--添加信息框-->
  <el-dialog
    title='分配权限'
    :visible.sync='dialogVisible'
    width='40%'
    :before-close='handleBeforeClose'
    @close='handleClose'>
    <!--内容区-->
    <el-form :model='menuForm' ref='menuFormRef' label-width='100px'>
      <el-tree
        ref='treeRef'
        :data='treeData'
        :props='defaultProps'
        show-checkbox
        :default-expand-all='true'
        node-key='id'
        :check-strictly='true'>
      </el-tree>
    </el-form>
    <!--底部区-->
    <span slot='footer' class='dialog-footer'>
      <el-button @click='handleClose'>取 消</el-button>
      <el-button type='primary' @click='handlerConfirm'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeMenuList,menuRoleList,grantMenu } from 'api/menu'

export default {
  name: 'MenuDialog',
  props: {
    id: {
      type: String,
      default: null
    },
    menuDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      treeData: [],
      menuForm:{
        id: null
      },
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  methods: {
    initList() {
      treeMenuList().then(res => {
        if (res.code != 200) return this.$message.error(res.message)
        this.treeData = res.data
        this.menuForm.id = this.id
        menuRoleList(this.menuForm.id).then(msg =>{
          if (msg.code != 200) return this.$message.error(msg.message)
          console.log(msg)
          this.$refs.treeRef.setCheckedKeys(msg.data)
        })
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
    handleClose() {
      this.dialogVisible = false
      this.$emit('dislogDetails', this.dislogVisible)
    },
    handlerConfirm() {
      this.$refs.menuFormRef.validate((valid) => {
        if (!valid) return
        let menus = this.$refs.treeRef.getCheckedKeys()
        grantMenu(JSON.stringify({roleId: this.menuForm.id,menus: menus})).then(res =>{
          if (res.code !== 200) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.handleClose()
        })
      })
    }
  },
  watch: {
    menuDialogVisible(val) {
      let id = this.id
      this.dialogVisible = val
      if (id != null) {
        this.initList()
      }
    }
  }
}
</script>

<style scoped>

</style>
