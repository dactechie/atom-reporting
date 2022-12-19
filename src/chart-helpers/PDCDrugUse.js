const fields = ["PDCHowMuchPerOccassion", "PDCDaysInLast28"];

const options = {
  // scales: {
  //   y: {
  //     min: 0,
  //     max: 28
  //   }
  // }
};

const plugins = {
  // annotation: {
  //   annotations: {
  //     dailyProbsBox: {
  //       type: "box",
  //       label: {
  //         display: true,
  //         content: "x caused problems daily or almost daily"
  //       },
  //       yMin: 3,
  //       yMax: 4.9,
  //       backgroundColor: "rgba(255, 99, 132, 0.1)",
  //       borderWidth: 0
  //     },
  //     threeFourBox: {
  //       type: "box",
  //       yMin: 2,
  //       yMax: 2.9,
  //       backgroundColor: "rgba(245, 158, 7, 0.1)",
  //       borderWidth: 0
  //     },
  //     onceTwiceBox: {
  //       type: "box",
  //       yMin: 1.9,
  //       yMax: 1,
  //       backgroundColor: "rgba(235, 218, 33, 0.1)",
  //       borderWidth: 0
  //     },
  //     ltWeeklyBox: {
  //       type: "box",
  //       label: {
  //         display: true,
  //         content: "x caused problems less than weekly"
  //       },
  //       yMin: 0,
  //       yMax: 0.9,
  //       backgroundColor: "rgba(19, 245, 7, 0.1)",
  //       borderWidth: 0
  //     },
  //     noProbsBox: {
  //       type: "box",
  //       // label: {
  //       //   display: true,
  //       //   content: "x did not cause problems"
  //       // },
  //       yMin: -1,
  //       yMax: 0.9,
  //       backgroundColor: "rgba(124, 245, 95, 0.1)",
  //       borderWidth: 0
  //     }
  //   }
  // }
};

// PDCHowMuchPerOccassion: {
//     label: "PDC How much per Occassion",
//     backgroundColor: "#A17979"
//   },
//   PDCDaysInLast28: {
//     label: "PDC Num. Days used in last 28",
//     backgroundColor: "#3A4579"
//   }
const title = "Princpal Drug use frequency & amount (🡻 = 👍)";
export { fields, title, plugins, options };
