<template>
  <canvas ref="chart"></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'PieChart',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      new Chart(this.ctx, {
        type: 'pie',
        data: this.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'bottom'
          }
        }
      });
    }
  },
  computed: {
    ctx() {
      return this.$refs.chart.getContext('2d');
    }
  }
};
</script>