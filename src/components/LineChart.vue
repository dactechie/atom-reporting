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
  chartData: Object,
  chartOpts: Object
});
// const { chartTitle, chartData } = toRefs(props);
const chartOptions = ref({});
const chartData1 = ref({});

onMounted(() => {
  chartOptions.value = Object.assign(
    {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: props.chartTitle
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true
            }
          }
        }
      }
    },
    props.chartOpts
  );
  chartData1.value = props.chartData;
});
// };
</script>

<template>
  <Line class="item" :chart-options="chartOptions" :chart-data="chartData1" />
  <!-- 
        style="width: 100%; height: 80%"
    <Line
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
<style>
.item {
  background-color: #ffffff;
  /* border: 2px solid rgb(123, 210, 132); */
  /* border-color: aquamarine; */
  /* padding: 10px; */
  /* font-size: 30px; */
  border: 1px solid rgb(216, 216, 216);
  text-align: center;
}
</style>
