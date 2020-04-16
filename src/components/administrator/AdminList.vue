<template>
  <div>
    <h1>管理员信息列表</h1>
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
        <el-table-column label="手机号" prop="phone"></el-table-column>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入管理员姓名搜索"/>
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
      }
    },
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
