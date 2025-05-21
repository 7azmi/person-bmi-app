<template>
  <div class="bmi-text-stats">
    <h3>BMI Category Breakdown (Text)</h3>
    <div v-if="!persons || persons.length === 0">
      <p>No person data available to calculate statistics.</p>
    </div>
    <div v-else>
      <div v-for="(categoryData, categoryName) in statistics" :key="categoryName" class="category-item">
        <strong>{{ capitalize(categoryName) }}:</strong> 
        {{ categoryData.count }} person(s) ({{ categoryData.percentage }}%)
        <div class="bar-container">
          <div :class="`bar ${categoryName}`" :style="`width: ${categoryData.percentage}%`">
             {{ categoryData.percentage }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  persons: {
    type: Array,
    required: true,
    default: () => []
  }
});

const getBmiCategory = (bmiValue) => {
  const bmi = parseFloat(bmiValue);
  if (bmi < 18.5) return "underweight";
  if (bmi < 24.9) return "normal";
  if (bmi < 29.9) return "overweight";
  return "obese";
};

const statistics = computed(() => {
  const stats = {
    underweight: { count: 0, percentage: 0 },
    normal: { count: 0, percentage: 0 },
    overweight: { count: 0, percentage: 0 },
    obese: { count: 0, percentage: 0 }
  };

  if (!props.persons || props.persons.length === 0) {
    return stats;
  }

  props.persons.forEach(person => {
    if (person.bmi) {
      const category = getBmiCategory(person.bmi);
      if (stats[category]) { 
        stats[category].count++;
      }
    }
  });

  const totalPersons = props.persons.length;
  for (const category in stats) {
    if (totalPersons > 0) {
      stats[category].percentage = ((stats[category].count / totalPersons) * 100).toFixed(1);
    } else {
      stats[category].percentage = "0.0";
    }
  }
  return stats;
});

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
</script>

<style scoped>
.bmi-text-stats {
  margin-bottom: 30px;
}
.category-item {
  margin-bottom: 15px;
  font-size: 1.1em;
}
.bar-container {
    background-color: #e0e0e0;
    border-radius: 5px;
    margin: 4px 0 10px 0; 
    height: 20px; 
}
.bar {
    height: 100%; 
    color: white;
    text-align: center;
    line-height: 20px; 
    border-radius: 5px; 
    font-size: 0.9em;
    transition: width 0.5s ease-in-out;
}
.bar.underweight { background-color: #2196f3; }
.bar.normal { background-color: #4caf50; }
.bar.overweight { background-color: #ff9800; }
.bar.obese { background-color: #f44336; }
</style>
