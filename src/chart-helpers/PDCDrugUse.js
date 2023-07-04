const fields = ["PDCHowMuchPerOccasion", "PDCDaysInLast28"];

const options = {
  // scales: {
  //   y: {
  //     min: 0,
  //     max: 28
  //   }
  // }
};

const plugins = {
  // tooltip: {
  //   callbacks: {
  //     // label: function (context) {
  //     //   let label = context.dataset.label || "";
  //     //   if (label) {
  //     //     label += ": ";
  //     //   }
  //     //   return label;
  //     // }
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
