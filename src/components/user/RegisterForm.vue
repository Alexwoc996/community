<template>
    <div>
      <h1>用户注册</h1>
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
            <el-form-item label="密码" prop="pass">
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
              <el-row>
                <el-col span="12">
                  <el-input v-model="ruleForm.address1">
                    <template slot="append">号楼</template>
                  </el-input>
                </el-col>
                <el-col span="12">
                  <el-input placeholder="" v-model="ruleForm.address2">
                    <template slot="append">室</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="房产证号" prop="deedID">
              <el-input v-model="ruleForm.deedID" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="房屋性质" prop="housekind">
            <el-radio-group v-model="ruleForm.housekind">
              <el-radio label="buy">已购房屋</el-radio>
              <el-radio label="rent">租赁房屋</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item v-model="radioTreaty" label="车库" prop="garage" @change="garageChange">
              <el-radio-group v-model="ruleForm.garage">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="车库号" prop="garageID" v-show="garageIDStatus">
              <el-input v-model="ruleForm.garageID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置表单</el-button>
        </el-form-item>
      </el-form>
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
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('请输入邮箱'))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'))
          }
        }, 100)
      };
      var checkIDcard = (rule, value, callback) => {
        if (!value) {
          return new Error("请输入身份证号)");
        } else {
          var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/;
          var card = reg.test(value);
          if (!card) {
            //判断座机为12位
            callback(new Error("请检查身份证格式"));
          } else {
            callback();
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
        radioTreaty:'1',
        garageIDStatus:true,
        ruleForm: {
          username: '',//用户名
          phonenumber:'',//手机号
          email: '',//邮箱
          IDcard: '',//身份证号
          pass: '',//密码
          checkPass: '',//确认密码
          address1: '',//几号楼
          address2: '',//几几室
          deedID: '',//房产证号
          housekind: '',//房屋性质
          garage: '',//车库
          garageID: '',//车库号
        },
        rules: {
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
            { required: true, message: '请输入身份证号', trigger: 'blur' },
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
          address1: [
            { required: true, message: '请输入住所信息', trigger: 'blur' },
          ],
          address2: [
            { required: true, message: '请输入住所信息', trigger: 'blur' },
          ],
          deedID: [
            { required: true, message: '请输入房产证号', trigger: 'blur' },
          ],
          housekind: [
            { required: true, message: '请选择房屋性质', trigger: 'change' },
          ],
          garage: [
            { required: true, message: '请选择是否拥有车库', trigger: 'change' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      garageChange:function(val){
        let that = this
        that.garageIDStatus=(val==='have')?true:false;
      }
    }
  }
</script>

<style scoped>

</style>
