<template>
  <div>
    <el-row :gutter="20" type="flex" justify="space-between">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>考勤打卡</span>
          </div>
          <div class="text item" style="text-align: center">
            <el-row>
              <el-col span="12">
                <el-button type="success" icon="el-icon-office-building" circle @click="clockin"></el-button>
                <p>上班打卡</p>
              </el-col>
              <el-col span="12">
                <el-button type="warning" icon="el-icon-s-home" circle @click="clockout"></el-button>
                <p>下班打卡</p>
              </el-col>
            </el-row>


          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>消息提醒</span>
            <el-button style="float: right; padding: 3px 0" type="text">全部已读</el-button>
          </div>
          <el-row type="flex" justify="space-around">
            <el-button type="text" @click="this.$router.replace('/index2/userList')">4条待处理的注册申请</el-button>
            <el-button type="text">5条待处理的投诉信息</el-button>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-button type="text">3条待处理的报修信息</el-button>
            <el-button type="text">56个待录入的缴费信息</el-button>
          </el-row>

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
    data(){
      return{
        workStatus:'out',
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
      getNowTime(){
        let date = new Date()
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s
      },
      clockin() {
        if(this.workStatus == 'out'){
          this.workStatus = 'in';
          this.$notify({
            title: '提示',
            message: '上班打卡成功，打卡时间'+this.getNowTime(),
            duration: 3000
          });
        }else {
          this.$message({
            message: '您已上班，请勿重复打卡',
            type: 'warning'
          });
        }
      },
      clockout() {
        if(this.workStatus == 'in'){
          this.workStatus = 'out';
          this.$notify({
            title: '提示',
            message: '下班打卡成功，打卡时间'+this.getNowTime(),
            duration: 3000
          });
        }else {
          this.$message({
            message: '您已下班，请勿重复打卡',
            type: 'warning'
          });
        }

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
      init(){
        var myChart = this.$echarts.init(document.getElementById('echarts'));
        var option = {
          title: {
            text: '考勤统计',
            // subtext: '数据来自网络'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['出勤次数', '迟到次数', '早退次数']
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10', '11月', '12月',]
          },
          series: [
            {
              name: '出勤次数',
              type: 'bar',
              data: [31, 28, 31, 30, 31, 31, 31, 31, 31, 31, 31, 31]
            },
            {
              name: '迟到次数',
              type: 'bar',
              data: [1, 2, 0, 1, 2, 2, 2, 1, 0, 1, 0, 1]
            },
            {
              name: '早退次数',
              type: 'bar',
              data: [3, 1, 2, 3, 1, 0, 2, 6, 1, 2, 1, 0]
            }
          ]
        };
        myChart.setOption(option);
      },
    },
    mounted() {
      let that = this;
      that.getWeather();
      that.init();
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
