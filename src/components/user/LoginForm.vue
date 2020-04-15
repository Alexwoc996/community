<template>
  <div>
    <h1>用户登录</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名称" prop="username">
        <el-col :span="6">
          <el-input v-model="ruleForm.username" clearable></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-col :span="6">
          <el-input type="password" v-model="ruleForm.password" show-password></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="登录身份" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="社区居民登录"></el-radio>
          <el-radio label="社区管理员登录"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
        <el-button @click="resetForm('ruleForm')">重 置</el-button>
        <el-button type="danger" @click="dialogFormVisible = true">忘记密码</el-button>

        <el-dialog title="找回密码" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
          <el-form :model="form">
            <el-form-item label="注册手机号" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off" style="height: 50px"></el-input>
            </el-form-item>
            <el-form-item label="注册邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off" style="height: 50px"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-input v-model="form.IDcard" autocomplete="off" style="height: 50px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="forgetPassword">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <span>新的随机密码已通过邮件发送到您的邮箱<br>请使用该密码登录后重新修改密码</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginFlag: false,
        dialogFormVisible: false,
        dialogVisible: false,
        formLabelWidth: '100px',
        ruleForm: {
          username: '',
          password: '',
          status: '',
        },
        form: {
          phone: '',
          email: '',
          IDcard: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入有效用户名', trigger: 'blur' },
            { min: 2, max: 15, message: '用户名长度在 2 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入有效密码', trigger: 'blur' },
            { min: 6, max: 6, message: '密码长度为6个字符', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择登录身份', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      forgetPassword(){
        this.dialogFormVisible = false;
        this.dialogVisible = true;
      },
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        const url="http://127.0.0.1:3002/login"
        this.$axios.get(url).then(res=>{
          console.log(res)
          for(var i = 0; i < res.data.length; i++){
            if(res.data[i].username == this.ruleForm.username && res.data[i].password == this.ruleForm.password){
              console.log("正确");
              this.$message({
                message: '登录成功！',
                center: true,
                type: 'success'
              });
              this.loginFlag=true
              this.$router.push('/index/page1')//实现点击按钮的页面跳转
            }
          }
          if(this.loginFlag == false){
            this.$message.error({
              message: '登录失败！请检查账号密码！',
              center: true
            });
          }
        },error => {
          console.log(error)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style scoped>

</style>
