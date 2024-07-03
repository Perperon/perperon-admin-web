<template>
  <!--添加信息框-->
  <el-dialog
    :title='dialogTitle'
    :visible.sync='dialogVisible'
    width='40%'
    :before-close='handleBeforeClose'
    @close='addDialogClosed'>
    <!--内容区-->
    <el-form
      :model='addForm'
      :rules='addFormRules'
      ref='addFormRef'
      label-width='150px'>

      <el-form-item label='上级菜单:' prop='parentId'>
        <el-select v-model='addForm.parentId' placeholder='请选择上级菜单' size='small' clearable>
          <template v-for='item in menuData'>
            <el-option :label='item.menuName' :value='item.id'></el-option>
              <template v-for='child in item.children'>
                 <el-option :label='child.menuName' :value='child.id'>
                   <span>{{"   -- "+child.menuName}}</span>
                 </el-option>
              </template>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label='菜单类型:' prop='menuType'>
        <el-radio-group v-model='addForm.menuType'>
          <el-radio label='N'>目录</el-radio>
          <el-radio label='C'>菜单</el-radio>
          <el-radio label='F'>按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='图标:' prop='icon'>
        <el-input v-model='addForm.icon'></el-input>
      </el-form-item>
      <el-form-item label='菜单名称:' prop='menuName'>
        <el-input v-model='addForm.menuName'></el-input>
      </el-form-item>
      <el-form-item label='权限标识:' prop='perms'>
        <el-input v-model='addForm.perms'></el-input>
      </el-form-item>
      <el-form-item label='组件路径:' prop='component'>
        <el-input v-model='addForm.component'></el-input>
      </el-form-item>
      <el-form-item label='路由路径:' prop='path'>
        <el-input v-model='addForm.path'></el-input>
      </el-form-item>
      <el-form-item label='显示菜单等级:' prop='level'>
        <el-input-number v-model='addForm.level' :min='1'></el-input-number>
      </el-form-item>
      <el-form-item label='显示排序:' prop='sort'>
        <el-input-number v-model='addForm.sort' :min='1'></el-input-number>
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
      <el-button @click='dialogBut'>取 消</el-button>
      <el-button type='primary' @click='onSubmit'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { update, create, getById } from 'api/menu'

const defaultFrom = {
  parentId: '',
  menuType: '',
  icon: '',
  menuName: '',
  perms: '',
  component: '',
  path: '',
  level: '',
  sort: '',
  status: true
}
export default {
  name: 'MenuDetails',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isDialog:{
      type: Boolean,
      default: false
    },
    id:{
      type: String,
      default: null,
    },
    dialogTitle:{
      type: String,
      default: '添加',
    },
    tableData:{
      type: Array,
      default: [],
    }
  },
  data () {
    return {
      dialogVisible: false,
      menuData:[],
      addForm: Object.assign({},defaultFrom),
      addFormRules: {
        menuName: [
          { required: true, message: '请输入菜单名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }],
        menuType: [
          { required: true, message: '请选择菜单类型'}]
      }
    }
  },
  watch: {
    isDialog(val) {
      this.dialogVisible = val
      this.menuData = this.tableData
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
    dialogBut(){
      this.dislogVisible = false
      this.$emit('dislogDetails',this.dislogVisible)
    }
  }
}
</script>

<style scoped>
.el-select{
display: flex;
}
.el-radio-group {
  margin-right: 316px;
}

.el-input-number {
  position: relative;
  display: inline-block;
  width: 191px;
  right: 179px;
  line-height: 38px;
}
</style>
