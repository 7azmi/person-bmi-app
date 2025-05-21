<template>
  <div class="view-person" v-if="person">
    <h3>Person Details: {{ person.name }}</h3>
    <div v-if="isLoading" class="loading">Loading person details...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="!isLoading && !error && person" class="person-details-card">
      <img v-if="person.photoUrl" :src="person.photoUrl" :alt="person.name" class="person-photo-large">
      <p><strong>ID:</strong> {{ person.id }}</p>
      <p><strong>Name:</strong> {{ person.name }}</p>
      <p><strong>Year Born:</strong> {{ person.yob }} (Age: {{ person.age }})</p>
      <p><strong>Weight:</strong> {{ person.weight }} kg</p>
      <p><strong>Height:</strong> {{ person.height }} cm</p>
      <p><strong>BMI:</strong> {{ person.bmi }}</p>
      <div class="bmi-bar-container">
        <div :class="getBmiCategoryClass(person.bmi)" 
             :style="{ width: getBmiPercentageForDisplay(person.bmi) + '%' }" 
             class="bmi-bar">
          {{ getBmiCategory(person.bmi) }} ({{ person.bmi }})
        </div>
      </div>
      <router-link to="/" class="action-btn">Back to List</router-link>
      <router-link :to="`/edit/${person.id}`" class="action-btn edit-btn">Edit Person</router-link>
    </div>
    <div v-if="!isLoading && !error && !person">
      <p>Person not found.</p>
      <router-link to="/" class="action-btn">Back to List</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const person = ref(null);
const isLoading = ref(false);
const error = ref(null);

const fetchPersonDetails = async (id) => {
  if (!id) return;
  isLoading.value = true;
  error.value = null;
  person.value = null; 
  try {
    const response = await fetch(`http://localhost:3000/persons/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Person not found.");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    person.value = await response.json();
  } catch (e) {
    console.error("Error fetching person details:", e);
    error.value = e.message || "Failed to load person details.";
  } finally {
    isLoading.value = false;
  }
};

// BMI utility functions (can be moved to a separate utils.js if used elsewhere)
const getBmiCategory = (bmiValue) => {
  const bmi = parseFloat(bmiValue);
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
};

const getBmiCategoryClass = (bmiValue) => {
  const category = getBmiCategory(bmiValue).toLowerCase();
  return category; // CSS classes: .underweight, .normal, .overweight, .obese
};

const getBmiPercentageForDisplay = (bmiValue) => {
  // This is a rough visualization, not a precise scale.
  // Max BMI for "reasonable" display width, e.g., 40.
  const bmi = parseFloat(bmiValue);
  if (bmi < 10) return 25; // min width
  if (bmi > 40) return 100; // max width
  return (bmi / 40) * 100;
};


onMounted(() => {
  fetchPersonDetails(route.params.id);
});

// Watch for route param changes if navigating between different person views directly
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchPersonDetails(newId);
  }
});
</script>

<style scoped>
.view-person {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: left;
}
.person-details-card p {
  margin: 10px 0;
  line-height: 1.6;
}
.person-photo-large {
  display: block;
  max-width: 150px;
  height: auto;
  border-radius: 8px;
  margin: 0 auto 20px auto;
  border: 3px solid #eee;
}
.loading, .error-message {
  text-align: center;
  padding: 20px;
  font-style: italic;
}
.error-message {
  color: red;
}
.action-btn { /* Copied from ListPersons, consider making global or utility class */
  display: inline-block;
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9em;
  margin-right: 10px;
  margin-top: 15px;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: #5cb85c; /* Green for general actions */
  color: white;
}
.action-btn:hover {
  opacity: 0.9;
}
.edit-btn {
  background-color: #ff9800; /* Orange for edit */
}

/* BMI Bar styles */
.bmi-bar-container {
    background-color: #e0e0e0;
    border-radius: 5px;
    margin: 10px 0 15px 0;
    height: 20px;
    width: 100%;
}
.bmi-bar {
    height: 100%;
    color: white;
    text-align: center;
    line-height: 20px;
    border-radius: 5px;
    font-size: 0.8em;
    transition: width 0.5s ease-in-out;
}
.bmi-bar.underweight { background-color: #2196f3; } /* Blue */
.bmi-bar.normal { background-color: #4caf50; }      /* Green */
.bmi-bar.overweight { background-color: #ff9800; }  /* Orange */
.bmi-bar.obese { background-color: #f44336; }       /* Red */
</style>
