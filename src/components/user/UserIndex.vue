<template>
  <div>
    <el-row :gutter="20" type="flex" justify="space-between">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>消息提醒</span>
            <el-button style="float: right; padding: 3px 0" type="text">全部已读</el-button>
          </div>
          <div>
            <i class="el-icon-success"></i>
            <el-button type="text">您的投诉信息已被处理</el-button>
          </div>
          <div>
            <i class="el-icon-success"></i>
            <el-button type="text">您的报修信息已被处理</el-button>
          </div>
          <div>
            <i class="el-icon-success"></i>
            <el-button type="text">本月缴费信息已出，请及时缴费</el-button>
          </div>
          <div>
            <i class="el-icon-success"></i>
            <el-button type="text">有新的全站通知，请注意查看</el-button>
          </div>

        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>停车位租赁</span>
          </div>
          <el-form>
            <el-form-item label="选择停车位">
              <el-row type="flex" justify="space-around">
                <el-select v-model="value" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="space-around">
                <el-popconfirm title="确定要租赁该停车位吗？">
                  <el-button type="primary" slot="reference">提 交</el-button>
                </el-popconfirm>
              </el-row>

            </el-form-item>
          </el-form>

        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日天气</span>
          </div>
          {{'城市：' + weatherDate.city + '&nbsp&nbsp&nbsp&nbsp&nbsp更新时间：'+weatherDate.update_time}}<br>
          {{'天气：' + weatherDate.wea + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp空气质量：' + weatherDate.air}}<br>
          {{'实时温度：' + weatherDate.tem + '℃&nbsp&nbsp最高温度：' + weatherDate.tem_day + '℃&nbsp&nbsp最低温度：' + weatherDate.tem_night + '℃'}}<br>
          {{'风向：' + weatherDate.win + '&nbsp&nbsp&nbsp风力：' + weatherDate.win_meter + '&nbsp&nbsp&nbsp风速：' + weatherDate.win_speed}}
        </el-card>
      </el-col>
    </el-row>
    <br>
    <div id="echarts" style="width: 100%;height:400px;"></div>

  </div>
</template>

<script>
    export default {
        name: "UserIndex",
      data(){
        return{
          options: [{
            value: '101',
            label: '101'
          }, {
            value: '102',
            label: '102'
          }, {
            value: '103',
            label: '103'
          }, {
            value: '104',
            label: '104'
          }, {
            value: '105',
            label: '105'
          }],
          value: '',
          time: '',//日期时间
          weatherDate: {
            cityid: "",//城市id
            city: "",//城市名称
            update_time: "",//更新时间
            wea: "",//天气
            wea_img: "",//天气图标
            tem: "",//实时温度
            tem_day: "",//最高温度
            tem_night: "",//最低温度
            win: " ",//风向
            win_speed: "",//风力
            win_meter: "",//风速
            air: ""//空气质量
          }
        }
      },
      methods:{
          init(){
            var myChart = this.$echarts.init(document.getElementById('echarts'));

            var option = {
              title: {
                text: '近期缴费统计',
                // subtext: '数据来自网络'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['物业管理费', '电费', '水费', '燃气费', '停车费']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              yAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
              },
              xAxis: {
                type: 'category',
                data: ['2020.11', '20219.12', '2020.01', '2020.02', '2020.03', '2020.04']
              },
              series: [
                {
                  name: '物业管理费',
                  type: 'bar',
                  data: [345, 356, 403, 357, 321, 278]
                },
                {
                  name: '电费',
                  type: 'bar',
                  data: [55, 44, 66, 77, 45, 34]
                },
                {
                  name: '水费',
                  type: 'bar',
                  data: [34, 23, 56, 43, 55, 66]
                },
                {
                  name: '燃气费',
                  type: 'bar',
                  data: [23, 45, 43, 67, 25, 57]
                },
                {
                  name: '停车费',
                  type: 'bar',
                  data: [32, 32, 32, 32, 32, 32]
                }
              ]
            };
            myChart.setOption(option);
          },
          getWeather(){
            this.$axios.get('https://www.tianqiapi.com/free/day?appid=23556931&appsecret=bO8ROSrK')
              .then(reponse=>{
                console.log(reponse.data);
                this.weatherDate.city = reponse.data.city;
                this.weatherDate.update_time = reponse.data.update_time;
                this.weatherDate.wea = reponse.data.wea;
                this.weatherDate.tem = reponse.data.tem;
                this.weatherDate.tem_day = reponse.data.tem_day;
                this.weatherDate.tem_night = reponse.data.tem_night;
                this.weatherDate.win = reponse.data.win;
                this.weatherDate.win_speed = reponse.data.win_speed;
                this.weatherDate.win_meter = reponse.data.win_meter;
                this.weatherDate.air = reponse.data.air;
            }).catch(()=>{})
          },
        getdatatime(){
            this.time = new Date();
        }
      },
      mounted() {
        this.init();
        let that = this;
        that.getdatatime()
        that.getWeather()
      }
    }
</script>

<style>
  .el-tabs__item{
    font-size: 16px !important;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #FFFFFF;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
