<template>
  <div class="companies">
    <div class="company-container" v-for="company in companies" :key="company.name">
      <img
          alt="Company Logo"
          class="company-img"
          :src="company.img_url"
      />
      <div class="company-name">
        <p>{{company.name}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["companies", "companiesHeight"]);
</script>

<style scoped>
.companies {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 20px;
  margin-top: v-bind('companiesHeight');
}

.company-container{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.company-img {
  margin: 0px;
  border-radius: 50%;
  height: 60px;
  width: 60px;
}

.company-name {
  font-weight: bold;
  text-align: left;
  color: black;
  font-size: 1rem;
  padding: 0px;
  margin: 0.2rem 0.5rem;
}
</style>