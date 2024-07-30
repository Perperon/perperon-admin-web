<template>
  <div>
    <el-upload
      :headers="header"
      :action="uploadUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      list-type="picture"
      :on-success="handleUploadSuccess">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog
      title="商品展示"
      :visible.sync="dialogVisible"
      width="30%">
      <img width="100%" :src="previewImage" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'localUpload',
  data(){
    return{
      header: {
        Authorization: this.$store.getters.token
      },
      host: process.env.BASE_API,
      uploadUrl: process.env.BASE_API + '/minio/upload',
      previewImage: null,
      dialogVisible: false
    }
  },
  methods:{
    handleRemove(file) {
      const filePath = file.response.data.src
      this.$emit('removePath',filePath)
    },
    handlePreview(file) {
      console.log(file);
      this.previewImage = this.host+file.response.data.src
      this.dialogVisible = true
    },
    handleUploadSuccess(res){
      const info = {attachPath: res.data.src}
      this.$emit('imageUrl',info)
    }
  }
}
</script>

<style scoped>

</style>
