<template>
  <el-upload
    :headers="header"
    :action="uploadUrl"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    list-type="picture"
    :on-success="handleUploadSuccess">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
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
      fileList:[]
    }
  },
  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleUploadSuccess(res){
      this.$emit('imageUrl',res.data.src)
    }
  }
}
</script>

<style scoped>

</style>
