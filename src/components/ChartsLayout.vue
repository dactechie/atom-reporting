<script setup>
import { ref, onBeforeMount } from "vue";
import {
  getRangeAvg,
  monthNamesShort,
  getMinMaxAcrossLists
} from "../common/utils";
import { setUpCharts } from "../chart-helpers/data-formatter";
import LineChart from "./LineChart.vue";

const props = defineProps({
  userATOMs: Array,
  SLK: String
});
const otherOptions = {
  tension: 0.2
};

const k10Data = ref({});

const PDCUseData = ref({});

let sds = ref({});
// probs = ref({});

const k10Title = "Kessler-10 Scores (🡻 = 👍)";

// 👎 🡹
const PDCDaysTitle = "Primary Substance of concern (🡻 = 👍)";
// const ready = ref(false);

const phyMentQoL = ref({});
const phyMentQoLTitle =
  "Physical Health, Mental Health & Quality of Life (🡹 = 👍)";

const DrugUseOpts = ref({});
const phyMentQoLOpts = ref({
  scales: {
    y: {
      min: 0,
      max: 10
    }
  }
});
const probsOpts = ref({});
const probs = ref({});
const probsTitle = "Problems in Daily Life (🡻 = 👍)";

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

const dataKey_labels = {
  K10_Score: {
    label: "K10",
    backgroundColor: "#f87979"
  },
  Past4WkQualityOfLifeScore: {
    label: "QOL",
    borderColor: "rgb(192, 192, 75)",
    backgroundColor: "#A17979"
  },
  PDCHowMuchPerOccassion: {
    label: "PDC How much per Occassion",
    backgroundColor: "#A17979"
  },
  PDCDaysInLast28: {
    label: "PDC Num. Days used in last 28",
    backgroundColor: "#3A4579"
  },
  Past4WkPhysicalHealth: {
    label: "Physical Health",
    backgroundColor: "#3A4579",
    borderColor: "rgb(75, 192, 192)"
  },
  Past4WkMentalHealth: {
    label: "Mental Health",
    backgroundColor: "#f87979",
    borderColor: "rgb(192, 75, 192)"
  },
  Past4WkHowOftenPhysicalHealthCausedProblems: {
    label: "Physical Health",
    backgroundColor: "#3A4579",
    borderColor: "rgb(75, 192, 192)"
  },
  Past4WkHowOftenMentalHealthCausedProblems: {
    label: "Mental Health",
    backgroundColor: "#f87979",
    borderColor: "rgb(192, 75, 192)"
  },
  Past4WkUseLedToProblemsWithFamilyFriend: {
    label: "Relationship",
    borderColor: "rgb(192, 192, 75)",
    backgroundColor: "#A17979"
  },
  Past4WkDailyLivingImpacted: {
    label: "Daily Living",
    borderColor: "rgb(92, 92, 175)",
    backgroundColor: "#79B179"
  },
  Past4WkDifficultyFindingHousing: {
    label: "Housing",
    backgroundColor: "#3A4579",
    borderColor: "rgb(25, 125, 75)",
    pointRadius: 5,
    pointBorderColor: "white",
    pointBorderWidth: 1
  }
};

function getNumericArrayForField(atomData, field, mappingDict, mappingFunc) {
  if (mappingDict !== undefined)
    return atomData.map(a => mappingDict[a[field]]);
  else if (mappingFunc !== undefined)
    return atomData.map(a => mappingFunc(a[field]));

  return atomData.map(a => a[field]);
}

