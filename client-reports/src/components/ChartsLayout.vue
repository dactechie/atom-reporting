<script setup>
import { isIntegerKey } from "@vue/shared";
import { ref, onBeforeMount, onMounted } from "vue";
import LineChart from "./LineChart.vue";

const props = defineProps({
  userATOMs: Array
  // ,chartTitle: String
});

const sdsData = ref({});

const PDCUseData = ref({});
const sdsTitle = ref("");

const PDCDaysTitle = ref("");
const ready = ref(false);

const phyMentQoL = ref({});
const phyMentQoLTitle = "Physical Health, Mental Health & Quality of Life";

const probs = ref({});
const probsTitle = "Problems in Daily Life";

const mapOfRatings = {
  "Daily or almost daily": 4,
  "Three or four times per week": 3,
  "Less than weekly": 1,
  "Once or twice per week": 2,
  "Not at all": 0
  // undefined: undefined
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
    borderColor: "rgb(25, 125, 75)"
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

function setupGenericMulti(chartVariable, dataKeys, xaxis) {
  const datasets = [];

  dataKeys.forEach(k => {
    const dataConfig = dataKey_labels[k];
    const valueMapping = valueMappings[k];
    const valueFunc = valueFuncs[k];
    // if (valueMapping !== undefined)
    datasets.push(
      Object.assign(
        // { data: props.userATOMs.map(a => valueMapping[a[k]]) },
        { data: getNumericArrayForField(k, valueMapping, valueFunc) },
        dataConfig,
        otherOptions
      )
    );
    // else
    //   datasets.push(
    //     Object.assign(
    //       { data: props.userATOMs.map(a => a[k]) },
    //       dataConfig,
    //       otherOptions
    //     )
    //   );
    console.log(`Data Key ${k}, dataset:`, datasets);
  });

  chartVariable.value = {
    labels: xaxis,
    datasets: datasets
  };
}

function setupGeneric(variable, dataKey, xaxis) {
  const dataConfig = dataKey_labels[dataKey];

  variable.value = {
    labels: xaxis,
    datasets: [
      Object.assign({ data: props.userATOMs.map(a => a[dataKey]) }, dataConfig)
    ]
  };
}

onBeforeMount(() => {
  if (props.userATOMs === undefined || props.userATOMs.length <= 0) return;
  const assessmentDates = props.userATOMs.map(a => a.AssessmentDate);
  // setupSDS(assessmentDates);
  setupGenericMulti(
    phyMentQoL,
    [
      "Past4WkPhysicalHealth",
      "Past4WkMentalHealth",
      "Past4WkQualityOfLifeScore"
    ],
    assessmentDates
  );

  setupGenericMulti(
    probs,
    [
      "Past4WkHowOftenPhysicalHealthCausedProblems",
      "Past4WkHowOftenMentalHealthCausedProblems",
      "Past4WkUseLedToProblemsWithFamilyFriend",
      "Past4WkDailyLivingImpacted",
      "Past4WkDifficultyFindingHousing"
      // illegal activities
    ],
    assessmentDates
  );

  setupGenericMulti(
    PDCUseData,
    ["PDCHowMuchPerOccassion", "PDCDaysInLast28"],
    assessmentDates
  );

  setupGeneric(sdsData, "SDS_Score", assessmentDates);
  sdsTitle.value = "SDS Title";
  // setupGeneric(QOLData, "Past4WkQualityOfLifeScore", assessmentDates);
  // QOLTitle.value = "Quality of Life";
  // setupGeneric(PDCDaysData, "PDCDaysInLast28", assessmentDates);
  // PDCDaysTitle.value = "PDC Num. Days used in last 28";
});
onMounted(() => {
  ready.value = true;
});

// https://grid.layoutit.com/
</script>

<template>
  <div v-if="ready" class="container">
    <div class="Title">Client Outcomes over time</div>
    <div class="r1c1">
      <LineChart :chart-data="PDCUseData" :chart-title="sdsTitle" />
      <!-- <LineChart :chart-data="probs" :chart-title="probsTitle" /> -->
      <!-- <LineChart :chart-data="sdsData" :chart-title="sdsTitle" /> -->
    </div>
    <div class="r1c2">
      <LineChart :chart-data="phyMentQoL" :chart-title="phyMentQoLTitle" />
    </div>

    <div class="r2c1">
      <LineChart :chart-data="sdsData" :chart-title="sdsTitle" />
    </div>
    <div class="r2c2">
      <LineChart :chart-data="probs" :chart-title="probsTitle" />
    </div>
  </div>
</template>

<style>
.container {
  position: relative;
  height: 40vh;
  width: 80vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 1fr 1.6fr;
  gap: 6px 6px;
  grid-auto-flow: row;
  grid-template-areas:
    "Title Title"
    "r1c1 r1c2"
    "r2c1 r2c2"
    ". .";
}

.Title {
  grid-area: Title;
}

.r1c1 {
  grid-area: r1c1;
}

.r1c2 {
  grid-area: r1c2;
}

.r2c1 {
  grid-area: r2c1;
}

.r2c2 {
  grid-area: r2c2;
}
</style>
