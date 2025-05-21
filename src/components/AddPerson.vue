<template>
  <div class="add-person-form">
    <h3>Add New Person</h3>
    <form @submit.prevent="handleAddPerson">
      <div>
        <label for="name">Fullname:</label>
        <input type="text" id="name" v-model="personData.name" placeholder="Name" required />
      </div>
      <div>
        <label for="yob">Year Born:</label>
        <input type="number" id="yob" v-model.number="personData.yob" placeholder="yyyy" required />
      </div>
      <div>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" v-model.number="personData.weight" placeholder="Weight (kg)" required />
      </div>
      <div>
        <label for="height">Height (cm):</label>
        <input type="number" id="height" v-model.number="personData.height" placeholder="Height (cm)" required />
      </div>
      <div>
        <label for="photoUrl">Photo URL:</label>
        <input type="text" id="photoUrl" v-model="personData.photoUrl" placeholder="Image URL" />
      </div>
      <button type="submit">Add Person</button>
    </form>
    <p v-if="feedbackMessage" :class="{ success: isSuccess, error: !isSuccess }">{{ feedbackMessage }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router"; // Keep this import

const router = useRouter(); // Keep this line

const personData = reactive({
  name: "",
  yob: null,
  weight: null,
  height: null,
  photoUrl: ""
});

const feedbackMessage = ref("");
const isSuccess = ref(false);

const calculateAge = (yob) => {
  if (!yob) return null;
  return new Date().getFullYear() - yob;
};

const calculateBmi = (weight, height) => {
  if (!weight || !height) return null;
  return (weight / ((height / 100) ** 2)).toFixed(2);
};

const handleAddPerson = async () => {
  feedbackMessage.value = ""; 
  if (!personData.name || !personData.yob || !personData.weight || !personData.height) {
    feedbackMessage.value = "Please fill in all required fields.";
    isSuccess.value = false;
    return;
  }

  const age = calculateAge(personData.yob);
  const bmi = calculateBmi(personData.weight, personData.height);

  const newPerson = {
    name: personData.name,
    yob: personData.yob,
    age: age,
    weight: personData.weight,
    height: personData.height,
    bmi: bmi,
    photoUrl: personData.photoUrl || `https://i.pravatar.cc/150?u=${Date.now()}` 
  };

  try {
    const response = await fetch("http://localhost:3000/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPerson)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    feedbackMessage.value = "Person added successfully!";
    isSuccess.value = true;

    personData.name = "";
    personData.yob = null;
    personData.weight = null;
    personData.height = null;
    personData.photoUrl = "";

    // UNCOMMENTED and activated:
    setTimeout(() => {
      router.push("/"); 
    }, 1500); 

  } catch (error) {
    console.error("Error adding person:", error);
    feedbackMessage.value = "Failed to add person. See console for details.";
    isSuccess.value = false;
  }
};
</script>

<style scoped>
.add-person-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.add-person-form div {
  margin-bottom: 15px;
}
.add-person-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
}
.success {
  color: green;
  background-color: #e6fffa;
  border: 1px solid green;
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
}
.error {
  color: red;
  background-color: #ffebee;
  border: 1px solid red;
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
}
</style>
