<template>
  <div>
    <h1>用户缴费信息</h1>
    <el-table ref="filterTable" :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="日期" sortable column-key="date"
                       :filters="dateList" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="money" label="金额"></el-table-column>
      <el-table-column prop="amount" label="用量"></el-table-column>
      <el-table-column prop="paymentStatus" label="缴费状态"></el-table-column>
      <el-table-column prop="paymentTime" label="缴费日期"></el-table-column>
      <el-table-column prop="fine" label="滞纳金"></el-table-column>
      <el-table-column prop="tag" label="标签" :filters="labelList"
                       :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === '物业费' ? 'danger' : 'primary'" disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        dateList: [],
        labelList: [],
        search: ''
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData(){//使用axios发送请求获取数据
        this.$axios.get('http://127.0.0.1:3002/payment').then(res=>{
          console.log(res)
          this.tableData = res.data;
          for(var i = 0; i < this.tableData.length; i++){
            this.dateList.push({text: this.tableData[i].date, value: this.tableData[i].date});
            this.labelList.push({text: this.tableData[i].tag, value: this.tableData[i].tag});
          }
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
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    },
  }
</script>

<style>

</style>
