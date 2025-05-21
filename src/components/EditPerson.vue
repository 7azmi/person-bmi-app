<template>
  <div class="edit-person-form">
    <h3>Edit Person: {{ originalName }}</h3>
    <div v-if="isLoading" class="loading">Loading person data...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <form @submit.prevent="handleUpdatePerson" v-if="!isLoading && !error && personData.id">
      <div>
        <label for="name">Fullname:</label>
        <input type="text" id="name" v-model="personData.name" required />
      </div>
      <div>
        <label for="yob">Year Born:</label>
        <input type="number" id="yob" v-model.number="personData.yob" required />
      </div>
      <div>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" v-model.number="personData.weight" required />
      </div>
      <div>
        <label for="height">Height (cm):</label>
        <input type="number" id="height" v-model.number="personData.height" required />
      </div>
      <div>
        <label for="photoUrl">Photo URL:</label>
        <input type="text" id="photoUrl" v-model="personData.photoUrl" />
      </div>
      <button type="submit">Update Person</button>
      <router-link :to="`/person/${personData.id}`" class="action-btn cancel-btn">Cancel</router-link>
    </form>
    <p v-if="feedbackMessage" :class="{ success: isSuccess, error: !isSuccess }" class="feedback-message">{{ feedbackMessage }}</p>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Use reactive for the form data object
const personData = reactive({
  id: null,
  name: "",
  yob: null,
  weight: null,
  height: null,
  photoUrl: ""
  // We will calculate age and bmi before sending
});
const originalName = ref(""); // To display in title while editing

const isLoading = ref(false);
const error = ref(null);
const feedbackMessage = ref("");
const isSuccess = ref(false);

const fetchPersonForEdit = async (id) => {
  if (!id) return;
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch(`http://localhost:3000/persons/${id}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error("Person not found to edit.");
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Update personData fields directly
    personData.id = data.id;
    personData.name = data.name;
    personData.yob = data.yob;
    personData.weight = data.weight;
    personData.height = data.height;
    personData.photoUrl = data.photoUrl;
    originalName.value = data.name; // Store original name for title
  } catch (e) {
    console.error("Error fetching person for edit:", e);
    error.value = e.message || "Failed to load person data for editing.";
  } finally {
    isLoading.value = false;
  }
};

// BMI and Age calculation (same as AddPerson)
const calculateAge = (yob) => {
  if (!yob) return null;
  return new Date().getFullYear() - yob;
};
const calculateBmi = (weight, height) => {
  if (!weight || !height) return null;
  return (weight / ((height / 100) ** 2)).toFixed(2);
};

const handleUpdatePerson = async () => {
  feedbackMessage.value = "";
  if (!personData.name || !personData.yob || !personData.weight || !personData.height) {
    feedbackMessage.value = "Please fill in all required fields.";
    isSuccess.value = false;
    return;
  }

  const age = calculateAge(personData.yob);
  const bmi = calculateBmi(personData.weight, personData.height);

  const updatedPerson = {
    // Spread personData to include all its current properties
    ...personData, 
    age: age, // Overwrite/add calculated age
    bmi: bmi  // Overwrite/add calculated BMI
  };
  // id is already part of personData

  try {
    const response = await fetch(`http://localhost:3000/persons/${personData.id}`, {
      method: "PUT", // Use PUT for updates
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPerson)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    feedbackMessage.value = "Person updated successfully!";
    isSuccess.value = true;
    originalName.value = personData.name; // Update title if name changed

    setTimeout(() => {
      router.push(`/person/${personData.id}`); // Navigate to view page after update
    }, 1500);

  } catch (e) {
    console.error("Error updating person:", e);
    feedbackMessage.value = "Failed to update person. See console for details.";
    isSuccess.value = false;
  }
};

onMounted(() => {
  fetchPersonForEdit(route.params.id);
});

// Watch for route param changes if navigating between different edit views directly (less common)
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchPersonForEdit(newId);
  }
});
</script>

<style scoped>
/* Similar to AddPerson.vue styles, consider global form styles */
.edit-person-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.edit-person-form div {
  margin-bottom: 15px;
}
.edit-person-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
}
.loading, .error-message {
  text-align: center;
  padding: 20px;
  font-style: italic;
}
.error-message {
  color: red;
}
.feedback-message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
.success { color: green; background-color: #e6fffa; border: 1px solid green; }
.error { color: red; background-color: #ffebee; border: 1px solid red; }

.action-btn { /* General action button style */
  display: inline-block;
  padding: 10px 15px; /* Match main button style */
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px; /* Match main button font size */
  margin-left: 10px;
  cursor: pointer;
  border: none;
  color: white;
}
.cancel-btn {
  background-color: #777;
}
.cancel-btn:hover {
  background-color: #555;
}
/* Input and main button styles are inherited from App.vue global styles */
</style>
