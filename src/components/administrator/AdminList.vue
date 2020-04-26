<template>
  <div>
    <h1>管理员信息列表</h1>
    <el-table
      :data="adminInfo"
      style="width: 100%">
      <el-table-column label="本人信息">
        <el-table-column label="工号" prop="adminID"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="身份证号" prop="IDcard" width="200%"></el-table-column>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary" @click="adminInfoEditFormVisible = true">编辑个人信息</el-button>
        </template>
        <el-table-column label="注册时间" prop="registerDate"></el-table-column>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑个人信息" :visible.sync="adminInfoEditFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col span="12">
            <el-form-item label="工号" prop="adminID">
              <el-input v-model="editForm.adminID" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="editForm.age" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="性别" prop="sex">
              <el-input v-model="editForm.sex" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="editForm.phone" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editForm.email" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="身份证号" prop="IDcard">
              <el-input v-model="editForm.IDcard" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row type="flex" justify="space-around" style="margin-top: 20px">
        <el-button type="primary" @click="adminInfoEditFormVisible = false">确 定</el-button>
        <el-button @click="adminInfoEditFormVisible = false">取 消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="添加管理员" :visible.sync="addAdminFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="身份证号" prop="IDcard">
              <el-input v-model="addForm.IDcard" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="addForm.age" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="性别" prop="sex">
              <el-input v-model="addForm.sex" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="addForm.phone" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row type="flex" justify="space-around" style="margin-top: 20px">
        <el-button type="primary" @click="addAdminFormVisible = false">确 定</el-button>
        <el-button @click="addAdminFormVisible = false">取 消</el-button>
      </el-row>
    </el-dialog>
    <br>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      stripe border height="500" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="管理员姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="工号">
              <span>{{ props.row.adminID }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ props.row.IDcard }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="注册日期">
              <span>{{ props.row.registerDate }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="管理员信息">
        <el-table-column label="工号" prop="adminID" sortable></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary" @click="addAdminFormVisible = true">添加管理员</el-button>
        </template>
        <el-table-column label="手机号" prop="phone"></el-table-column>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入管理员姓名搜索"/>
        </template>
        <el-table-column label="身份证号" prop="IDcard"></el-table-column>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        formLabelWidth:'100px',
        adminInfoEditFormVisible:false,
        addAdminFormVisible: false,
        editForm: {
          adminID: '',
          name: '',
          age: '',
          sex: '',
          IDcard: '',
          phone: '',
          email: '',
        },
        editRules: {

        },
        addForm: {
          name: '',
          age: '',
          sex: '',
          IDcard: '',
          phone: '',
          email: '',
        },
        adminInfo:[{
          adminID: '1001',
          name: '王大虎',
          age: '33',
          sex: '男',
          IDcard: '873467868273648456',
          phone: '13500000000',
          email: '123456@qq.com',
          registerDate: '2020-3-4',
        }],
        tableData: [{
          adminID: '1002',
          name: '王大虎',
          age: '33',
          sex: '男',
          IDcard: '873467868273648456',
          phone: '13500000000',
          email: '123456@qq.com',
          registerDate: '2020-3-4',

        }, {
          adminID: '1001',
          name: '王五',
          age: '22',
          sex: '男',
          IDcard: '873467868273648456',
          phone: '13500000000',
          email: '123456@qq.com',
          registerDate: '2020-3-4',

        }, {
          adminID: '1045',
          name: '王小虎',
          age: '44',
          sex: '男',
          IDcard: '873467868273648456',
          phone: '13500000000',
          email: '123456@qq.com',
          registerDate: '2020-3-4',


        }, {
          adminID: '1022',
          name: '王小花',
          age: '30',
          sex: '女',
          IDcard: '873467868273648456',
          phone: '13500000000',
          email: '123456@qq.com',
          registerDate: '2020-3-4',
        }],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      setEditFoem(){
        this.editForm.adminID = this.adminInfo[0].adminID;
        this.editForm.name = this.adminInfo[0].name;
        this.editForm.age = this.adminInfo[0].age;
        this.editForm.sex = this.adminInfo[0].sex;
        this.editForm.phone = this.adminInfo[0].phone;
        this.editForm.email = this.adminInfo[0].email;
        this.editForm.IDcard = this.adminInfo[0].IDcard;
      }
    },
    mounted() {
      this.setEditFoem();
    }
  }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
