<template>
  <el-form :model='imgForm' ref='imgFormRef' label-width='150px'>
    <el-upload
      :headers='header'
      class="avatar-uploader"
      :action="uploadUrl"
      list-type="picture"
      :multiple="false"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="handleUploadSuccess"
      >
      <img  v-if='imageUrl' :src='imageUrl' class='avatar'/>
      <el-icon v-else class='avatar-uploader-icon'></el-icon>
    </el-upload>
    <el-button size="small" @click="onSubmit">确认更换</el-button>
  </el-form>
</template>

<script>

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
    this.imageUrl = process.env.BASE_API + this.imgForm.icon
  },
  data(){
    return{
      header: this.$store.getters.token,
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

    },
    beforeUpload(){

    },
    handleUploadSuccess(res){
      this.imageUrl = process.env.BASE_API + res.data.src
      this.imgForm.icon =  res.data.title
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 100px;
  }
</style>
