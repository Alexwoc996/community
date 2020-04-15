<template>
  <div>
    <h1>用户个人信息界面</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col span="8">
          <el-form-item label="姓名" prop="username">
            <el-input v-model="ruleForm.username" :disabled="true" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="手 机 号" prop="phonenumber">
            <el-input v-model.number="ruleForm.phonenumber" maxLength="11" :disabled="modify" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item label="身份证号" prop="IDcard">
            <el-input v-model="ruleForm.IDcard" :disabled="true" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="邮 箱" prop="email">
            <el-input v-model.number="ruleForm.email" :disabled="modify" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item label="住所" prop="address">
            <el-row>
              <el-col span="12">
                <el-input v-model="ruleForm.address1" :disabled="true">
                  <template slot="append">号楼</template>
                </el-input>
              </el-col>
              <el-col span="12">
                <el-input placeholder="" v-model="ruleForm.address2" :disabled="true">
                  <template slot="append">室</template>
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="房屋性质" prop="housekind">
          <el-radio-group v-model="ruleForm.housekind">
            <el-radio label="buy" :disabled="modify">已购房屋</el-radio>
            <el-radio label="rent" :disabled="modify">租赁房屋</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item v-model="radioTreaty" label="车库" prop="garage">
            <el-radio-group v-model="ruleForm.garage" @change="garageChange">
              <el-radio label="1" :disabled="modify">有</el-radio>
              <el-radio label="2" :disabled="modify">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="车库号" prop="garageID" v-show="garageIDStatus">
            <el-input v-model="ruleForm.garageID" :disabled="modify"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="家庭成员">
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="relationship" label="与户主关系" width="120"></el-table-column>
            <el-table-column prop="age" label="年龄" width="120"></el-table-column>
            <el-table-column prop="sex" label="性别" width="120"></el-table-column>
            <el-table-column prop="IDcard" label="身份证号" width="200"></el-table-column>
          </el-table-column>
          <el-table-column v-if="!modify">
            <template slot="header" slot-scope="scope">
              <el-button size="mini" @click="addFamilyFormVisible=true">添加家庭成员</el-button>

              <el-dialog title="添加家庭成员" :visible.sync="addFamilyFormVisible" :close-on-click-modal="false">
                <el-form>
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.newFamilyName" autocomplete="off" style="height: 50px"></el-input>
                  </el-form-item>
                  <el-form-item label="与户主关系" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.newFamilyRelationship" autocomplete="off" style="height: 50px"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.newFamilyIDcard" autocomplete="off" style="height: 50px"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="addFamilyFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addFamilyFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>

            </template>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-row>

      <el-form-item>
        <el-button type="primary" v-show="modify" @click="modify=false">修改个人信息</el-button>
        <el-button type="success" v-show="modify" @click="changePasswordFormVisible=true">修改密码</el-button>
        <el-button type="primary" v-show="!modify" @click="submitForm('ruleForm')">确定</el-button>
        <el-button type="danger" v-show="!modify" @click="modify=true">取消</el-button>

        <el-dialog title="修改密码" :visible.sync="changePasswordFormVisible" :close-on-click-modal="false">
          <el-form>
            <el-form-item label="原密码" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.oldPassword" autocomplete="off" style="height: 50px"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.newPassword" autocomplete="off" style="height: 50px"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.confirmNewPassword" autocomplete="off" style="height: 50px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="changePasswordFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePasswordFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>

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
        tableData: [{name: '王大虎', relationship:'本人', age:'35', sex:'男', IDcard:'370522197402201872'},
                    {name: '王虎妻', relationship:'配偶', age:'33', sex:'女', IDcard:'370522197402201872'},
                    {name: '王小虎', relationship:'父子', age:'18', sex:'男', IDcard:'370522197402201872'}],
        userScore:'',
        radioTreaty:'1',
        garageIDStatus:true,
        modify:true,
        changePasswordFormVisible:false,
        addFamilyFormVisible:false,
        formLabelWidth:'100px',
        ruleForm: {
          username: '李立坤',//用户名
          phonenumber:'17863110517',//手机号
          email: 'liwenhao2098@gmail.com',//邮箱
          IDcard: '370522199803111872',//身份证号
          address1: 'A1',//几号楼
          address2: '301',//几几室
          housekind: 'buy',//房屋性质
          garage: '1',//车库
          garageID: '301',//车库号
          oldPassword:'',
          newPassword:'',
          confirmNewPassword:'',
          newFamilyName:'',
          newFamilyRelationship:'',
          newFamilyIDcard:'',
        },
        rules: {
          phonenumber: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
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
          housekind: [
            { required: true, message: '请选择房屋性质', trigger: 'change' },
          ],
          garage: [
            { required: true, message: '请选择是否拥有车库', trigger: 'change' },
          ],
          oldPassword: [
            { required: true, message: '请输入原密码', trigger: 'change' },
          ],
          newPassword: [
            { required: true, message: '请输入新密码密码', trigger: 'change' },
          ],
          confirmNewPassword: [
            { required: true, message: '请输入原密码', trigger: 'change' },
          ],
          newFamilyName: [
            { required: true, message: '请输入家庭成员姓名', trigger: 'change' },
          ],
          newFamilyRelationship: [
            { required: true, message: '请输入该家庭成员与户主关系', trigger: 'change' },
          ],
          newFamilyIDcard: [
            { required: true, message: '请输入家庭成员身份证号', trigger: 'change' },
          ],
        }
      };
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('修改成功！');
            this.modify = true;
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
