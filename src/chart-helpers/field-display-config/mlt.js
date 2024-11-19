const fields = ["MLT_Score"];
import { CHART_TYPES } from "@/chart-helpers/chart-types";
const chartType = CHART_TYPES.BAR;
const options = {
  scales: {
    y: {
      min: 0,
      max: 28
    }
  }
};

const plugins = {

};

// PDCHowMuchPerOccassion: {
//     label: "PDC How much per Occassion",
//     backgroundColor: "#A17979"
//   },
//   PDCDaysInLast28: {
//     label: "PDC Num. Days used in last 28",
//     backgroundColor: "#3A4579"
//   }
const title = "My Life Tracker Score(🡻 = 👍)";
const id ='mlt';
export { id, fields, chartType, title, plugins, options };
