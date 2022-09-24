<script setup>
// import { isIntegerKey } from "@vue/shared";
import { ref, onBeforeMount, onMounted } from "vue";
import LineChart from "./LineChart.vue";

const props = defineProps({
  userATOMs: Array,
  SLK: String
  // ,chartTitle: String
});

const sdsData = ref({});

const PDCUseData = ref({});
const sdsTitle = ref("");

const PDCDaysTitle = ref("Primary Subtance of concern");
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
  const assessmentDates = props.userATOMs.map(a =>
    a["AssessmentDate"].substr(0, 7)
  );
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
  sdsTitle.value = "Severity of Dependence";
  // setupGeneric(QOLData, "Past4WkQualityOfLifeScore", assessmentDates);
  // QOLTitle.value = "Quality of Life";
  // setupGeneric(PDCDaysData, "PDCDaysInLast28", assessmentDates);
  // PDCDaysTitle.value = "PDC Num. Days used in last 28";
});
onMounted(() => {
  ready.value = true;
});

// https://grid.layoutit.com/
// https://medium.com/@nikkipantony/multi-grid-one-page-layout-css-grid-6efefd537404
</script>

<template>
  <div class="container" style="position: relative; height: 90vh; width: 90vw">
    <div class="box title1">
      <img src="../assets/ATOMLogo.png" alt="ATOM Logo" />
      &nbsp;&nbsp;

      <h3>Client Outcomes for : {{ SLK }}</h3>
      &nbsp;&nbsp;
      <img src="../assets/DirectionsLogoFull.png" alt="Directions Logo" />
    </div>
    <div class="box s1-a">
      <LineChart :chart-data="PDCUseData" :chart-title="PDCDaysTitle" />
    </div>
    <div class="box s1-b">
      <LineChart :chart-data="phyMentQoL" :chart-title="phyMentQoLTitle" />
    </div>
    <div class="box s1-d"></div>
    <div class="box s1-c">
      <LineChart :chart-data="sdsData" :chart-title="sdsTitle" />
    </div>

    <div class="box s1-e">
      <LineChart :chart-data="probs" :chart-title="probsTitle" />
    </div>
  </div>
</template>

<style>
/* section#section-one {
  background: rgba(165, 112, 33, 0.8);
} */
.container {
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  grid-template-rows: 0.5fr 2fr 2fr 2fr 2fr;
  margin: 1em;
  grid-gap: 1em;
  /* width: 150%;
  height: 150%; */
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgb(252, 254, 252);
}

.title1 {
  grid-column: 1 / span 4;
  grid-row: 1 / span 1;
}

.s1-a {
  grid-column: 1 / span 1;
  grid-row: 2 / span 2;
}
.s1-b {
  grid-column: 2 / span 2;
  grid-row: 2 / span 2;
}
.s1-c {
  grid-column: 1 / span 1;
  grid-row: 4 / span 2;
}

.s1-e {
  grid-column: 2 / span 2;
  grid-row: 4 / span 2;
}

@media print {
  .container {
    display: grid;
    grid-template-columns: 8fr;
    grid-template-rows: 0.5fr 2fr 2fr 0.6fr 2fr 2fr;
    margin: 0.5em;
    grid-gap: 0.5em;
    /* width: 150%;
  height: 150%; */
  }
  .box {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(252, 254, 252);
  }

  .title1 {
    grid-column: 1 / span 4;
    grid-row: 1 / span 1;
  }

  .s1-a {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    height: 60%;
    width: 60%;
  }
  .s1-b {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
    height: 60%;
    width: 60%;
  }
  .s1-d {
    grid-column: 1 / span 1;
    grid-row: 4 / span 1;
    height: 60%;
    width: 60%;
  }
  .s1-c {
    grid-column: 1 / span 1;
    grid-row: 5 / span 1;
    height: 60%;
    width: 60%;
  }

  .s1-e {
    grid-column: 1 / span 1;
    grid-row: 6 / span 1;
    height: 60%;
    width: 60%;
  }
}
</style>
