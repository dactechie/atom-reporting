<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import LineChart from "./LineChart.vue";

const props = defineProps({
  userATOMs: Array,
  SLK: String
});

const sdsData = ref({});
const k10Data = ref({});

const PDCUseData = ref({});
const sdsTitle = ref("");
const k10Title = ref("Kessler-10 Scores");

const PDCDaysTitle = ref("Primary Substance of concern");
const ready = ref(false);

const phyMentQoL = ref({});
const phyMentQoLTitle = "Physical Health, Mental Health & Quality of Life";

const sdsOpts = ref({});
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
const probsTitle = "Problems in Daily Life";

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
  PDCHowMuchPerOccassion: getAvg
};

const dataKey_labels = {
  SDS_Score: {
    label: "SDS",
    backgroundColor: "#f87979"
  },
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

const otherOptions = {
  tension: 0.2
};

function getNumericArrayForField(field, mappingDict, mappingFunc) {
  if (mappingDict !== undefined)
    return props.userATOMs.map(a => mappingDict[a[field]]);
  else if (mappingFunc !== undefined)
    return props.userATOMs.map(a => mappingFunc(a[field]));

  return props.userATOMs.map(a => a[field]);
}

function extendYscale(fieldName) {
  const numericList = props.userATOMs.map(a => a[fieldName]).filter(a => a);

  return {
    scales: {
      y: {
        min: Math.min(...numericList) - 2,
        max: Math.max(...numericList) + 2
      }
    }
  };
}

function getAvg(rangeString) {
  if (rangeString === undefined) return undefined;

  if (!rangeString.includes("-")) return parseInt(rangeString);

  return (
    rangeString
      .split("-")
      .map(e => parseInt(e))
      .reduce((a, b) => a + b, 0) / 2
  );
}

function setupGenericMulti(dataKeys, xaxis) {
  const datasets = [];

  dataKeys.forEach(k => {
    const dataConfig = dataKey_labels[k];
    const valueMapping = valueMappings[k];
    const valueFunc = valueFuncs[k];

    datasets.push(
      Object.assign(
        { data: getNumericArrayForField(k, valueMapping, valueFunc) },
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

function setupGeneric(dataKey, xaxis) {
  const dataConfig = dataKey_labels[dataKey];

  return {
    labels: xaxis,
    datasets: [
      Object.assign({ data: props.userATOMs.map(a => a[dataKey]) }, dataConfig)
    ]
  };
}

onBeforeMount(() => {
  if (props.userATOMs === undefined || props.userATOMs.length <= 0) return;
  const assessmentDates = props.userATOMs.map(a =>
    a["AssessmentDate"].substr(0, 7)
  );
  // setupSDS(assessmentDates);
  phyMentQoL.value = setupGenericMulti(
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
  probs.value = setupGenericMulti(probsFields, assessmentDates);
  let maxVal = 0,
    minVal = 50;

  Array.from(probs.value["datasets"]).forEach(e => {
    const noUndefs = e.data.filter(a => a);
    const max = Math.max(...noUndefs);
    if (maxVal < max) maxVal = max;
    const min = Math.min(...noUndefs);
    if (minVal > min) minVal = min;
  });

  probsOpts.value = {
    scales: {
      y: {
        min: minVal - 2,
        max: maxVal + 2
      }
    }
  };

  PDCUseData.value = setupGenericMulti(
    ["PDCHowMuchPerOccassion", "PDCDaysInLast28"],
    assessmentDates
  );
  DrugUseOpts.value = extendYscale("PDCDaysInLast28");

  sdsData.value = setupGeneric("SDS_Score", assessmentDates);
  sdsOpts.value = extendYscale("SDS_Score");

  sdsTitle.value = "Severity of Dependence";
  k10Data.value = setupGeneric("K10_Score", assessmentDates);
});
onMounted(() => {
  ready.value = true;
});

// https://grid.layoutit.com/
// https://medium.com/@nikkipantony/multi-grid-one-page-layout-css-grid-6efefd537404
</script>

<template>
  <!-- style="position: relative; height: 90vh; width: 90vw" -->

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
            :chart-data="sdsData"
            :chart-title="sdsTitle"
            :chart-opts="sdsOpts"
          />
        </div>
        <div class="LBt2">
          <LineChart
            v-if="k10Data"
            :chart-data="k10Data"
            :chart-title="k10Title"
          />
        </div>
        <!-- <div class="LBt3">
          <LineChart :chart-data="PDCUseData" :chart-title="PDCDaysTitle" />
        </div> -->
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
