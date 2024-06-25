<template>
  <div class='app-container'>
    <el-row :gutter='20'>
      <el-col :span='6'>
        <!--个人信息-->
        <el-card class='box-card'>
          <template v-slot:header>
            <div class='clearfix'>
              <span>个人信息</span>
            </div>
          </template>
          <div>
            <div class='text-center'>
              <avatar :id='userData.id' :path='userData.icon'/>
            </div>
            <ul class='list-group list-group-striped'>
              <li class='list-group-item'>
                <div class='pull-left'>
                  <svg-icon icon-class='user' />&nbsp;&nbsp;用户名
                </div>
                <div class='pull-right'>{{ userData.username }}</div>
              </li>
              <li class='list-group-item'>
                <div class='pull-left'>
                  <svg-icon icon-class='nickUser' />&nbsp;&nbsp;用户昵称
                </div>
                <div class='pull-right'>{{ userData.nickName }}</div>
              </li>
              <li class='list-group-item'>
                <div class='pull-left'>
                  <svg-icon icon-class='email' />&nbsp;&nbsp;电子邮箱
                </div>
                <div class='pull-right'>{{ userData.email }}</div>
              </li>
              <li class='list-group-item'>
                <div class='pull-left'>
                  <svg-icon icon-class='roles' />&nbsp;&nbsp;所属角色
                </div>
                <div class='pull-right'>{{ userData.roles }}</div>
              </li>
              <li class='list-group-item'>
                <div class='pull-left'>
                  <svg-icon icon-class='loginTime' />&nbsp;&nbsp;登录时间
                </div>
                <div class='pull-right'>{{ userData.loginTime }}</div>
              </li>
              <li class='list-group-item'>
                <div class='pull-left'>
                  <svg-icon icon-class='created' />&nbsp;&nbsp;创建时间
                </div>
                <div class='pull-right'>{{ userData.created }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span='18'>
        <!--修改信息-->
        <el-card class='box-card'>
          <template v-slot:header>
            <div class='clearfix'>
              <span>修改信息</span>
            </div>
          </template>
          <el-tabs v-model='info'>
            <el-tab-pane label='基本资料' name='user'>
              <user-info :user-data='userData'/>
            </el-tab-pane>
            <el-tab-pane label='修改密码' name='updatePwd'>
              <user-pwd :user-id='userData.id'/>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import avatar from './userAvatar/avatar'
import userInfo from './updateUser/userInfo'
import userPwd from './updatePwd/userPwd'
export default {
  name: 'index',
  components:{
    avatar,
    userInfo,
    userPwd
  },
  data() {
    return {
      userData: this.$store.getters.userInfo,
      info: 'user'
    }
  }
}
</script>

<style lang='scss' scoped>
.list-group-striped > .list-group-item {
  border-radius: 0;
  border-right: 0;
  border-left: 0;
  padding-left: 0;
  padding-right: 0;
}

.list-group-item {
  border-bottom: 1px solid #e7eaec;
  border-top: 1px solid #e7eaec;
  margin-bottom: -1px;
  padding: 11px 0;
  font-size: 13px;
}

.clearfix {
  padding: 0px 22px;
  font-size: 15px;
  float: left !important;
}

.pull-right {
  float: right !important;
}

.pull-left {
  float: left !important;
}

::v-deep .el-card__body {
  height: 230px;
}

::v-deep .box-card {
  height: 450px;
}
</style>
