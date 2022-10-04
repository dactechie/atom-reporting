<script setup>
import { ref, onBeforeMount } from "vue";
import { getRangeAvg, monthNamesShort } from "../common/utils";
import { setUpCharts } from "../chart-helpers/data-formatter";
import LineChart from "./LineChart.vue";

const props = defineProps({
  userATOMs: Array,
  SLK: String
});
// const otherOptions = {
//   tension: 0.2
// };

const PDCUse = ref({});

let sds = ref({});
let k10 = ref({});

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
// const probsOpts = ref({});
const probs = ref({});
// const probsTitle = "Problems in Daily Life (🡻 = 👍)";

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

// const dataKey_labels = {
//   PDCHowMuchPerOccassion: {
//     label: "PDC How much per Occassion",
//     backgroundColor: "#A17979"
//   },
//   PDCDaysInLast28: {
//     label: "PDC Num. Days used in last 28",
//     backgroundColor: "#3A4579"
//   }
// };

// function getNumericArrayForField(atomData, field, mappingDict, mappingFunc) {
//   if (mappingDict !== undefined)
//     return atomData.map(a => mappingDict[a[field]]);
//   else if (mappingFunc !== undefined)
//     return atomData.map(a => mappingFunc(a[field]));

//   return atomData.map(a => a[field]);
// }

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

// function setupGenericMulti(atomData, dataKeys, xaxis) {
//   const datasets = [];

//   dataKeys.forEach(k => {
//     const dataConfig = dataKey_labels[k];
//     const valueMapping = valueMappings[k];
//     const valueFunc = valueFuncs[k];

//     datasets.push(
//       Object.assign(
//         { data: getNumericArrayForField(atomData, k, valueMapping, valueFunc) },
//         dataConfig,
//         otherOptions
//       )
//     );
//     console.log(`Data Key ${k}, dataset:`, datasets);
//   });

//   return {
//     labels: xaxis,
//     datasets: datasets
//     // options: {
//     //   responsive: true,
//     //   maintainAspectRatio: true,
//     //   scales: {
//     //     offset: true
//     //   }
//     // }
//   };
// }

onBeforeMount(() => {
  if (props.userATOMs === undefined || props.userATOMs.length <= 0) return;
  const atomData = props.userATOMs;
  const assessmentDates = atomData.map(
    a =>
      `'${a["AssessmentDate"].substr(2, 2)}-${
        monthNamesShort[parseInt(a["AssessmentDate"].substr(5, 2))]
      }`
  );

  // phyMentQoL.value = setupGenericMulti(
  //   atomData,
  //   [
  //     "Past4WkPhysicalHealth",
  //     "Past4WkMentalHealth",
  //     "Past4WkQualityOfLifeScore"
  //   ],
  //   assessmentDates
  // );

  // PDCUseData.value = setupGenericMulti(
  //   atomData,
  //   ["PDCHowMuchPerOccassion", "PDCDaysInLast28"],
  //   assessmentDates
  // );
  DrugUseOpts.value = extendYscale(atomData, "PDCDaysInLast28");

  const results = setUpCharts(atomData, assessmentDates);
  sds.value = results["sds"];
  k10.value = results["k10"];
  probs.value = results["probs"];
  phyMentQoL.value = results["phyMentQoL"];
  PDCUse.value = results["PDCUse"];
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
          :chart-data="PDCUse.data"
          :chart-title="PDCUse.title"
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
            :chart-data="k10.data"
            :chart-title="k10.title"
            :chart-opts="k10.options"
            :chart-plugins="k10.plugins"
          />
        </div>
      </div>
    </div>
    <div class="RightArea">
      <div class="RightTop">
        <LineChart
          :chart-data="phyMentQoL.data"
          :chart-title="phyMentQoL.title"
          :chart-opts="phyMentQoL.options"
          :chart-plugins="phyMentQoL.plugins"
        />
      </div>
      <div class="RightBottom">
        <LineChart
          :chart-data="probs.data"
          :chart-title="probs.title"
          :chart-opts="probs.options"
          :chart-plugins="probs.plugins"
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
