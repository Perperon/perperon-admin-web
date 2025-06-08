<template>
  <el-form :model="imgForm" ref="imgFormRef" label-width="150px">
    <el-upload
      class="avatar-uploader"
      :action="null"
      :show-file-list="false"
      :http-request="() => false"
      :before-upload="beforeAvatarUpload"
    >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-dialog
      title="裁剪头像"
      :visible.sync="dialogVisible"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <vue-cropper
        ref="cropper"
        :img="rawImage"
        :auto-crop="true"
        :auto-crop-width="200"
        :auto-crop-height="200"
        :fixed="true"
        :center-box="true"
        :info="true"
        style="width: 100%; height: 400px;"
      ></vue-cropper>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCrop">确定</el-button>
      </div>
    </el-dialog>

    <el-button size="small" @click="onSubmit">确认更换</el-button>
  </el-form>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { update,updateAvatar } from 'api/login'
import axios from 'axios'

export default {
  name: 'avatar',
  components: { VueCropper },
  props: {
    id: { type: String, default: null },
    path: { type: String, default: null }
  },
  data() {
    return {
      header: { Authorization: this.$store.getters.token },
      host: process.env.BASE_API || '',
      imgForm: { id: null, icon: null },
      imageUrl: null,
      dialogVisible: false,
      rawImage: null
    }
  },
  created() {
    this.imgForm.id = this.id
    this.imgForm.icon = this.path
    if (this.imgForm.icon) {
      this.imageUrl = this.host + this.imgForm.icon
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) this.$message.error('只能上传图片文件！')
      if (!isLt2M) this.$message.error('图片不能超过 2MB！')
      if (!isImage || !isLt2M) return false

      const reader = new FileReader()
      reader.onload = (e) => {
        console.log('读取图片base64:', e.target.result)
        this.rawImage = e.target.result
        this.dialogVisible = true
        this.$nextTick(() => {
          if (this.$refs.cropper) {
            this.$refs.cropper.refresh()
          }
        })
      }
      reader.readAsDataURL(file)

      return false
    },
    submitCrop() {
      // 获取裁剪后的blob并上传
      this.$refs.cropper.getCropBlob((blob) => {
        const formData = new FormData()
        formData.append('file', blob)

        updateAvatar(formData)
          .then((res) => {
            if (res.code === 200) {
              this.imageUrl = this.host + res.data.src
              this.imgForm.icon = res.data.src
              this.dialogVisible = false
              this.$message.success('上传成功')
            } else {
              this.$message.error(res.data.msg || '上传失败')
            }
          })
          .catch(() => {
            this.$message.error('上传出错')
          })
      })
    },
    onSubmit() {
      this.$refs.imgFormRef.validate((valid) => {
        if (valid) {
          update(this.imgForm).then((res) => {
            if (res.code !== 200) return this.$message.error(res.msg)
            this.$message.success('更换头像成功')
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
