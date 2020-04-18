<template>
  <div>
    <h1>注册用户信息列表</h1>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      stripe border height="500" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户姓名">
              <span>{{ props.row.name }}</span>
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
            <el-form-item label="住址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="房产证号">
              <span>{{ props.row.deedID }}</span>
            </el-form-item>
            <el-form-item label="注册日期">
              <span>{{ props.row.registerDate }}</span>
            </el-form-item>
            <el-form-item label="房屋性质">
              <span>{{ props.row.housekind }}</span>
            </el-form-item>
            <el-form-item label="有无车库">
              <span>{{ props.row.garage }}</span>
            </el-form-item>
            <el-form-item label="车库号">
              <span>{{ props.row.garageID }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" prop="name"></el-table-column>
      <el-table-column label="住址" prop="address"></el-table-column>
      <el-table-column label="身份证号" prop="IDcard"></el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入用户姓名搜索"/>
        </template>
        <template slot-scope="scope">
          <el-popconfirm title="确定通过该注册申请吗？" @onConfirm="handleEdit(scope.$index, scope.row)">
            <el-button size="mini" slot="reference">通过</el-button>
          </el-popconfirm>
          <el-button size="mini" type="danger" @click="verifyFormVisible=true">拒绝</el-button>
          <el-dialog title="审核未通过" :visible.sync="verifyFormVisible" :close-on-click-modal="false">
            <el-form>
              <el-form-item label="拒绝理由" :label-width="formLabelWidth">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="refuse"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="verifyFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleDelete(scope.$index, scope.row)">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        formLabelWidth: '100px',
        verifyFormVisible: false,
        refuse: '',
        tableData: [{
          name: '王大虎',
          address: 'A3号楼301室',
          IDcard: '873467868273648456',
          phone: '13500000000',
          email: '123456@qq.com',
          housekind: '买房',
          garage: '有',
          garageID: '301',
          registerDate: '2020-3-4',
          deedID: '23423423432'

        }, {
          name: '王五',
          address: 'A1号楼402室',
          IDcard: '873467868273648456',
          phone: '13500000000',
          email: '123456@qq.com',
          housekind: '买房',
          garage: '有',
          garageID: '301',
          registerDate: '2020-3-4',
          deedID: '4358347534'

        }, {

          name: '王小虎',
          address: 'A4号楼201室',
          IDcard: '873467868273648456',
          phone: '13500000000',
          email: '123456@qq.com',
          housekind: '买房',
          garage: '有',
          garageID: '301',
          registerDate: '2020-3-4',
          deedID: '345345324'

        }, {

          name: '王小花',
          address: 'B3号楼302室',
          IDcard: '873467868273648456',
          phone: '13500000000',
          email: '123456@qq.com',
          housekind: '买房',
          garage: '有',
          garageID: '301',
          registerDate: '2020-3-4',
          deedID: '3453253245'
        }],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.tableData.splice(index,1);
        this.$message({
          message: '已通过该注册申请，消息已发送至用户邮箱',
          type: 'success'
        });
      },
      handleDelete(index, row) {
        this.verifyFormVisible=false;
        console.log(index, row);
        this.tableData.splice(index,1);
        this.$message({
          message: '已拒绝该注册申请，消息已发送至用户邮箱',
          type: 'warning'
        });
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
