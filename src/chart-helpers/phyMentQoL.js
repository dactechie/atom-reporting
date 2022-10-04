const title = "Physical Health, Mental Health & Quality of Life (🡹 = 👍)";

const fields = [
  "Past4WkPhysicalHealth",
  "Past4WkMentalHealth",
  "Past4WkQualityOfLifeScore"
];

const options = {
  scales: {
    y: {
      min: 0,
      max: 10
    }
  }
};

const plugins = {
  annotation: {
    annotations: {
      notGoodBox: {
        type: "box",
        // label: {
        //   display: true,
        //   content: "x caused problems daily or almost daily"
        // },
        yMin: 0,
        yMax: 1.9,
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        borderWidth: 0
      },
      hmmBox: {
        type: "box",
        yMin: 2,
        yMax: 3.9,
        backgroundColor: "rgba(245, 158, 7, 0.1)",
        borderWidth: 0
      },
      avgBox: {
        type: "box",
        yMin: 4,
        yMax: 5.9,
        backgroundColor: "rgba(235, 218, 33, 0.1)",
        borderWidth: 0
      },
      goodBox: {
        type: "box",
        // label: {
        //   display: true,
        //   content: "x caused problems less than weekly"
        // },
        yMin: 6,
        yMax: 7.9,
        backgroundColor: "rgba(124, 245, 95, 0.1)",
        borderWidth: 0
      },
      great: {
        type: "box",
        // label: {
        //   display: true,
        //   content: "x did not cause problems"
        // },
        yMin: 8,
        yMax: 10,
        backgroundColor: "rgba(19, 245, 7, 0.1)",
        borderWidth: 0
      }
    }
  }
};

export { fields, title, plugins, options };
