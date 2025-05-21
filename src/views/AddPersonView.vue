<template>
  <div class="add-person-view">
    <AddPerson />
  </div>
</template>

<script setup>
import AddPerson from "@/components/AddPerson.vue";
</script>

<style scoped>
.add-person-view {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
