<script setup>
import { Line } from "vue-chartjs";
import { ref, onMounted, watch} from "vue";
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
// const props = defineProps({
//   chartTitle: String,
//   chartData: Object,
//   chartOpts: Object,
//   chartPlugins: Object
// });
const props = defineProps({
  chartTitle: String,
  chartData: {
    type: Object,
    default: () => ({
      labels: [],
      datasets: []
    })
  },
  chartOpts: Object,
  chartPlugins: Object
});

//dynamic

// const props = defineProps({
//   chartData: Object,
//   chartConfig: Object,
//   chartId: String
// });

const chartOptions = ref({});
const chartData1 = ref({
  labels: [],
  datasets: []
});

watch(() => props.chartData, (newData) => {
  if (newData) {
    chartData1.value = newData;
  }
}, { immediate: true });

onMounted(() => {
  const plugins = Object.assign(
    {
      title: {
        display: true,
        text: props.chartTitle,
        font: { weight: "bold", size: 14 }
      },
      zoom: {
        pan: {
          enabled: true
          // mode: "xy"
        },
        limits: {
          y: { min: 0, max: 30 }
        },
        // zoom: {
        //   wheel: {
        //     enabled: true,
        //     modifierKey: 'ctrl',
        //     // Add these options
        //     passive: true,
        //     speed: 0.1
        //   }
        // },
        pan: {
          enabled: true
        }
        // zoom: {
        //   // mode: "xy",

        //   // wheel: {
        //   //   enabled: true

        //   //   // rangeMin: {
        //   //   //   y: -2
        //   //   // },
        //   //   // rangeMax: {
        //   //   //   y: 18
        //   //   // }
        //   // }
        // }
      }
    },
    props.chartPlugins
  );

  chartOptions.value = Object.assign(
    {
      responsive: true,
      maintainAspectRatio: false,
      plugins: plugins,
      // scales: {
      //   //https://stackoverflow.com/questions/70385227/chart-js-grid-lines-only-on-dataset-points
      //   x: {
      //     afterBuildTicks: axis =>
      //       (axis.ticks = data.map(v => ({ value: v.x }))),
      //     ticks: {
      //       callback: v => v
      //     }
      //   },
      //   y: {
      //     afterBuildTicks: axis =>
      //       (axis.ticks = data.map(v => ({ value: v.y })))
      //   }
      // },
      interaction: {
        intersect: false,
        mode: "index"
      }
    },
    props.chartOpts
  );
  if (props.chartData) {
    chartData1.value = props.chartData;
  } else {
    console.error("chartData is undefined");
  }
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
