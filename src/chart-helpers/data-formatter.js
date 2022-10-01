import * as sds from "./sds";
import * as probs from "./probs";
import { dimensions_config } from "./atom_dimensions";
import { getMinMaxAcrossLists, getRangeAvg } from "../common/utils";

function getNumericArrayForField1(atomData, field, mappingDict, mappingFunc) {
  if (mappingDict !== undefined)
    return atomData.map(a => mappingDict[a[field]]);
  else if (mappingFunc !== undefined)
    return atomData.map(a => mappingFunc(a[field]));

  return atomData.map(a => a[field]);
}

function setupGeneric1(atomData, dataKey, xaxis) {
  const dataConfig = dimensions_config[dataKey];

  return {
    labels: xaxis,
    datasets: [
      Object.assign({ data: atomData.map(a => a[dataKey]) }, dataConfig)
    ]
  };
}

const mapOfRatings = {
  "Daily or almost daily": 4,
  "Three or four times per week": 3,
  "Less than weekly": 1,
  "Once or twice per week": 2,
  "Not at all": 0
};

const valueMappings = {
  Past4WkHowOftenPhysicalHealthCausedProblems: mapOfRatings,
  Past4WkHowOftenMentalHealthCausedProblems: mapOfRatings,
  Past4WkUseLedToProblemsWithFamilyFriend: mapOfRatings,
  Past4WkDailyLivingImpacted: mapOfRatings,
  Past4WkDifficultyFindingHousing: mapOfRatings
};
const valueFuncs = {
  PDCHowMuchPerOccassion: getRangeAvg
};

const otherOptions = {
  tension: 0.2
};

function setupGenericMulti1(atomData, dataKeys, xaxis) {
  const datasets = [];

  dataKeys.forEach(k => {
    const dataConfig = dimensions_config[k];
    const valueMapping = valueMappings[k];
    const valueFunc = valueFuncs[k];

    datasets.push(
      Object.assign(
        {
          data: getNumericArrayForField1(atomData, k, valueMapping, valueFunc)
        },
        dataConfig,
        otherOptions
      )
    );
    console.log(`Data Key ${k}, dataset:`, datasets);
  });

  return {
    labels: xaxis,
    datasets: datasets,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        offset: true
      }
    }
  };
}

function extendYscale1(atomData, fieldName) {
  const numericList = atomData.map(a => a[fieldName]).filter(a => a);

  return {
    scales: {
      y: {
        min: Math.min(...numericList) - 2,
        max: Math.max(...numericList) + 2
      }
    }
  };
}

const charts = [
  {
    chartGroupName: "probs",
    fields: probs.fields,
    options: probs.options,
    plugins: probs.plugins,
    title: probs.title,
    scalingOptionsFunc: probs.getScalingOptions
  },

  {
    chartGroupName: "sds",
    fields: sds.field,
    options: sds.options,
    plugins: sds.plugins,
    title: sds.title
  }
];

// probs.value = setupGenericMulti(atomData, probsFields, assessmentDates);
// const { maxVal, minVal } = getMinMaxAcrossLists(
//   Array.from(probs.value["datasets"])
// );

//props.userATOMs.
export function setUpCharts(atomData, assessmentDates) {
  let result = {};

  for (const chart of charts) {
    if (typeof chart.fields === "string") {
      const fieldname = chart.fields;
      result[chart.chartGroupName] = {
        title: chart.title,
        plugins: chart.plugins,
        data: setupGeneric1(atomData, fieldname, assessmentDates),
        options: Object.assign(
          extendYscale1(atomData, fieldname),
          chart.options
        )
      };
    } else {
      const data = setupGenericMulti1(atomData, chart.fields, assessmentDates);
      const { maxVal, minVal } = getMinMaxAcrossLists(
        Array.from(data["datasets"])
      );
      result[chart.chartGroupName] = {
        title: chart.title,
        plugins: chart.plugins,
        data: data,
        options: chart.scalingOptionsFunc(maxVal, minVal)
      };
    }
  }
  return result;
}
