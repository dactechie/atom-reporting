<!-- DynamicChartLayout.vue -->
<script setup>
import { inject, computed} from 'vue';

const props = defineProps({
  userATOMs: {
    type: Array,
    required: true
  }
});

const chartManager = inject('chartManager');
const activeCharts = computed(() => 
  chartManager.getActiveCharts(props.userATOMs)
);
</script>

<template>
  <div class="chart-grid">
    <div v-for="chart in activeCharts" 
         :key="chart.id" 
         class="chart-item">
      <component 
        :is="chart.component"
        :data="chart.data"
        :config="chart.config"
        :chartData="chart.data"
        :chartConfig="chart.config"
        :chartId="chart.id"
      />
    </div>
  </div>
</template>