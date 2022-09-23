<script>
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

export default {
  name: "LineChart",
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: "line-chart"
    },
    datasetIdKey: {
      type: String,
      default: "label"
    },
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
    },

    chartData: {
      type: Object,
      required: true
    },

    chartTitle: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    const chartOptions = ref({});
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
      // this.chartData.value = prop.chartData;
    });
    return {
      chartOptions
    };
  }
};
</script>

<template>
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
  />
</template>
