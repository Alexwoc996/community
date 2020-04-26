<template>
  <div>
    <h1>用户信息列表</h1>
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
          <el-table ref="filterTable" :data="paymentTableData" style="width: 100%" border>
            <el-table-column label="用户缴费信息">
              <el-table-column prop="date" label="出账日期" column-key="date"
                               :filters="dateList" :filter-method="filterHandler">
              </el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="money" label="金额"></el-table-column>
              <el-table-column prop="amount" label="用量"></el-table-column>
              <el-table-column prop="paymentStatus" label="缴费状态"></el-table-column>
              <el-table-column prop="paymentDate" label="缴费日期"></el-table-column>
            </el-table-column>
            <el-table-column>
              <template slot="header" slot-scope="scope">
                  <el-date-picker v-model="paymentTime" type="month" placeholder="查看其他时间"></el-date-picker>
                  <el-button type="primary">查询</el-button>
              </template>

              <el-table-column prop="fine" label="滞纳金"></el-table-column>
              <el-table-column prop="tag" label="类别" :filters="labelList"
                               :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.tag === 'primary'" disable-transitions>{{scope.row.tag}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-popconfirm title="确定该用户已缴纳费用吗？" @onConfirm="handleEdit(scope.$index, scope.row)">
                    <el-button size="mini" slot="reference" type="primary">缴费确认</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" prop="name"></el-table-column>
      <el-table-column label="住址" prop="address"></el-table-column>
      <el-table-column label="身份证号" prop="IDcard"></el-table-column>
      <el-table-column align="left">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入用户姓名搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-dialog title="编辑用户信息" :visible.sync="userInfoFormVisible" :close-on-click-modal="false">
            <el-form>
              <el-form-item label="用水量" :label-width="formLabelWidth">
                <el-input placeholder="请输入用水量" v-model="tableData[0].water">
                  <template slot="append">吨</template>
                </el-input>
              </el-form-item>
              <el-form-item label="用电量" :label-width="formLabelWidth">
                <el-input placeholder="请输入用电量" v-model="tableData[0].waterFine">
                  <template slot="append">度</template>
                </el-input>
              </el-form-item>
              <el-form-item label="燃气使用量" :label-width="formLabelWidth">
                <el-input placeholder="请输入燃气使用量" v-model="tableData[0].waterFine">
                  <template slot="append">立方</template>
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="userInfoFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="userInfoFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-popconfirm title="该操作将永久删除该用户，确定要删除吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
          <el-button size="mini" type="warning" @click="costFormVisible = true">录入本月费用</el-button>
          <el-dialog title="编辑用户本月费用信息" :visible.sync="costFormVisible" :close-on-click-modal="false">
            <el-form>
              <el-form-item label="用水量" :label-width="formLabelWidth">
                <el-input placeholder="请输入用水量" v-model="tableData[0].water">
                  <template slot="append">吨</template>
                </el-input>
              </el-form-item>
              <el-form-item label="用电量" :label-width="formLabelWidth">
                <el-input placeholder="请输入用电量" v-model="tableData[0].waterFine">
                  <template slot="append">度</template>
                </el-input>
              </el-form-item>
              <el-form-item label="燃气使用量" :label-width="formLabelWidth">
                <el-input placeholder="请输入燃气使用量" v-model="tableData[0].waterFine">
                  <template slot="append">立方</template>
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="costFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="costFormVisible = false">确 定</el-button>
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
        costFormVisible: false,
        formLabelWidth: '100px',
        userInfoFormVisible: false,
        paymentTime: '',
        paymentTableData: [{date: '2020-04-11', name: '张三', money: '50', amount: '100瓦', paymentStatus: '已缴费', paymentDate: '2020-04-11', fine: '0', tag: '电费'},
          {date: '2020-04-11', name: '张三', money: '45', amount: '56立方', paymentStatus: '已缴费', paymentDate: '2020-04-11', fine: '0', tag: '水费'},
          {date: '2020-04-11', name: '张三', money: '50', amount: '78立方', paymentStatus: '已缴费', paymentDate: '2020-04-11', fine: '0', tag: '燃气费'},
          {date: '2020-04-11', name: '张三', money: '250', amount: '120平', paymentStatus: '已缴费', paymentDate: '2020-04-11', fine: '0', tag: '物业费'},
          {date: '2020-04-11', name: '张三', money: '300', amount: '1月', paymentStatus: '已缴费', paymentDate: '2020-04-12', fine: '15', tag: '停车费'}],
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
        this.userInfoFormVisible = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.tableData.splice(index,1);
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
