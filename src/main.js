import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(zoomPlugin);
Chart.register(annotationPlugin);

createApp(App).mount("#app");
