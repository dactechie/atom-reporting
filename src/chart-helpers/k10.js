import {
  // getRangeAvg,
  K10Colors
  // monthNamesShort,
  // getMinMaxAcrossLists
} from "../common/utils";

function pointBackgroundColor1(ctx) {
  if (!ctx.parsed.y) return undefined;
  const col = K10Colors(ctx.parsed.y);
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
      max: 50
    }
  },
  pan: {
    rangeMax: {
      y: 50
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
        yMin: 30,
        yMax: 50,
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        borderWidth: 0
      },
      moderateBox: {
        type: "box",
        label: {
          display: true,
          content: "likely moderate MH concerns"
        },
        yMin: 25,
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
        yMin: 20,
        yMax: 24.9,
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
        yMax: 19.9,
        backgroundColor: "rgba(19, 245, 7, 0.1)",
        borderWidth: 0
      }
    }
  }
};

const field = "K10_Score";
const title = "Kessler-10 Mental Health Scores (🡻 = 👍)";
export { field, title, plugins, options };
