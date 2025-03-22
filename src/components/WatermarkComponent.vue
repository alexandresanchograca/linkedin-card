<template>
  <div class="watermark">
    <slot />
  </div>
</template>

<style scoped>
.watermark {
  position: absolute;
  top: 10px;
  right: 40px;
  z-index: 500;
  font-weight: bold;
  font-size: small;
  color: white;
  background-color: #0000007a;
  border-radius: 1rem;
  padding: 0.5rem 0.8rem;
}
</style>

<script setup>

</script>