<template>
  <div>
    <h1>这是页面2，内容的显示与隐藏</h1>
    <el-button type="danger" v-text="btnText" @click="showToggle"></el-button>
    <div v-show="isShow">要显示与隐藏的内容块</div>

    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
      <el-form-item prop="email" label="邮箱" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
        <el-input v-model="dynamicValidateForm.email" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'域名' + index" :key="domain.key"
        :prop="'domains.' + index + '.value'" :rules="{ required: true, message: '域名不能为空', trigger: 'blur' }">
        <el-input v-model="domain.value" style="width: 300px"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增域名</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  export default {
    name: "PageTwo",
    data () {
      return {
        isShow: true,
        btnText: "隐藏",
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        }

      }
    },
    methods:{
      showToggle(){
        this.isShow = !this.isShow
        if(this.isShow){
          this.btnText = "隐藏"
        }else{
          this.btnText = "显示"
        }
      },
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
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
  };
</script>

<style scoped>

</style>
