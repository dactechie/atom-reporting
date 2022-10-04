const title = "Problems in Daily Life (🡻 = 👍)";

const fields = [
  "Past4WkHowOftenPhysicalHealthCausedProblems",
  "Past4WkHowOftenMentalHealthCausedProblems",
  "Past4WkUseLedToProblemsWithFamilyFriend",
  "Past4WkDailyLivingImpacted",
  "Past4WkDifficultyFindingHousing"
  // illegal activities
];
// probs.value = setupGenericMulti(atomData, probsFields, assessmentDates);
// const { maxVal, minVal } = getMinMaxAcrossLists(
//   Array.from(probs.value["datasets"])
// );

function getScalingOptions(minVal, maxVal) {
  const options = {
    scales: {
      y: {
        min: minVal - 1.5,
        max: maxVal + 1
      }
    }
  };
  return options;
}

const plugins = {
  // legend: {
  //   display: false
  // },
  // zoom: {
  //   zoom: {
  //     pan: {
  //       enabled: true,
  //       mode: "xy"
  //     },
  //     limits: {
  //       y: { min: 0, max: 12 }
  //     }

  //     // mode: "xy",
  //   },
  //   wheel: {
  //     enabled: true
  //   }
  // },
  annotation: {
    annotations: {
      dailyProbsBox: {
        type: "box",
        label: {
          display: true,
          content: "Daily or almost daily"
        },
        yMin: 3,
        yMax: 4.9,
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        borderWidth: 0
      },

      threeFourBox: {
        type: "box",

        yMin: 2,
        yMax: 2.9,
        backgroundColor: "rgba(245, 158, 7, 0.1)",
        borderWidth: 0
      },

      onceTwiceBox: {
        type: "box",

        yMin: 1.9,
        yMax: 1,
        backgroundColor: "rgba(235, 218, 33, 0.1)",
        borderWidth: 0
      },

      ltWeeklyBox: {
        type: "box",
        label: {
          display: true,
          content: "Less than weekly"
        },
        yMin: 0,
        yMax: 0.9,
        backgroundColor: "rgba(19, 245, 7, 0.1)",

        borderWidth: 0
      },
      noProbsBox: {
        type: "box",
        // label: {
        //   display: true,
        //   content: "x did not cause problems"
        // },
        yMin: -1,
        yMax: 0.9,
        backgroundColor: "rgba(124, 245, 95, 0.1)",
        borderWidth: 0
      }
    }
  }
};

export { fields, title, plugins, getScalingOptions };
