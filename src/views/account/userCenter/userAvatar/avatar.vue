<template>
  <el-form :model='imgForm' ref='imgFormRef' label-width='150px'>
    <el-upload
      :headers='header'
      class="avatar-uploader"
      :action="uploadUrl"
      list-type="picture"
      :multiple="false"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-success="handleUploadSuccess"
      >
      <img  v-if='imageUrl' :src='imageUrl' class='avatar'/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button size="small" @click="onSubmit">确认更换</el-button>
  </el-form>
</template>

<script>
import { update } from 'api/login'
export default {
  name: 'avatar',
  props:{
    id:{
       type: String,
       default: null
    },
    path: {
      type: String,
      default: null
    }
  },
  created() {
      this.imgForm.id = this.id
      this.imgForm.icon = this.path
    if (this.imgForm.icon){
      this.imageUrl = process.env.BASE_API + this.imgForm.icon
    }
  },
  data(){
    return{
      header: {
        Authorization: this.$store.getters.token
      },
      host: process.env.BASE_API,
      imgForm:{
        id: null,
        icon: null
      },
      imageUrl: null,
      uploadUrl: process.env.BASE_API + '/account/upload'
    }
  },
  methods:{
    onSubmit(){
      this.$refs.imgFormRef.validate((valid) => {
        if (valid) {
          update(this.imgForm).then((res) => {
            if (res.code != 200) return this.$message.error(res.msg)
            this.$message.success('更换头像成功')
          })
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleUploadSuccess(res){
      this.imageUrl = this.host + res.data.src
      this.imgForm.icon =  res.data.src
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
