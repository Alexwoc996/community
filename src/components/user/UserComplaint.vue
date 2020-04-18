<template>
  <div>
    <h1>用户投诉信息</h1>
    <el-table ref="filterTable" :data="tableData" style="width: 100%" border>
      <el-table-column label="历史投诉信息">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="投诉日期">
                <span>{{ props.row.date }}</span>
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
              <el-form-item label="处理时间">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="用户反馈">
                <span>{{ props.row.feedback }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="投诉日期" sortable>
        </el-table-column>
        <el-table-column prop="content" label="投诉内容" width="300%"></el-table-column>
        <el-table-column prop="complaintStatus" label="投诉状态" :filters="complaintStatus"
                         :filter-method="filter2Tag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.complaintStatus === '已处理' ? 'primary' : 'danger'" disable-transitions>{{scope.row.complaintStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="Handler" label="处理人"></el-table-column>
        <el-table-column prop="tag" label="投诉类型" :filters="labelList"
                         :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === 'primary'" disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button type="text" @click="complaintInfoFormVisible = true">我要投诉</el-button>
          <el-dialog title="编辑投诉信息" :visible.sync="complaintInfoFormVisible" :close-on-click-modal="false">
            <el-form>
              <el-form-item label="投诉内容" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="2" placeholder="请输入投诉内容" v-model="complaintContent"></el-input>
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
              <el-button @click="complaintInfoFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="complaintInfoFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </template>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleFeedback(scope.$index, scope.row)">反馈</el-button>
            <el-dialog title="投诉反馈" :visible.sync="feedbackFormVisible" :close-on-click-modal="false">
              <el-form>
                <el-form-item label="请为本次服务评分" :label-width="120">
                  <el-rate v-model="star" @change=""></el-rate>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                  <el-input type="textarea" :rows="2" placeholder="请输入反馈备注"v-model="feedbackContent" autocomplete="off" style="height: 50px"></el-input>
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="feedbackFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="feedbackFormVisible = false">确 定</el-button>
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
        formLabelWidth:'100px',
        complaintInfoFormVisible:false,
        feedbackFormVisible: false,
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
      handleFeedback(index, row) {
        console.log(index, row);
        if(this.tableData[index].complaintStatus == '已处理'){
          this.feedbackFormVisible = true;
        }else {
          this.$message({
            message: '投诉未处理，请等待处理后再反馈！',
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
