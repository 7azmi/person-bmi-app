<template>
  <div class="bmi-chart-stats">
    <h3>BMI Distribution Chart</h3>
    <div v-if="!persons || persons.length === 0" class="no-data-message">
      <p>No person data available to generate the chart.</p>
    </div>
    <canvas ref="bmiChartCanvas" id="bmiChartCanvas"></canvas>
    <p v-if="chartError" class="error-message">{{ chartError }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import Chart from "chart.js/auto"; 

// defineProps is a compiler macro
const props = defineProps({
  persons: {
    type: Array,
    required: true,
    default: () => []
  }
}); // <-- MAKE SURE THIS CLOSING ); IS HERE

const bmiChartCanvas = ref(null); 
let chartInstance = null; 
const chartError = ref(null);

const getBmiCategory = (bmiValue) => { 
  const bmi = parseFloat(bmiValue);
  if (bmi < 18.5) return "Underweight"; 
  if (bmi < 24.9) return "Normal";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
};

const prepareChartData = () => {
  const categoryCounts = {
    Underweight: 0,
    Normal: 0,
    Overweight: 0,
    Obese: 0
  };

  if (!props.persons || props.persons.length === 0) {
    return null; 
  }

  props.persons.forEach(person => {
    if (person.bmi) {
      const category = getBmiCategory(person.bmi);
      // Use Object.prototype.hasOwnProperty.call for safety
      if (Object.prototype.hasOwnProperty.call(categoryCounts, category)) {
        categoryCounts[category]++;
      }
    }
  });

  return {
    labels: Object.keys(categoryCounts),
    datasets: [{
      label: "BMI Categories",
      data: Object.values(categoryCounts),
      backgroundColor: [
        "#2196f3", 
        "#4caf50", 
        "#ff9800", 
        "#f44336"  
      ],
      hoverOffset: 4
    }]
  };
};

const renderChart = async () => {
  await nextTick(); 

  if (chartInstance) {
    chartInstance.destroy(); 
  }

  if (bmiChartCanvas.value && props.persons.length > 0) {
    chartError.value = null;
    const chartData = prepareChartData();
    if (!chartData) {
      return;
    }

    try {
      chartInstance = new Chart(bmiChartCanvas.value, {
        type: "pie", 
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: true, 
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Distribution of BMI Categories"
            }
          }
        }
      });
    } catch (e) {
      console.error("Chart.js rendering error:", e);
      chartError.value = "Failed to render chart.";
    }
  } else if (props.persons.length === 0 && bmiChartCanvas.value) {
    const ctx = bmiChartCanvas.value.getContext("2d");
    ctx.clearRect(0, 0, bmiChartCanvas.value.width, bmiChartCanvas.value.height);
    if (chartInstance) { // Check if chartInstance exists before destroying
        chartInstance.destroy(); 
        chartInstance = null; // Set to null after destroying
    }
  }
};

onMounted(() => {
  renderChart();
});

watch(() => props.persons, () => {
  renderChart();
}, { deep: true }); 

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy(); 
  }
});
</script> <!-- // <-- MAKE SURE THIS CLOSING SCRIPT TAG IS HERE -->

<style scoped>
.bmi-chart-stats {
  margin-top: 20px;
}
#bmiChartCanvas { 
  max-height: 400px; 
}
.no-data-message, .error-message {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #777;
}
.error-message {
  color: red;
}
</style>
