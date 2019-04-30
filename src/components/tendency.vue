<template>
  <div class="line1">
    <div id="line1" class style="width: 90%;height:450px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
// import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/tooltip';
export default {
  mounted() {
    this.myChart = echarts.init(document.getElementById('line1'));
    this.initData();
  },
  props: ['sevenDate', 'sevenDay'],
  methods: {
    initData() {
      const option = {
        title: {
          text: '折线图堆叠',
        },
        tooltip: {
          trigger: 'axis',
        },
        color: ['#d14a61', '#0097E9'],
        legend: {
          data: ['期望用戶', '实际用户'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '期望用戶',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            lineStyle: {
              normal: {
                color: '#d14a61',
                width: 2,
              },
            },
          },
          {
            name: '实际用户',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310],
            lineStyle: {
              normal: {
                color: '#0097E9',
                width: 2,
              },
            },
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
  watch: {
    sevenDate: function() {
      this.initData();
    },
    sevenDay: function() {
      this.initData();
    },
  },
};
</script>

<style lang="less">
@import '../style/mixin';
.line1 {
  display: flex;
  justify-content: center;
}
</style>
