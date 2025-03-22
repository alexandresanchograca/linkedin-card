<template>
  <div v-if="profile">
    <div v-if="profile" class="profile-card-back">
      <QRCodeComp :qrCodeSize="qrCodeSize" />
      <div class="contact-info">
        <p class="phone-number-info">{{ phoneNumber }}</p>
        <p class="email-info">{{ emailAddress }}</p>
        <p class="address-info">{{ addressInfo }}</p>
      </div>
    </div>
    <div class="card-settings">
      <RangeSlider v-model="qrCodeSize" :labelDesc="'QR Code Size'" :minRange="0" :maxRange="350" :step="1" />
      <div class="additional-info">
        <label for="info">Phone number: </label>
        <input name="info" placeholder="your phone number" type="text" v-model="phoneNumber" class="user-input">
      </div>
      <div class="additional-info">
        <label for="info">Email: </label>
        <input name="info" placeholder="your email..." type="text" v-model="emailAddress" class="user-input">
      </div>
      <div class="additional-info">
        <label for="info">Address: </label>
        <input name="info" placeholder="your address information" type="text" v-model="addressInfo" class="user-input">
      </div>
    </div>
    <button @click="handleDownload">Download Card Back</button>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from "vue";
import QRCodeComp from "@/components/QRCodeComp.vue";
import RangeSlider from "@/components/RangeSlider.vue";
import html2canvas from "html2canvas";
import downloadableName from "@/utils/textOperations";

const props = defineProps(["profile"])

const qrCodeSize = ref(250)
const phoneNumber = ref("")
const emailAddress = ref("")
const addressInfo = ref("")

function handleDownload() {
  const cardElement = document.querySelector('.profile-card-back');
  html2canvas(cardElement, { useCORS: true, scale: 2 })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = downloadableName(`${props.profile?.profileImgName}-back`);
      link.href = imgData;
      link.click();
    })
    .catch(err => console.error('Error capturing canvas:', err));
}
</script>

<style scoped>
/* Print CSS */
@media print {
  body * {
    visibility: hidden;
    /* Hides everything by default */
  }

  .profile-card-back,
  .profile-card-back * {
    visibility: visible;
    /* Shows only the profile card and its sub-children */
  }

  .profile-card-back {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 400px;
    min-width: 700px;
    max-width: 700px;
    max-height: 400px;
    width: 700px;
    height: 400px;
    padding: 20px;
    /* Ensures no textual elements are cut at the print margins */
    font-size: 12pt;
    /* Boost text sizes for better legibility in print */
    color: black;
    /* Convert all font colors to black for better cost efficiency and print accuracy */
    box-shadow: none;
    /* Removse drop shadows as they don't print well */
    background-color: transparent !important;
    /* This can help ensure the document's background doesn't impact print */
  }

  img {
    max-width: 100% !important;
    /* Ensures large images are scaled down to fit the page width */
    height: auto !important;
    /* Makes height automatic for aspect ratio maintenance */
  }
}

.card {
  width: 900px;
}

.profile-card-back,
.profile-card-back * {
  visibility: visible;
  /* Shows only the profile card and its sub-children */
}

.profile-card-back {
  min-height: 400px;
  min-width: 700px;
  max-width: 700px;
  max-height: 400px;
  width: 700px;
  height: 400px;
  margin: auto;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  visibility: visible;
}

p {
  margin: 0px;
}

.user-input {
  width: 400px;
  margin: 10px;
}

.additional-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 1rem;
  color: var(--text-color);
}

button {
  margin-bottom: 2rem;
}

.watermark-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  margin: 0.5rem 1rem;
}

.card-settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 40px;
}

.configs-url {
  color: white;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  margin: 0.5rem 1rem;
}

.contact-info {
  position: absolute;
  display: flex;
  color: black;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  top: 150px;
  left: 400px;
  margin-right: 50px;
  align-items: flex-start;
  flex-direction: column;
}
</style>