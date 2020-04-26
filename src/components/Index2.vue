<template>
  <div>
    <el-container :style="height">

      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>管理员界面</template>
            <el-menu-item index="/index2/adminIndex">管理员首页</el-menu-item>
            <el-menu-item index="/index2/adminList">管理员列表</el-menu-item>
            <el-menu-item index="/index2/userList">用户列表</el-menu-item>
            <el-menu-item index="/index2/houseList">楼栋管理</el-menu-item>
            <el-menu-item index="/index2/parkManage">停车位管理</el-menu-item>
            <el-menu-item index="/index2/registerVerify">注册审核</el-menu-item>
            <el-menu-item index="/index2/costEntry">费用信息维护</el-menu-item>
            <el-menu-item index="/index2/complaintManage">投诉管理</el-menu-item>
            <el-menu-item index="/index2/repairManage">报修管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: center; font-size: 15px">
          <el-row type="flex"  justify="space-between">
            <el-col :span="4"><div></div></el-col>
            <el-col :span="8"><div style="text-align: center; font-size: 30px">XX小区物业管理系统</div></el-col>
            <el-col :span="6">
              <div style="text-align: right">
                <span>欢迎！管理员 王小虎</span>
                <el-dropdown>
                  <i class="el-icon-setting" style="margin-right: 15px"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="gotoAdminList">个人信息</el-dropdown-item>
                    <el-dropdown-item @click.native="gotoLogin">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        height:{height:''},
      }
    },
    mounted() {
      this.getHeight();
    },
    methods:{
      gotoLogin(){
        this.$router.replace('/')
      },
      gotoAdminList(){
        this.$router.replace('/index2/adminList')
      },
      getHeight(){
        this.height.height=window.innerHeight-16+'px';
      }
    },    created(){
      window.addEventListener('resize', this.getHeight);
      this.getHeight()
    },
    destroyed(){
      window.removeEventListener('resize', this.getHeight)
    },
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>
