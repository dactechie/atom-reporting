<script>
import { Bar } from "vue-chartjs";
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

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart"
    },
    datasetIdKey: {
      type: String,
      default: "label"
    },
    // title: {
    //   type: String,
    //   default:
    //     "Individual Client Outcomes – Physical Health, Mental health & Quality of Life (ATOP Wellbeing Measures) "
    // },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: "",
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [{ data: [40, 20, 12] }]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Individual Client Outcomes – Physical Health, Mental health & Quality of Life (ATOP Wellbeing Measures) "
          }
        }
      }
    };
  }
};
</script>

<template>
  <Bar
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
  />
</template>
