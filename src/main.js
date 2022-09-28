import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);

createApp(App).mount("#app");
