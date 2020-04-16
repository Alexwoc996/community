<template>
  <div>
    <h1>用户投诉信息</h1>
    <el-table ref="filterTable" :data="tableData" style="width: 100%" border>
      <el-table-column label="历史投诉信息">
        <el-table-column prop="date" label="投诉日期" sortable column-key="date"
                         :filters="dateList" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="content" label="投诉内容" width="300%"></el-table-column>
        <el-table-column prop="complaintStatus" label="投诉状态"></el-table-column>
        <el-table-column prop="Handler" label="处理人"></el-table-column>
        <el-table-column prop="Remarks" label="处理人备注" width="300%"></el-table-column>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button type="text" @click="paymentInfoFormVisible = true">我要投诉</el-button>

          <el-dialog title="编辑投诉信息" :visible.sync="paymentInfoFormVisible" :close-on-click-modal="false">
            <el-form>
              <el-form-item label="投诉内容" :label-width="formLabelWidth">
<!--                <el-input v-model="ruleForm.changeFamilyName" autocomplete="off" style="height: 50px"></el-input>-->
                <el-input type="textarea" :rows="2" placeholder="请输入投诉内容" v-model="complaintContent">
                </el-input>
              </el-form-item>
              <el-form-item label="投诉类型" :label-width="formLabelWidth">
                <el-select v-model="complaintKind" placeholder="请选择投诉类型">
                  <el-option label="房屋管理" value="1"></el-option>
                  <el-option label="设备管理" value="2"></el-option>
                  <el-option label="安全管理" value="3"></el-option>
                  <el-option label="环境管理" value="4"></el-option>
                  <el-option label="综合服务" value="5"></el-option>
                  <el-option label="业主纠纷" value="6"></el-option>
                  <el-option label="地产相关" value="7"></el-option>
                  <el-option label="其他" value="8"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="paymentInfoFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="paymentInfoFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>

        </template>
        <el-table-column prop="tag" label="投诉类型" :filters="labelList"
                         :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === 'primary'" disable-transitions>{{scope.row.tag}}</el-tag>
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
        formLabelWidth:'100px',
        paymentInfoFormVisible:false,
        complaintContent: '',//投诉内容
        complaintKind:'',//投诉类型
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
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getData(){//使用axios发送请求获取数据
        this.$axios.get('http://127.0.0.1:3002/complaint').then(res=>{
          console.log(res)
          this.tableData = res.data;
          for(var i = 0; i < this.tableData.length; i++){
            this.dateList.push({text: this.tableData[i].date, value: this.tableData[i].date});
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
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    },
  }
</script>

<style>

</style>
