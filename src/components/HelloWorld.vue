<script setup>
import { ref, onBeforeMount } from "vue";

const props = defineProps({
  userATOMs: Array,
  SLK: String
});

const count = ref(0);

// const sdsData = ref({});

onBeforeMount(async () => {
  // console.log("Hellowrld props useratoms", props.SLK);
  // console.log("Hellowrld props useratoms", props.userATOMs);
  // const assessmentDates = props.userATOMs.map(a => a.AssessmentDate);
  // sdsData.value = {
  //   labels: assessmentDates,
  //   datasets: [
  //     {
  //       label: "SDS",
  //       backgroundColor: "#f87979",
  //       data: props.userATOMs.map(a => a.SDS_Score)
  //     }
  //   ]
});
</script>

<template>
  {{ SLK }}
  <table>
    <tr v-for="msg in userATOMs">
      <td>{{ msg }}</td>
    </tr>
  </table>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
