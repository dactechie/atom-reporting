import {
  // getRangeAvg,
  SDSColors
  // monthNamesShort,
  // getMinMaxAcrossLists
} from "../common/utils";

function pointBackgroundColor(ctx) {
  if (!ctx.parsed.y) return undefined;
  const col = SDSColors(ctx.parsed.y);
  // console.log("color  [y:" + ctx.parsed.y + "]  ;  color:" + col);
  return col;
}
const options = {
  elements: {
    point: {
      backgroundColor: pointBackgroundColor
    }
  },
  scales: {
    y: {
      min: 0,
      max: 15
    }
  },
  pan: {
    rangeMax: {
      y: 18
    }
  }
};

const plugins = {
  legend: {
    display: false
  },
  annotation: {
    annotations: {
      line1: {
        type: "line",

        yMin: 10,
        yMax: 10,
        borderColor: "rgb(255, 99, 132, 0.35)",
        borderWidth: 2
      },

      severeBox: {
        type: "box",
        label: {
          display: true,
          content: "Severe"
        },
        yMin: 12.9,
        yMax: 15,
        backgroundColor: "rgba(255, 99, 132, 0.15)",
        borderWidth: 0
      },
      substantialBox: {
        type: "box",
        label: {
          display: true,
          content: "substantial"
        },
        yMin: 9.9,
        yMax: 12.9,
        backgroundColor: "rgba(245, 158, 7, 0.15)",
        borderWidth: 0
      },
      moderateBox: {
        type: "box",
        label: {
          display: true,
          content: "moderate"
        },
        yMin: 7,
        yMax: 9.9,
        backgroundColor: "rgba(235, 218, 33, 0.15)",
        borderWidth: 0
      },

      mildBox: {
        type: "box",
        label: {
          display: true,
          content: "Mild"
        },
        yMin: 4,
        yMax: 6.9,
        backgroundColor: "rgba(124, 245, 95, 0.15)",
        borderWidth: 0
      },

      nilBox: {
        type: "box",
        label: {
          display: true,
          content: "Negligible"
        },
        yMin: 0,
        yMax: 3.9,
        backgroundColor: "rgba(19, 245, 7, 0.15)",
        borderWidth: 0
      }
    }
  }
};

const field = "SDS_Score";
const title = "Severity of Dependence (🡻 = 👍)";
export { field, title, plugins, options };
