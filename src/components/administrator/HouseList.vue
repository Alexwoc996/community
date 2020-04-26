<template>
  <div>
    <h1>楼栋信息管理</h1>
    <el-table ref="filterTable" :data="tableData" style="width: 100%;text-align: center" border>
      <el-table-column label="小区楼栋信息">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="tableData2.filter(data => !search || data.houseID.toLowerCase().includes(search.toLowerCase()))"
              stripe border style="width: 100%">
              <el-table-column label="该楼栋下房屋信息">
                <el-table-column label="房屋号" prop="houseID"></el-table-column>
                <el-table-column label="户型" prop="houseKind"></el-table-column>
                <el-table-column label="状态" prop="houseStatus"></el-table-column>
                <el-table-column label="户主" prop="name"></el-table-column>
                <el-table-column label="手机号" prop="phone"></el-table-column>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-input v-model="search" size="mini" placeholder="输入房屋号搜索"/>
                </template>
                <el-table-column label="身份证号" prop="IDcard" width="200%"></el-table-column>
              </el-table-column>
              <el-table-column>
                <template slot="header" slot-scope="scope">
                  <el-button size="mini" type="primary" @click="addAdminFormVisible = true">添加房屋信息</el-button>
                </template>
                <el-table-column label="操作">
                  <template slot-scope="scope2">
                    <el-button size="mini" type="primary" @click="handleEdit(scope2.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope2.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </template>
      </el-table-column>
        <el-table-column prop="houseID" label="楼号"></el-table-column>
        <el-table-column prop="position" label="位置"></el-table-column>
        <el-table-column prop="floors" label="层数"></el-table-column>
        <el-table-column prop="cells" label="房间数"></el-table-column>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary" @click="addAdminFormVisible = true">添加建筑信息</el-button>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope2">
            <el-button size="mini" type="primary" @click="handleEdit(scope2.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope2.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formLabelWidth:'40px',
        complaintInfoFormVisible:false,
        handleFormVisible: false,
        complaintContent: '',//投诉内容
        complaintKind:'',//投诉类型
        star: null,//评分
        feedbackContent: '',//反馈内容
        tableData: [{houseID: 'A1', position: '东南角', units: '1', floors: '10', cells: '20'},
                    {houseID: 'A2', position: '西南角', units: '2', floors: '10', cells: '20'},
                    {houseID: 'A3', position: '东北角', units: '1', floors: '10', cells: '20'},],
        tableData2: [{houseID: '101', houseKind: '三居室', houseStatus: '已出售', name: '张三', phone: '13499999999', IDcard: '837655299838776345'},
                    {houseID: '102', houseKind: '三居室', houseStatus: '已出售', name: '李四', phone: '13499999999', IDcard: '837655299838776345'},
                    {houseID: '103', houseKind: '三居室', houseStatus: '已出售', name: '王五', phone: '13499999999', IDcard: '837655299838776345'},],
        search: ''
      }
    },
    mounted() {
      // this.getData();
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        if(this.tableData[index].complaintStatus == '未处理'){
          this.handleFormVisible = true;
        }else {
          this.$message({
            message: '该报修已被管理员'+this.tableData[index].Handler+'处理！',
            center: true,
            type: 'warning'
          });
        }
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getData(){//使用axios发送请求获取数据
        this.$axios.get('http://127.0.0.1:3002/complaint').then(res=>{
          console.log(res)
          this.tableData = res.data;
          for(var i = 0; i < this.tableData.length; i++){
            this.labelList.push({text: this.tableData[i].tag, value: this.tableData[i].tag});
          }
          console.log(this.labelList)
        },error => {
          console.log(error)
        })
      },
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filter2Tag(value, row) {
        return row.complaintStatus === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
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
