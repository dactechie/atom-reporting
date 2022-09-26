<script setup>
import { ref, onBeforeMount } from "vue";
import { getClientDataByPartitionKey } from "./api/AZTableService.js";
import { sortByAssessmentDate } from "./common/utils";
// import HelloWorld from "./components/HelloWorld.vue";

import ChartsLayout from "./components/ChartsLayout.vue";

let hasSLK = ref(false);
let SLK = ref("");
const userATOMs = ref([]);
const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

onBeforeMount(async () => {
  console.log(location.href);
  const tmp = window.location.hash.split("#");

  if (tmp.length !== 2) {
    return;
  }
  hasSLK = true;
  SLK.value = tmp[1].substring(1, 15);
  console.log("SLK is ", SLK);

  const result = await getClientDataByPartitionKey(SLK.value);
  const sorted = sortByAssessmentDate(result);
  userATOMs.value = sorted;
  console.log(userATOMs);
  forceRerender();
});

// onMounted(async () => {
//   const tmp = window.location.hash.split("#");

//   if (tmp !== undefined || tmp.length !== 2) {
//     return;
//   }

//   SLK = tmp[1].substring(1, 15);
//   console.log("SLK is ", SLK);

//   const result = await getClientDataByPartitionKey(SLK);
//   userATOMs.value = result;
//   console.log(userATOMs);
// });

// http://127.0.0.1:5173/#/ALLFT210719811  -> /ALLFT210719811
</script>

<template>
  <div class="sheet maincontain">
    <div class="Title">
      <img class="LeftLogo" src="./assets/ATOMLogo.png" alt="ATOM Logo" />
      <div class="MainTitle">
        <h3>Client Outcomes for : {{ SLK }}</h3>
        <h4>{{ VITE_GETCLIENT_LOGICAAPP_URL }}</h4>
      </div>
      <div class="RightLogo">
        <img src="./assets/DirectionsLogoFull.png" alt="Directions Logo" />
      </div>
    </div>
    <div class="Charts" id="charts" v-if="userATOMs.length > 0">
      <ChartsLayout :key="componentKey" :userATOMs="userATOMs" :SLK="SLK" />
    </div>
  </div>
</template>

<style scoped>
@page {
  size: A4 landscape;
}

.maincontain {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 7.5fr;
  gap: 4px 4px;
  grid-auto-flow: row;
  grid-template-areas:
    "Title"
    "Charts";
  background-color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  /* width: 90%; */
  min-width: 1280px;
  height: 90%;
}

.Charts {
  grid-area: Charts;
}

.Title {
  display: grid;
  grid-template-columns: 0.7fr 1.6fr 0.7fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas: ". . .";
  grid-area: Title;
}
</style>
