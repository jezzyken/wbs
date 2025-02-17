<template>
  <canvas ref="chart"></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'BarChart',
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
        type: 'bar',
        data: this.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
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