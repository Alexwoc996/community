<template>
    <div>
      <h1>费用录入</h1>
      <el-table ref="filterTable" :data="tableData" border>
        <el-table-column label="费用基本信息">
          <el-table-column label="水费(元/立方)" prop="water"></el-table-column>
          <el-table-column label="水费滞纳金(%)" prop="waterFine"></el-table-column>
          <el-table-column label="电费(元/度)" prop="electricity"></el-table-column>
          <el-table-column label="电费滞纳金(%)" prop="electricityFine"></el-table-column>
          <el-table-column label="燃气费(元/立方)" prop="gas"></el-table-column>
          <el-table-column label="燃气费滞纳金(%)" prop="gasFine"></el-table-column>
          <el-table-column label="停车费(元/月)" prop="park"></el-table-column>
          <el-table-column label="停车费滞纳金(%)" prop="parkFine"></el-table-column>
          <el-table-column label="物业费(元/平)" prop="property"></el-table-column>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-button type="text" @click="costInfoFormVisible = true">编辑基本信息</el-button>

            <el-dialog title="编辑基本费用信息" :visible.sync="costInfoFormVisible" :close-on-click-modal="false">
              <el-form>
                <el-row>
                  <el-col span="12">
                    <el-form-item label="水费" :label-width="formLabelWidth">
                      <el-input placeholder="请输入水费" v-model="tableData[0].water">
                        <template slot="append">元/吨</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="12">
                    <el-form-item label="水费滞纳金" :label-width="formLabelWidth">
                      <el-input placeholder="请输入水费滞纳金" v-model="tableData[0].waterFine">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="12">
                    <el-form-item label="电费" :label-width="formLabelWidth">
                      <el-input placeholder="请输入电费" v-model="tableData[0].electricity">
                        <template slot="append">元/度</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="12">
                    <el-form-item label="电费滞纳金" :label-width="formLabelWidth">
                      <el-input placeholder="请输入电费滞纳金" v-model="tableData[0].electricityFine">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="12">
                    <el-form-item label="燃气费" :label-width="formLabelWidth">
                      <el-input placeholder="请输入燃气费" v-model="tableData[0].gas">
                        <template slot="append">元/立方</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="12">
                    <el-form-item label="燃气费滞纳金" :label-width="formLabelWidth">
                      <el-input placeholder="请输入燃气费滞纳金" v-model="tableData[0].gasFine">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="12">
                    <el-form-item label="停车费" :label-width="formLabelWidth">
                      <el-input placeholder="请输入停车费" v-model="tableData[0].park">
                        <template slot="append">元/月</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="12">
                    <el-form-item label="停车费滞纳金" :label-width="formLabelWidth">
                      <el-input placeholder="请输入停车费滞纳金" v-model="tableData[0].parkFine">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="12">
                    <el-form-item label="物业费" :label-width="formLabelWidth">
                      <el-input placeholder="请输入物业费" v-model="tableData[0].property">
                        <template slot="append">元/平</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="12">
                    <el-form-item label="物业费滞纳金" :label-width="formLabelWidth">
                      <el-input placeholder="请输入物业费滞纳金" v-model="tableData[0].propertyFine">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="costInfoFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="costInfoFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>

          </template>
          <el-table-column label="物业费滞纳金(%)" prop="propertyFine"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "CostEntry",
      data(){
          return{
            formLabelWidth:'100px',
            costInfoFormVisible: false,
            tableData:[{water: '2', waterFine: '5', electricity: '0.6', electricityFine: '5',
              gas: '5', gasFine: '5', park: '300', parkFine: '5', property: '30', propertyFine: '5'}]
          }
      },
      methods:{
      }
    }
</script>

<style scoped>

</style>
