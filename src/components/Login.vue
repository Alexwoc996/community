<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between" :style="height">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-image
          class="table-td-thumb" :src="require('../assets/Title.png')"></el-image>
        <el-card class="box-card" style="margin-top: 50px">
          <div slot="header" class="clearfix">
            <span>登录</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="forgetPassword">忘记密码</el-button>
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
                <el-radio label="admin">社区管理员登录</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="space-around">
                <el-button type="primary" @click="submitLoginForm('loginRuleForm')">登 录</el-button>
                <el-button type="danger" @click="resetForm('loginRuleForm')">重 置</el-button>
                <el-button type="warning" @click="registerFormVisible = true">注 册</el-button>
              </el-row>

              <el-dialog title="找回密码" :visible.sync="forgetPasswordFormVisible" :close-on-click-modal="false">
                <el-form :model="forgetPasswordRuleForm" :rules="forgetPasswordRules" ref="forgetPasswordRuleForm">
                  <el-row>
                    <el-form-item label="注册手机号" :label-width="formLabelWidth" prop="registerPhone">
                      <el-input v-model="forgetPasswordRuleForm.registerPhone" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row style="margin-top: 20px">
                    <el-form-item label="注册邮箱" :label-width="formLabelWidth" prop="registerEmail">
                      <el-input v-model="forgetPasswordRuleForm.registerEmail" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row style="margin-top: 20px">
                    <el-form-item label="身份证号" :label-width="formLabelWidth" prop="registerIDcard">
                      <el-input v-model="forgetPasswordRuleForm.registerIDcard" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="forgetPasswordFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitForgetPasswordForm(forgetPasswordRuleForm)">确 定</el-button>
                </div>
              </el-dialog>

              <el-dialog title="业主注册" :visible.sync="registerFormVisible" :close-on-click-modal="false">
                <el-form :model="registerRuleForm" :rules="registerRules" ref="registerRuleForm" label-width="100px" class="demo-ruleForm">
                  <el-row>
                    <el-col span="12">
                      <el-form-item label="姓名" prop="username">
                        <el-input v-model="registerRuleForm.username" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item label="手 机 号" prop="phonenumber">
                        <el-input v-model.number="registerRuleForm.phonenumber" maxLength="11" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 20px">
                    <el-col span="12">
                      <el-form-item label="身份证号" prop="IDcard">
                        <el-input v-model="registerRuleForm.IDcard" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item label="邮 箱" prop="email">
                        <el-input v-model="registerRuleForm.email" clearable></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 20px">
                    <el-col span="12">
                      <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="registerRuleForm.sex">
                          <el-radio label="male" :disabled="true">男</el-radio>
                          <el-radio label="female" :disabled="true">女</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item label="年 龄" prop="age">
                        <el-input v-model="registerRuleForm.age" :disabled="true"><template slot="append">岁</template></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 20px">
                    <el-col span="12">
                      <el-form-item label="密 码" prop="pass">
                        <el-input type="password" v-model="registerRuleForm.pass" autocomplete="off" show-password></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="registerRuleForm.checkPass" autocomplete="off" show-password></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top: 20px">
                    <el-col span="12">
                      <el-form-item label="住所" prop="address">
                        <el-cascader :options="options" v-model="registerRuleForm.address" clearable></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col span="12">
                      <el-form-item label="房产证号" prop="deedID">
                        <el-input v-model="registerRuleForm.deedID" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-row type="flex" justify="space-around" style="margin-top: 20px">
                  <el-button type="primary" @click="submitRegisterForm('registerRuleForm')">立即注册</el-button>
                  <el-button @click="resetForm('registerRuleForm')">重置表单</el-button>
                </el-row>
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
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号格式'));
          }
        }
      };
      // var checkEmail = (rule, value, callback) => {
      //   const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      //   if (!value) {
      //     return callback(new Error('请输入邮箱'))
      //   }
      //   setTimeout(() => {
      //     if (mailReg.test(value)) {
      //       callback()
      //     } else {
      //       callback(new Error('请输入正确的邮箱格式'))
      //     }
      //   }, 100)
      // };
      var checkIDcard = (rule, value, callback) => {
        if (!value) {
          return new Error("请输入身份证号)");
        } else {
          var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/;
          var card = reg.test(value);
          if (!card) {
            callback(new Error("请检查身份证格式，性别与年龄将自动填写"));
          } else {
            callback();
            if(value.substring(16,17) % 2 == 0){
              this.registerRuleForm.sex = 'female'
            }else {
              this.registerRuleForm.sex = 'male'
            }
            let myDate = new Date();
            this.registerRuleForm.age = myDate.getFullYear() - value.substring(6,10) -1;
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userScore:'',
        options: [{
          value: 'A1',
          label: 'A1号楼',
          children: [{value: 'A1101', label: '101室'},{value: 'A1102', label: '102室'},{value: 'A1103', label: '103室'},]
        },{
          value: 'A2',
          label: 'A2号楼',
          children: [{value: 'A2101', label: '101室'},{value: 'A2102', label: '102室'},{value: 'A2103', label: '103室'},]
        },{
          value: 'A3',
          label: 'A3号楼',
          children: [{value: 'A3101', label: '101室'},{value: 'A3102', label: '102室'},{value: 'A3103', label: '103室'},]
        }],
        registerRuleForm: {
          username: '',//用户名
          phonenumber:'',//手机号
          email: '',//邮箱
          IDcard: '',//身份证号
          sex: '',//性别
          age: '',//年龄
          pass: '',//密码
          checkPass: '',//确认密码
          address: '',//住所
          deedID: '',//房产证号
        },
        registerRules: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '用户名称长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          phonenumber: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
            // { validator: checkEmail, trigger: 'blur' }
          ],
          IDcard: [
            { required: true, message: '请输入身份证号，性别与年龄将自动填写', trigger: 'blur' },
            { validator: checkIDcard, trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请选择住所信息', trigger: 'change' },
          ],
          deedID: [
            { required: true, message: '请输入房产证号', trigger: 'blur' },
          ],

        },
        height:{height:''},
        forgetPasswordFormVisible: false,
        registerFormVisible: false,
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
          registerPhone: '',
          registerEmail: '',
          registerIDcard: '',
        },
        forgetPasswordRules:{
          registerPhone: [
            { required: true, message: '请输入注册手机号', trigger: 'blur' }
          ],
          registerEmail: [
            { required: true, message: '请输入注册邮箱', trigger: 'blur' },
          ],
          registerIDcard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
          ]
        },
      };
    },
    mounted() {
      this.getHeight();
    },
    methods: {
      getHeight(){
        this.height.height=window.innerHeight-16+'px';
      },
      forgetPassword(){
        this.forgetPasswordFormVisible = true;
      },
      submitForgetPasswordForm(formName){
        this.forgetPasswordFormVisible = false;
        this.$notify({
          title: '提示',
          message: '新的随机密码已通过邮件发送到您的邮箱，请使用该密码登录后重新修改密码',
          duration: 0
        });
      },
      submitLoginForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.loginRuleForm.status == 'user'){
              this.$router.replace('/index/userIndex')
            }else {
              this.$router.replace('/index2/adminIndex')
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
      },
      submitRegisterForm(formName) {
        this.registerFormVisible = false,
        this.$notify({
          title: '提示',
          message: '注册成功！请等待管理员审核通过后再登录，请注意查收邮件通知！',
          duration: 0
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