function extendYscale(atomData, fieldName) {
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

function setupGenericMulti(atomData, dataKeys, xaxis) {
  const datasets = [];

  dataKeys.forEach(k => {
    const dataConfig = dataKey_labels[k];
    const valueMapping = valueMappings[k];
    const valueFunc = valueFuncs[k];

    datasets.push(
      Object.assign(
        { data: getNumericArrayForField(atomData, k, valueMapping, valueFunc) },
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

function setupGeneric(atomData, dataKey, xaxis) {
  const dataConfig = dataKey_labels[dataKey];

  return {
    labels: xaxis,
    datasets: [
      Object.assign({ data: atomData.map(a => a[dataKey]) }, dataConfig)
    ]
  };
}

onBeforeMount(() => {
  if (props.userATOMs === undefined || props.userATOMs.length <= 0) return;
  const atomData = props.userATOMs;
  const assessmentDates = atomData.map(
    a =>
      `'${a["AssessmentDate"].substr(2, 2)}-${
        monthNamesShort[parseInt(a["AssessmentDate"].substr(5, 2))]
      }`
  );
  // setupSDS(assessmentDates);
  phyMentQoL.value = setupGenericMulti(
    atomData,
    [
      "Past4WkPhysicalHealth",
      "Past4WkMentalHealth",
      "Past4WkQualityOfLifeScore"
    ],
    assessmentDates
  );

  const probsFields = [
    "Past4WkHowOftenPhysicalHealthCausedProblems",
    "Past4WkHowOftenMentalHealthCausedProblems",
    "Past4WkUseLedToProblemsWithFamilyFriend",
    "Past4WkDailyLivingImpacted",
    "Past4WkDifficultyFindingHousing"
    // illegal activities
  ];
  probs.value = setupGenericMulti(atomData, probsFields, assessmentDates);
  const { maxVal, minVal } = getMinMaxAcrossLists(
    Array.from(probs.value["datasets"])
  );

  probsOpts.value = {
    scales: {
      y: {
        min: minVal - 2,
        max: maxVal + 2
      }
    }
  };

  PDCUseData.value = setupGenericMulti(
    atomData,
    ["PDCHowMuchPerOccassion", "PDCDaysInLast28"],
    assessmentDates
  );
  DrugUseOpts.value = extendYscale(atomData, "PDCDaysInLast28");

  const results = setUpCharts(atomData, assessmentDates);
  sds.value = results["sds"];
  // probs.value = results["probs"];

  k10Data.value = setupGeneric(atomData, "K10_Score", assessmentDates);
});
// onMounted(() => {
//   // ready.value = true;
// });

// https://grid.layoutit.com/
// https://medium.com/@nikkipantony/multi-grid-one-page-layout-css-grid-6efefd537404
</script>

<template>
  <div class="container">
    <div class="LeftArea">
      <div class="LeftTop">
        <LineChart
          :chart-data="PDCUseData"
          :chart-title="PDCDaysTitle"
          :chart-opts="DrugUseOpts"
        />
      </div>
      <div class="LeftBottom">
        <div class="LBt1">
          <LineChart
            :chart-data="sds.data"
            :chart-title="sds.title"
            :chart-opts="sds.options"
            :chart-plugins="sds.plugins"
          />
        </div>
        <div class="LBt2">
          <LineChart
            v-if="k10Data"
            :chart-data="k10Data"
            :chart-title="k10Title"
          />
        </div>
      </div>
    </div>
    <div class="RightArea">
      <div class="RightTop">
        <LineChart
          :chart-data="phyMentQoL"
          :chart-title="phyMentQoLTitle"
          :chart-opts="phyMentQoLOpts"
        />
      </div>
      <div class="RightBottom">
        <!-- <LineChart
          :chart-data="probs.data"
          :chart-title="probs.title"
          :chart-opts="probs.options"
        /> -->
        <LineChart
          :chart-data="probs"
          :chart-title="probsTitle"
          :chart-opts="probsOpts"
        />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr 0.7fr;
  grid-template-rows: 1fr 0.5fr 1.5fr;
  gap: 4px 4px;
  /* grid-auto-flow: row; */
  /* background-color: #ffffff; */
}

.LeftArea {
  grid-area: 1 / 1 / 4 / 2;
}

.RightArea {
  grid-area: 1 / 2 / 4 / 4;
}

.RightTop {
  grid-area: 1 / 2 / 3 / 4;
}

.RightBottom {
  grid-area: 3 / 2 / 4 / 4;
}

.LeftTop {
  grid-area: 1 / 1 / 2 / 2;
  align-items: end;
  align-content: end;
}

.LeftBottom {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  /* grid-auto-flow: row; */
  grid-template-areas:
    "LBt1 LBt1 LBt1"
    "LBt2 LBt2 LBt2"
    "LBt3 LBt3 LBt3";
  grid-area: 2 / 1 / 4 / 2;
}

.LBt1 {
  grid-area: LBt1;
}

.LBt2 {
  grid-area: LBt2;
}

.LBt3 {
  grid-area: LBt3;
}
</style>
