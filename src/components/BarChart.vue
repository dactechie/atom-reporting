<script setup>
import { Bar } from "vue-chartjs";
import { ref, onMounted, watch } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
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
  chartData1.value = props.chartData;
});

// export default {
//   name: "BarChart",
//   components: { Bar },
//   props: {
//     chartId: {
//       type: String,
//       default: "bar-chart"
//     },
//     datasetIdKey: {
//       type: String,
//       default: "label"
//     },
//     // title: {
//     //   type: String,
//     //   default:
//     //     "Individual Client Outcomes – Physical Health, Mental health & Quality of Life (ATOP Wellbeing Measures) "
//     // },
//     width: {
//       type: Number,
//       default: 400
//     },
//     height: {
//       type: Number,
//       default: 400
//     },
//     cssClasses: {
//       default: "",
//       type: String
//     },
//     styles: {
//       type: Object,
//       default: () => {}
//     },
//     plugins: {
//       type: Object,
//       default: () => {}
//     }
//   },
//   data() {
//     return {
//       chartData: {
//         labels: ["January", "February", "March"],
//         datasets: [{ data: [40, 20, 12] }]
//       },
//       chartOptions: {
//         responsive: true,
//         plugins: {
//           title: {
//             display: true,
//             text: "Individual Client Outcomes – Physical Health, Mental health & Quality of Life (ATOP Wellbeing Measures) "
//           }
//         }
//       }
//     };
//   }
// };
</script>

<template>
  <Bar class="item" :chart-options="chartOptions" :chart-data="chartData1" />
  <!-- <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    :title="title"
  /> -->
</template>
