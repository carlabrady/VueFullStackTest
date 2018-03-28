<template>
  <div class="sales">
    <div class="white elevation-2">
      <bar-chart></bar-chart>
    </div>
  </div>
</template>

<script>
import BarChart from './customCharts/BarChart'

export default {
  name: 'Sales',
  components: {
    BarChart
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
