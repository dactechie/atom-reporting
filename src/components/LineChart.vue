<script setup>
import { Line } from "vue-chartjs";
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);
const props = defineProps({
  chartTitle: String,
  chartData: Object
});
// const { chartTitle, chartData } = toRefs(props);
const chartOptions = ref({});
const chartData1 = ref({});

onMounted(() => {
  chartOptions.value = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.chartTitle
      }
    }
  };
  chartData1.value = props.chartData;
});
// };
</script>

<template>
  <Line :chart-options="chartOptions" :chart-data="chartData1" />
  <!-- <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  /> -->
</template>
