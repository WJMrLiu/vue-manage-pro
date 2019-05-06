<template>
  <div ref="chartDom"></div>
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
import debounce from 'lodash/debounce';
import { addListener, removeListener } from 'resize-detector';
export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    },
  },
  created(){
    this.resize = debounce(this.resize, 300)
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log('resize');
      this.chart.resize();
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
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
