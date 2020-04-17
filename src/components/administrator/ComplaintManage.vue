<template>
  <div>
    <h1>用户投诉信息</h1>
    <el-table ref="filterTable" :data="tableData" style="width: 100%;text-align: center" border>
      <el-table-column label="用户投诉信息">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="投诉日期">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="投诉人">
                <span>{{ props.row.userName }}</span>
              </el-form-item>
              <el-form-item label="投诉内容">
                <span>{{ props.row.content }}</span>
              </el-form-item>
              <el-form-item label="投诉类型">
                <span>{{ props.row.tag }}</span>
              </el-form-item>
              <el-form-item label="投诉状态">
                <span>{{ props.row.complaintStatus }}</span>
              </el-form-item>
              <el-form-item label="处理人">
                <span>{{ props.row.Handler }}</span>
              </el-form-item>
              <el-form-item label="处理人备注">
                <span>{{ props.row.Remarks }}</span>
              </el-form-item>
              <el-form-item label="用户反馈">
                <span>{{ props.row.feedback }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="投诉日期" sortable>
        </el-table-column>
        <el-table-column prop="userName" label="投诉人"></el-table-column>
        <el-table-column prop="content" label="投诉内容" width="300%"></el-table-column>
        <el-table-column prop="tag" label="投诉类型" :filters="labelList"
                         :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === 'primary'" disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="complaintStatus" label="投诉状态" :filters="complaintStatus"
                         :filter-method="filter2Tag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.complaintStatus === '已处理' ? 'primary' : 'danger'" disable-transitions>{{scope.row.complaintStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="Handler" label="处理人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handle(scope.$index, scope.row)">处理</el-button>

            <el-dialog title="投诉处理" :visible.sync="handleFormVisible" :close-on-click-modal="false">
              <el-form>
                <el-form-item><p>请确认该投诉已处理完成后再提交！</p></el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                  <el-input type="textarea" :rows="2" placeholder="请输入处理备注"v-model="feedbackContent" autocomplete="off" style="height: 50px"></el-input>
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="handleFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>

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
        tableData: [],
        labelList: [],
        complaintStatus: [{text: '已处理', value: '已处理'},{text: '未处理', value: '未处理'}],
        search: ''
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      handle(index, row) {
        console.log(index, row);
        if(this.tableData[index].complaintStatus == '未处理'){
          this.handleFormVisible = true;
        }else {
          this.$message({
            message: '该投诉已被管理员'+this.tableData[index].Handler+'处理！',
            center: true,
            type: 'warning'
          });
        }
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
