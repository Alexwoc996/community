<template>
  <div>
    <h1>这是页面4，显示echarts的实例</h1>
    <div style="width: 100%;height:400px;">
      <div id="echarts1" style="width: 40%;height:400px;display:inline-block;"></div>
      <div id="echarts3" style="width: 50%;height:400px;display:inline-block;"></div>
    </div>
    <div id="echarts2" style="width: 100%;height:400px;"></div>
    <div id="echarts4" style="width: 100%;height:400px;"></div>
    <div id="echarts5" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
    export default {
        name: "PageFour",
      methods:{
          init(){
            // 基于准备好的dom，初始化echarts实例
            var myChart1 = this.$echarts.init(document.getElementById('echarts1'));
            var myChart2 = this.$echarts.init(document.getElementById('echarts2'));
            var myChart3 = this.$echarts.init(document.getElementById('echarts3'));
            var myChart4 = this.$echarts.init(document.getElementById('echarts4'));
            var myChart5 = this.$echarts.init(document.getElementById('echarts5'));
            // 指定图表的配置项和数据
            var option1 = {
              title: {
                text: 'ECharts 入门示例'
              },
              tooltip: {},
              legend: {
                data:['销量']
              },
              xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
              },
              yAxis: {},
              series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
              }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(option1);

            var option2 = {
              legend: {},
              tooltip: {
                trigger: 'axis',
                showContent: false
              },
              dataset: {
                source: [
                  ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                  ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                  ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                  ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                  ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                ]
              },
              xAxis: {type: 'category'},
              yAxis: {gridIndex: 0},
              grid: {top: '55%'},
              series: [
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {
                  type: 'pie',
                  id: 'pie',
                  radius: '30%',
                  center: ['50%', '25%'],
                  label: {
                    formatter: '{b}: {@2012} ({d}%)'
                  },
                  encode: {
                    itemName: 'product',
                    value: '2012',
                    tooltip: '2012'
                  }
                }
              ]
            };

            myChart2.on('updateAxisPointer', function (event) {
              var xAxisInfo = event.axesInfo[0];
              if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1;
                myChart.setOption({
                  series: {
                    id: 'pie',
                    label: {
                      formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                      value: dimension,
                      tooltip: dimension
                    }
                  }
                });
              }
            });

            myChart2.setOption(option2);

            var option3 = {
              title: {
                text: '未来一周气温变化',
                subtext: '纯属虚构'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['最高气温', '最低气温']
              },
              toolbox: {
                show: true,
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                  dataView: {readOnly: false},
                  magicType: {type: ['line', 'bar']},
                  restore: {},
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} °C'
                }
              },
              series: [
                {
                  name: '最高气温',
                  type: 'line',
                  data: [11, 11, 15, 13, 12, 13, 10],
                  markPoint: {
                    data: [
                      {type: 'max', name: '最大值'},
                      {type: 'min', name: '最小值'}
                    ]
                  },
                  markLine: {
                    data: [
                      {type: 'average', name: '平均值'}
                    ]
                  }
                },
                {
                  name: '最低气温',
                  type: 'line',
                  data: [1, -2, 2, 5, 3, 2, 0],
                  markPoint: {
                    data: [
                      {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    ]
                  },
                  markLine: {
                    data: [
                      {type: 'average', name: '平均值'},
                      [{
                        symbol: 'none',
                        x: '90%',
                        yAxis: 'max'
                      }, {
                        symbol: 'circle',
                        label: {
                          position: 'start',
                          formatter: '最大值'
                        },
                        type: 'max',
                        name: '最高点'
                      }]
                    ]
                  }
                }
              ]
            };
            myChart3.setOption(option3);

            var option4 = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '直接访问',
                  type: 'bar',
                  data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                  name: '邮件营销',
                  type: 'bar',
                  stack: '广告',
                  data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                  name: '联盟广告',
                  type: 'bar',
                  stack: '广告',
                  data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                  name: '视频广告',
                  type: 'bar',
                  stack: '广告',
                  data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                  name: '搜索引擎',
                  type: 'bar',
                  data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                  markLine: {
                    lineStyle: {
                      type: 'dashed'
                    },
                    data: [
                      [{type: 'min'}, {type: 'max'}]
                    ]
                  }
                },
                {
                  name: '百度',
                  type: 'bar',
                  barWidth: 5,
                  stack: '搜索引擎',
                  data: [620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                  name: '谷歌',
                  type: 'bar',
                  stack: '搜索引擎',
                  data: [120, 132, 101, 134, 290, 230, 220]
                },
                {
                  name: '必应',
                  type: 'bar',
                  stack: '搜索引擎',
                  data: [60, 72, 71, 74, 190, 130, 110]
                },
                {
                  name: '其他',
                  type: 'bar',
                  stack: '搜索引擎',
                  data: [62, 82, 91, 84, 109, 110, 120]
                }
              ]
            };
            myChart4.setOption(option4);

            var option5 = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value'
              },
              yAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              },
              series: [
                {
                  name: '直接访问',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'insideRight'
                  },
                  data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                  name: '邮件营销',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'insideRight'
                  },
                  data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                  name: '联盟广告',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'insideRight'
                  },
                  data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                  name: '视频广告',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'insideRight'
                  },
                  data: [150, 212, 201, 154, 190, 330, 410]
                },
                {
                  name: '搜索引擎',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'insideRight'
                  },
                  data: [820, 832, 901, 934, 1290, 1330, 1320]
                }
              ]
            };
            myChart5.setOption(option5);
          }
      },
      mounted() {
        this.init();
      }
    }
</script>

<style scoped>

</style>
