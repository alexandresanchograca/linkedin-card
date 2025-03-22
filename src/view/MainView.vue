<template>
  <div class="main_app">
    <a class="welcome-alt" target="_blank" href="https://nandle.web.app/">
      <h1 class="welcome-message">Business Card Creator</h1>
    </a>
    <a class="welcome-alt" target="_blank" href="https://nandle.web.app/">
      <img class="nandle-logo" :src="require('@/assets/nandle-logo.png')" />
    </a>
    <div class="main-container" v-if="user">
      <button class="generate-btn" @click="handleClick">Generate Card</button>
      <div v-if="error" class="error">{{ error }}</div>
      <BusinessCardOne v-else-if="profileRef" :profile="profileRef" />
      <BusinessCardOneBack v-if="profileRef" :profile="profileRef" />
    </div>
  </div>
</template>

<script setup>
import useCardConfig from "@/composables/useCardConfig";
import userAuthState from "@/composables/userAuthState";
import userHasAccess from "@/utils/userAcess";
import { onMounted, ref, watch } from "vue";
import BusinessCardOne from "../components/BusinessCardOne.vue";
import BusinessCardOneBack from "../components/BussinessCardOneBack.vue";
import getActiveDoc from "../utils/getActiveDoc.js";
import Profile from "../utils/Profile.js";

const { user } = userAuthState();
const profileRef = ref(null);
const validSubscription = ref(true)
const error = ref(null);

const {
  getDocumentRealtime,
  error: cardError,
  isPending,
} = useCardConfig("card-customers")

onMounted(() => {
  const userData = getDocumentRealtime(user.value.uid)

  watch(userData, () => {
    validSubscription.value = userHasAccess(userData.value)
  })
})

const handleClick = async () => {
  const doc = await getActiveDoc();

  const profile = new Profile(doc);

  try {
    await profile.scrape(user);
    console.log(profile)
  } catch (err) {
    error.value = err.message;
  }

  console.log(profile);
  profileRef.value = profile;
};
</script>

<style>
:root {
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}

.main_app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
    --text-color: #000000;
  }

  a:hover {
    color: #747bff;
  }

  button {
    background-color: #f9f9f9;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #ffffff;
  }
}

.welcome-message {
  color: var(--text-color);
}

.generate-btn {
  margin: 20px;
}

.error {
  background-color: darkred;
  font-weight: bold;
  color: var(--text-color);
  border: 8px solid darkred;
}

.nandle-logo {
  max-width: 50px;
  max-height: 50px;
}
</style>
