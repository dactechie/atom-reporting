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
        min: minVal - 2,
        max: maxVal + 2
      }
    }
  };
  return options;
}

const plugins = {};

const title = "Problems in Daily Life (🡻 = 👍)";
export { fields, title, plugins, getScalingOptions };
