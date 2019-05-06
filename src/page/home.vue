<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">数据统计</header>
    </section>
    <tendency :option="chartOption" style="height: 400px"></tendency>
  </div>
</template>

<script>
import headTop from '../components/headTop';
import tendency from '../components/tendency';
import dtime from 'time-formater';
import {
  userCount,
  orderCount,
  getUserCount,
  getOrderCount,
  adminDayCount,
  adminCount,
} from '@/api/getData';
export default {
  data() {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      chartOption: {
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
      },
    };
  },
  components: {
    headTop,
    tendency,
  },
  mounted() {
    this.initData();
    for (let i = 6; i > -1; i--) {
      const date = dtime(new Date().getTime() - 86400000 * i).format(
        'YYYY-MM-DD',
      );
      this.sevenDay.push(date);
    }
    this.getSevenData();
  },
  computed: {},
  methods: {
    async initData() {
      const today = dtime().format('YYYY-MM-DD');
      Promise.all([
        userCount(today),
        orderCount(today),
        adminDayCount(today),
        getUserCount(),
        getOrderCount(),
        adminCount(),
      ])
        .then(res => {
          this.userCount = res[0].count;
          this.orderCount = res[1].count;
          this.adminCount = res[2].count;
          this.allUserCount = res[3].count;
          this.allOrderCount = res[4].count;
          this.allAdminCount = res[5].count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getSevenData() {
      const apiArr = [[], [], []];
      this.sevenDay.forEach(item => {
        apiArr[0].push(userCount(item));
        apiArr[1].push(orderCount(item));
        apiArr[2].push(adminDayCount(item));
      });
      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];
      Promise.all(promiseArr)
        .then(res => {
          const resArr = [[], [], []];
          res.forEach((item, index) => {
            if (item.status == 1) {
              resArr[Math.floor(index / 7)].push(item.count);
            }
          });
          this.sevenDate = resArr;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
@import '../style/mixin';
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;
    }
    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
.wan {
  .sc(16px, #333);
}
</style>
