import {
  // getRangeAvg,
  KesslerColors
  // monthNamesShort,
  // getMinMaxAcrossLists
} from "../../common/utils";
import { CHART_TYPES } from "@/chart-helpers/chart-types";

const chartType = CHART_TYPES.LINE;
function pointBackgroundColor1(ctx) {
  if (!ctx.parsed.y) return undefined;
  const col = KesslerColors(ctx.parsed.y, 2);
  // console.log("color  [y:" + ctx.parsed.y + "]  ;  color:" + col);
  return col;
}
const options = {
  elements: {
    point: {
      backgroundColor: pointBackgroundColor1
    }
  },
  scales: {
    y: {
      min: 0,
      max: 25
    }
  },
  pan: {
    rangeMax: {
      y: 25
    }
  }
};

const plugins = {
  legend: {
    display: false
  },
  annotation: {
    annotations: {
      // line1: {
      //   type: "line",

      //   yMin: 10,
      //   yMax: 10,
      //   borderColor: "rgb(255, 99, 132)",
      //   borderWidth: 2
      // },

      substantialBox: {
        type: "box",
        label: {
          display: true,
          content: "likely severe MH concerns"
        },
        yMin: 15,
        yMax: 25,
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        borderWidth: 0
      },
      moderateBox: {
        type: "box",
        label: {
          display: true,
          content: "likely moderate MH concerns"
        },
        yMin: 12.5,
        yMax: 29.9,
        backgroundColor: "rgba(235, 218, 33, 0.1)",
        borderWidth: 0
      },

      mildBox: {
        type: "box",
        label: {
          display: true,
          content: "Likely Mild MH concerns"
        },
        yMin: 10,
        yMax: 12.4,
        backgroundColor: "rgba(124, 245, 95, 0.1)",
        borderWidth: 0
      },

      nilBox: {
        type: "box",
        label: {
          display: true,
          content: "Likely well"
        },
        yMin: 0,
        yMax: 9.9,
        backgroundColor: "rgba(19, 245, 7, 0.1)",
        borderWidth: 0
      }
    }
  }
};

const fields = ["K5_Score"];
const title = "Kessler-5 Mental Health Scores (🡻 = 👍)";

const id = 'k5';

export { id , fields, chartType, title, plugins, options };
