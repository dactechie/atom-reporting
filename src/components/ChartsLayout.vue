<script setup>
import { ref, onBeforeMount } from "vue";
import { getAssessmentDates } from "../common/utils";
import { setUpCharts } from "../chart-helpers/data-formatter";
import LineChart from "./LineChart.vue";

const props = defineProps({
  userATOMs: Array,
  SLK: String
});

const PDCUse = ref({});
const sds = ref({});
const k10 = ref({});
const phyMentQoL = ref({});
const probs = ref({});

onBeforeMount(() => {
  if (props.userATOMs === undefined || props.userATOMs.length <= 0) return;

  const atomData = props.userATOMs;
  const assessmentDates = getAssessmentDates(atomData);

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
          :chart-opts="PDCUse.options"
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
