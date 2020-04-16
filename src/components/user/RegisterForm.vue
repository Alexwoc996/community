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
        <el-row>
          <el-col span="8">
            <el-form-item v-model="radioTreaty" label="车库" prop="garage">
              <el-radio-group v-model="ruleForm.garage">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="车库号" prop="garageID" v-show="ruleForm.garage == 1">
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
              this.ruleForm.sex = 'female'
            }else {
              this.ruleForm.sex = 'male'
            }
            let myDate = new Date();
            this.ruleForm.age = myDate.getFullYear() - value.substring(6,10) -1;
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
        overdueDate: '',
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
        ruleForm: {
          username: '',//用户名
          phonenumber:'',//手机号
          email: '',//邮箱
          IDcard: '',//身份证号
          sex: '',//性别
          age: '',//年龄
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
            alert('注册成功!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style scoped>

</style>
