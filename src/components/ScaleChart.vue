// components/ScaleChart.vue
<script setup>
import { CHART_TYPES } from '../chart-helpers/chart-types';
import { Line, Bar, Scatter, Radar } from 'vue-chartjs';

const props = defineProps({
  data: Object,
  config: Object
});

const ChartComponent = computed(() => {
  switch (props.config.chartType) {
    case CHART_TYPES.BAR:
      return Bar;
    case CHART_TYPES.SCATTER:
      return Scatter;
    case CHART_TYPES.RADAR:
      return Radar;
    case CHART_TYPES.LINE:
    default:
      return Line;
  }
});
</script>

<template>
  <component 
    :is="ChartComponent"
    :data="data"
    :options="config.options"
  />
</template>