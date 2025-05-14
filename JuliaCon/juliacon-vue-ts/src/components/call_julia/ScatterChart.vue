<script setup lang="ts">
import {use} from 'echarts/core'
import {ScatterChart} from 'echarts/charts'
import {GridComponent} from 'echarts/components'
import {CanvasRenderer} from 'echarts/renderers'
import VChart from 'vue-echarts'

use([GridComponent, ScatterChart, CanvasRenderer])

const option = {
  grid: {
    show: false
  },
  xAxis: {
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  yAxis: {
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },

  series: [
    {
      symbolSize: 2,
      itemStyle: {
        color: '#ffffff'
      },
      data: generateRandomData(10000),
      type: 'scatter'
    }
  ]
};

function generateRandomData(count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random();
    const y = Math.random();
    data.push([x, y]);
  }
  return data;
}
</script>

<template>
  <v-chart :option="option" autoresize/>
</template>

<style scoped>

</style>