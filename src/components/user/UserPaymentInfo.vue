<template>
  <div>
    <h1>用户缴费信息</h1>
    <el-table ref="filterTable" :data="tableData" style="width: 100%" border>
      <el-table-column label="用户缴费信息">
        <el-table-column prop="date" label="出账日期" column-key="date"
                         :filters="dateList" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="amount" label="用量"></el-table-column>
        <el-table-column prop="paymentStatus" label="缴费状态"></el-table-column>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-date-picker v-model="paymentTime" type="month" placeholder="查看其他时间"></el-date-picker>
          <el-button type="primary">查询</el-button>
        </template>
        <el-table-column prop="paymentDate" label="缴费日期"></el-table-column>
        <el-table-column prop="fine" label="滞纳金"></el-table-column>
        <el-table-column prop="tag" label="类别" :filters="labelList"
                         :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '物业费' ? 'danger' : 'primary'" disable-transitions>{{scope.row.tag}}</el-tag>
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
        tableData: [{date: '2020-04-11', name: '张三', money: '50', amount: '100瓦', paymentStatus: '已缴费', paymentDate: '2020-04-11', fine: '0', tag: '电费'},
          {date: '2020-04-11', name: '张三', money: '45', amount: '56立方', paymentStatus: '已缴费', paymentDate: '2020-04-11', fine: '0', tag: '水费'},
          {date: '2020-04-11', name: '张三', money: '50', amount: '78立方', paymentStatus: '已缴费', paymentDate: '2020-04-11', fine: '0', tag: '燃气费'},
          {date: '2020-04-11', name: '张三', money: '250', amount: '120平', paymentStatus: '已缴费', paymentDate: '2020-04-11', fine: '0', tag: '物业费'},
          {date: '2020-04-11', name: '张三', money: '300', amount: '1月', paymentStatus: '已缴费', paymentDate: '2020-04-12', fine: '15', tag: '停车费'}],
        dateList: [],
        labelList: [{text: '电费', value:'电费'},{text: '水费', value:'水费'},{text: '燃气费', value:'燃气费'},{text: '物业费', value:'物业费'},{text: '停车费', value:'停车费'},],
        search: '',
        paymentTime: '',
      }
    },
    mounted() {
      // this.getData();
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
