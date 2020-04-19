<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between" :style="height">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-image
          class="table-td-thumb"
          :src="require('../assets/Title.png')"
        ></el-image>
        <el-card class="box-card" style="margin-top: 50px">
          <div slot="header" class="clearfix">
            <span>登录</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="forget">忘记密码</el-button>
          </div>
          <el-form :model="loginRuleForm" :rules="loginRules" ref="loginRuleForm">
            <el-form-item label="用户名称" prop="username">
              <el-input v-model="loginRuleForm.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input type="password" v-model="loginRuleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="登录身份" prop="status">
              <el-radio-group v-model="loginRuleForm.status">
                <el-radio label="user">社区居民登录</el-radio>
                <el-radio label="admin">社区居民登录</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="space-around">
                <el-button type="primary" @click="submitForm('loginRuleForm')">登 录</el-button>
                <el-button type="danger" @click="resetForm('ruleForm')">重 置</el-button>
                <el-button type="warning">注 册</el-button>
              </el-row>

              <el-dialog title="找回密码" :visible.sync="forgetPasswordFormVisible" :close-on-click-modal="false">
                <el-form :model="forgetPasswordRuleForm" :rules="forgetPasswordRules" ref="forgetPasswordRuleForm">
                  <el-form-item label="注册手机号" :label-width="formLabelWidth">
                    <el-input v-model="forgetPasswordRuleForm.phone" autocomplete="off" style="height: 50px"></el-input>
                  </el-form-item>
                  <el-form-item label="注册邮箱" :label-width="formLabelWidth">
                    <el-input v-model="forgetPasswordRuleForm.email" autocomplete="off" style="height: 50px"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="forgetPasswordRuleForm.IDcard" autocomplete="off" style="height: 50px"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="forgetPasswordFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="forgetPassword">确 定</el-button>
                </div>
              </el-dialog>

              <el-dialog title="提示" :visible.sync="tipVisible" width="30%" :close-on-click-modal="false">
                <span>新的随机密码已通过邮件发送到您的邮箱<br>请使用该密码登录后重新修改密码</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="tipVisible = false">取 消</el-button>
                  <el-button type="primary" @click="tipVisible = false">确 定</el-button>
                </span>
              </el-dialog>

              <el-dialog title="业主注册" :visible.sync="registerFormVisible" :close-on-click-modal="false">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="姓名" prop="username">
                        <el-input v-model="ruleForm.username" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="手 机 号" prop="phonenumber">
                        <el-input v-model.number="ruleForm.phonenumber" maxLength="11" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="身份证号" prop="IDcard">
                        <el-input v-model="ruleForm.IDcard" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="邮 箱" prop="email">
                        <el-input v-model="ruleForm.email" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="ruleForm.sex">
                          <el-radio label="male" :disabled="true">男</el-radio>
                          <el-radio label="female" :disabled="true">女</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="年 龄" prop="age">
                        <el-input v-model="ruleForm.age" :disabled="true"><template slot="append">岁</template></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="密 码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="住所" prop="address">
                        <el-cascader :options="options" clearable></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="房产证号" prop="deedID">
                        <el-input v-model="ruleForm.deedID" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="房屋性质" prop="housekind">
                        <el-radio-group v-model="ruleForm.housekind">
                          <el-radio label="buy" >已购房屋</el-radio>
                          <el-radio label="rent">租赁房屋</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="到期日期" prop="overdueDate">
                        <el-date-picker v-model="overdueDate" type="month" placeholder="选择日期"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置表单</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>

            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        height:{height:''},
        loginFormVisible: true,
        loginFlag: false,
        forgetPasswordFormVisible: false,
        tipVisible: false,
        formLabelWidth: '100px',
        loginRuleForm: {
          username: '',
          password: '',
          status: '',
        },
        loginRules: {
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
        },
        forgetPasswordRuleForm: {
          phone: '',
          email: '',
          IDcard: '',
        },
        forgetPasswordRules:{
          phone: [
            { required: true, message: '请输入注册手机号', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入注册邮箱', trigger: 'blur' },
          ]
        },
        IDcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ]
      };
    },
    mounted() {
      this.getHeight();
    },
    methods: {
      getHeight(){
        this.height.height=window.innerHeight-16+'px';
      },
      forget(){
        this.loginFormVisible = false;
        this.forgetPasswordFormVisible = true;
      },
      forgetPassword(){
        this.forgetPasswordFormVisible = false;
        this.tipVisible = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.loginRuleForm.status == 'user'){
              this.$router.replace('/index/userIndex')
            }else {
              this.$router.replace('/index/adminIndex')
            }
            this.$message({
              message: '登录成功！',
              type: 'success',
              center: true
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        // const url="http://127.0.0.1:3002/login"
        // this.$axios.get(url).then(res=>{
        //   console.log(res)
        //   for(var i = 0; i < res.data.length; i++){
        //     if(res.data[i].username == this.ruleForm.username && res.data[i].password == this.ruleForm.password){
        //       console.log("正确");
        //       this.$message({
        //         message: '登录成功！',
        //         center: true,
        //         type: 'success'
        //       });
        //       this.loginFlag=true
        //       this.$router.push('/index/page1')//实现点击按钮的页面跳转
        //     }
        //   }
        //   if(this.loginFlag == false){
        //     this.$message.error({
        //       message: '登录失败！请检查账号密码！',
        //       center: true
        //     });
        //   }
        // },error => {
        //   console.log(error)
        // })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
