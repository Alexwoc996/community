<template>
  <div>
    <h1>用户报修信息</h1>
    <el-table ref="filterTable" :data="tableData" style="width: 100%" border>
      <el-table-column label="历史报修信息">
        <el-table-column prop="date" label="报修日期" sortable column-key="date"
                         :filters="dateList" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column prop="content" label="报修内容" width="300%"></el-table-column>
        <el-table-column prop="complaintStatus" label="报修状态"></el-table-column>
        <el-table-column prop="Handler" label="维修人员"></el-table-column>
        <el-table-column prop="Remarks" label="维修人员备注" width="300%"></el-table-column>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-button type="text" @click="paymentInfoFormVisible = true">我要报修</el-button>

          <el-dialog title="编辑报修信息" :visible.sync="paymentInfoFormVisible" :close-on-click-modal="false">
            <el-form>
              <el-form-item label="报修内容" :label-width="formLabelWidth">
                <!--                <el-input v-model="ruleForm.changeFamilyName" autocomplete="off" style="height: 50px"></el-input>-->
                <el-input type="textarea" :rows="2" placeholder="请输入报修内容" v-model="complaintContent">
                </el-input>
              </el-form-item>
              <el-form-item label="报修类型" :label-width="formLabelWidth">
                <el-select v-model="value" placeholder="请选择报修类型">
                  <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="paymentInfoFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="paymentInfoFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>

        </template>
        <el-table-column prop="tag" label="报修类型" :filters="labelList"
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
        search: '',
        options: [{label: '公共部位报修', options: [{value: 'Shanghai', label: '公共建筑报修'},
                {value: 'Beijing', label: '公共区域报修'},{value: 'other', label: '其他'}]},
                {label: '自用部位报修', options: [{value: 'Chengdu', label: '门窗报修'},
                {value: 'Shenzhen', label: '管线包修'}, {value: 'Guangzhou', label: '其他'}]
        }],
        value: ''
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
