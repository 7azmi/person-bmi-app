<template>
  <div class="list-persons">
    <h3>Person List</h3>
    <button @click="fetchPersons" v-if="!persons.length && !isLoading && !hasFetchedOnce">Load Persons</button>
    <p v-if="isLoading">Loading persons...</p>
    <p v-if="error">{{ error }}</p>
    <ul v-if="persons.length">
      <li v-for="person in persons" :key="person.id">
        <div class="person-card">
          <img v-if="person.photoUrl" :src="person.photoUrl" :alt="person.name" class="person-photo">
          <div class="person-details">
            <strong>[{{ person.id }}] {{ person.name }}</strong> (Age: {{ person.age }})<br>
            Weight: {{ person.weight }} kg, Height: {{ person.height }} cm<br>
            BMI: {{ person.bmi }}
            <div>
              <router-link :to="`/person/${person.id}`" class="action-btn view-btn">View</router-link>
              <router-link :to="`/edit/${person.id}`" class="action-btn edit-btn">Edit</router-link>
              <button @click="handleDelete(person.id)" class="action-btn delete-btn">Delete</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <p v-if="!isLoading && !persons.length && !error && hasFetchedOnce">No persons found. Try adding some!</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const persons = ref([]);
const isLoading = ref(false);
const error = ref(null);
const hasFetchedOnce = ref(false);

const fetchPersons = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch("http://localhost:3000/persons");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    persons.value = await response.json();
  } catch (e) {
    console.error("Error fetching persons:", e);
    error.value = "Failed to load persons. See console for details.";
    persons.value = [];
  } finally {
    isLoading.value = false;
    hasFetchedOnce.value = true;
  }
};

onMounted(fetchPersons);

const handleDelete = async (personId) => {
  if (!confirm("Are you sure you want to delete this person?")) {
    return;
  }
  try {
    const response = await fetch(`http://localhost:3000/persons/${personId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    fetchPersons(); 
    // alert("Person deleted successfully!"); // Or use a more subtle feedback
  } catch (e) {
    console.error("Error deleting person:", e);
    alert("Failed to delete person.");
  }
};
</script>

<style scoped>
.list-persons {
  margin-top: 20px;
}
.person-card {
  display: flex;
  align-items: center;
  gap: 15px;
}
.person-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
}
.person-details {
  text-align: left;
  flex-grow: 1;
}
.person-details div {
  margin-top: 8px;
}
.action-btn {
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9em;
  margin-right: 5px;
  cursor: pointer;
  border: 1px solid transparent;
}
.view-btn {
  background-color: #2196f3; color: white;
}
.view-btn:hover {
  background-color: #1976d2;
}
.edit-btn {
  background-color: #ff9800; color: white;
}
.edit-btn:hover {
  background-color: #f57c00;
}
.delete-btn {
  background-color: #f44336; color: white; border: none;
}
.delete-btn:hover {
  background-color: #d32f2f;
}
</style>
