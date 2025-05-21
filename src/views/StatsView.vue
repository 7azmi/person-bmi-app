<template>
  <div class="stats-view container">
    <h2>BMI Statistics</h2>
    <BmiText :persons="personsList" />
    <hr class="stats-divider">
    <BmiStats :persons="personsList" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BmiText from "@/components/BmiText.vue";
import BmiStats from "@/components/BmiStats.vue";

const personsList = ref([]);
const isLoading = ref(false);
const error = ref(null);

const fetchAllPersonsForStats = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch("http://localhost:3000/persons");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    personsList.value = await response.json();
  } catch (e) {
    console.error("Error fetching persons for stats:", e);
    error.value = "Failed to load person data for statistics.";
    personsList.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAllPersonsForStats);
</script>

<style scoped>
.stats-view {
  text-align: left; /* Override global center for this page if needed */
}
.stats-view h2 {
  text-align: center; /* Center the main heading of this page */
}
.stats-divider {
  margin: 30px 0;
  border: 0;
  border-top: 1px solid #eee;
}
/* .container class styling comes from App.vue global styles */
</style>
