<template>
    <div>
      <h1>停车位管理</h1>
      <el-table ref="filterTable" :data="tableData" style="width: 100%;text-align: center" border>
        <el-table-column label="小区停车位信息">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="tableData2.filter(data => !search || data.houseID.toLowerCase().includes(search.toLowerCase()))"
                        stripe border style="width: 100%">
                <el-table-column label="历史租赁信息">
                  <el-table-column label="租赁时间" prop="rentTime" sortable></el-table-column>
                </el-table-column>
                <el-table-column>
                  <template slot="header" slot-scope="scope">
                    <el-date-picker v-model="paymentTime" type="month" placeholder="指定日期查询"></el-date-picker>
                    <el-button type="primary">查询</el-button>
                  </template>
                  <el-table-column label="租赁者" prop="renter"></el-table-column>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="parkID" label="停车位号" sortable></el-table-column>
          <el-table-column prop="parkStatus" label="停车位状态"></el-table-column>
          <el-table-column prop="renter" label="使用者"></el-table-column>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-button size="mini" type="primary" @click="addAdminFormVisible = true">添加停车位</el-button>
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
        data(){
          return{
            tableData: [{parkID: '101', parkStatus: '已出租', renter: '张三'},
              {parkID: '102', parkStatus: '已出租', renter: '李四'},
              {parkID: '103', parkStatus: '已出租', renter: '王五'},],
            tableData2: [{rentTime: '2020-04', renter: '张三'},
              {rentTime: '2020-03', renter: '李四'},
              {rentTime: '2020-02', renter: '王五'},
              {rentTime: '2020-01', renter: '赵六'}],
            search: ''
          }
        }
    }
</script>

<style scoped>

</style>
