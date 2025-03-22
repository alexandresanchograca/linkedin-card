<template>
  <div class="range-slider">
    <label for="range">{{ labelDesc }}</label>
    <input name="range" v-model="rangeModel" type="range" :min="minRange" :max="maxRange" :step="step">
    <div class="value">{{ rangeModel }}</div>
  </div>
</template>

<script setup>
const rangeModel = defineModel();
const props = defineProps(["labelDesc", "minRange", "maxRange", "step"])
</script>

<style scoped>
.range-slider {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 1rem;
  color: var(--text-color);
  width: 80%;
}
input{
  flex-grow: 1;
}
label{
  color: inherit;
}
.value {
  color: inherit;
}
</style>