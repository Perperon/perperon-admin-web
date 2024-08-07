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
      :model='editForm'
      :rules='editFormRules'
      ref='editFormRef'
      label-width='150px'>
      <el-form-item label='省市区/县:' prop='address'>
        <el-cascader style='width: 100%'
          v-model='editForm.address'
          :options='addressData'
          :props='addressProps'
          @change='handleChange'></el-cascader>
      </el-form-item>
      <el-form-item label='详细地址:' prop='area'>
        <el-input v-model='editForm.area'></el-input>
      </el-form-item>

    </el-form>
    <!--底部区-->
    <span slot='footer' class='dialog-footer'>
      <el-button @click='dialogClose'>取 消</el-button>
      <el-button type='primary' @click='onSubmit'>确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { update, getById } from 'api/order'
import { ref } from 'vue'
import store from 'store'
import loadLocationOptions from 'utils/cityData'

const defaultFrom = {
  address: [],
  area: '',
  userId: ref(store.getters.userInfo.id)
}
export default {
  name: 'OrderDetails',
  props: {
    isDialog: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    },
    dialogTitle: {
      type: String,
      default: '添加'
    }
  },
  data() {
    return {
      dialogVisible: false,
      editForm: Object.assign({}, defaultFrom),
      addressData: [],
      addressProps: {
        value: 'code',
        label: 'name',
        children: 'children',
        expandTrigger: 'hover'
      },
      editFormRules: {
        address: [
          { required: true, message: '请选择地址', trigger: 'blur' }],
        area: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }]
      }
    }
  },
  watch: {
    isDialog(val) {
      this.dialogVisible = val
      this.addressData=loadLocationOptions()
      getById(this.id).then(response => {
        this.editForm = response.data
      })
    }
  },
  methods: {
    handleBeforeClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dislogVisible = false
          this.$emit('dislogDetails', this.dislogVisible)
          done()
        })
    },
    addDialogClosed() {
      //关闭时重置表单
      this.$refs.editFormRef.resetFields()
    },
    onSubmit() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return
        update(this.editForm).then(res => {
          if (res.code !== 200) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.dialogVisible = false
          this.$emit('dislogDetails', this.dislogVisible)
        })
      })
    },
    dialogClose() {
      this.dislogVisible = false
      this.$emit('dislogDetails', this.dislogVisible)
    },
    handleChange() {
      console.log(this.editForm.address)
    }
  }
}
</script>

<style scoped>
.el-select {
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
