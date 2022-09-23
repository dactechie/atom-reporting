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
  <!-- <Suspense> -->
  <div v-if="userATOMs.length > 0">
    <!-- <BarChart /> -->

    <ChartsLayout :key="componentKey" :userATOMs="userATOMs" />

    <!-- <HelloWorld :userATOMs="userATOMs" :SLK="SLK" /> -->
  </div>
  <!-- </Suspense> -->
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
