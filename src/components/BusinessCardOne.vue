<template>
  <div v-if="profile">
    <div v-if="profile" class="profile-card">
      <img class="background-img" :src="profile.coverImg" alt="Background" />
      <div class="profile-info">
        <img class="profile-img" v-if="!profile.isBlankProfileImg && showProfileImg" :src="profile.profileImg"
          alt="Profile" />
      </div>
      <div class="profile-desc-container">
        <div class="profile-desc">
          <p class="profile-name">{{ profile.profileImgName }}</p>
          <p v-if="showCompany && lastCompanyName.length" class="profile-about">{{ lastCompanyName }}</p>
          <p id="job-role" class="profile-about">{{ jobRole }}</p>
        </div>
        <!--          <RenderCompanies :companies="[profile.companyImgTitle?.[0]]" :companiesHeight="companiesHeight" />-->
      </div>
    </div>
    <div class="card-settings">
      <RangeSlider v-model="widthRange" :labelDesc="'About Width:'" :minRange="30" :maxRange="100" :step="1" />
      <RangeSlider v-model="imageHeight" :labelDesc="'Profile Image Height'" :minRange="0" :maxRange="400" :step="1" />
      <RangeSlider v-model="heightRange" :labelDesc="'Companies Height'" :minRange="-50" :maxRange="50" :step="1" />
      <RangeSlider v-model="profileNameSize" :labelDesc="'Profile Name Font Size'" :minRange="0.0" :maxRange="10"
        :step="0.1" />
      <RangeSlider v-model="fontDescSize" :labelDesc="'Description Font Size'" :minRange="0.0" :maxRange="2"
        :step="0.05" />
      <RangeSlider v-model="qrCodeSize" :labelDesc="'QR Code Size'" :minRange="0" :maxRange="250" :step="1" />
      <div class="additional-info">
        <label for="info">Additional Info: </label>
        <input name="info" placeholder="Additional information" type="text" v-model="jobRole" class="user-input">
      </div>
      <div class="additional-info">
        <label for="info">Additional Info: </label>
        <input name="info" placeholder="Company Name" type="text" v-model="lastCompanyName" class="user-input">
      </div>
      <div class="watermark-container">Show Company Name:
        <input type="checkbox" v-model="showCompany" />
        <span class="checkmark"></span>
      </div>
      <div class="watermark-container">Show Profile Image:
        <input type="checkbox" v-model="showProfileImg" />
        <span class="checkmark"></span>
      </div>
      <div><a class="configs-url" target="_blank" href="https://nandle.web.app/">Access more
          projects here!</a></div>
    </div>
    <button @click="handleDownload">Download Card Front</button>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, ref, watch } from "vue";
import RenderCompanies from "@/components/RenderCompanies.vue";
import html2canvas from "html2canvas";
import QRCodeComp from "@/components/QRCodeComp.vue";
import RangeSlider from "@/components/RangeSlider.vue";
import WatermarkComponent from "@/components/WatermarkComponent.vue";
import useCardConfig from "@/composables/useCardConfig";
import userAuthState from "@/composables/userAuthState";
import downloadableName from "@/utils/textOperations";
import BusinessCardOneBack from "@/components/BussinessCardOneBack.vue";

const props = defineProps(["profile"])
const jobRole = ref('')
const lastCompanyName = ref("")
const showCompany = ref(true)
const widthRange = ref(85)
const fontDescSize = ref(1.4)
const heightRange = ref(35)
const watermark = ref(false)
const watermarkName = ref("networking-merch.com")
const showProfileImg = ref(false)
const imageHeight = ref(140);
const profileNameSize = ref(2.4)
const qrCodeSize = ref(150)

const { user } = userAuthState();
const {
  getDocumentRealtime,
  error,
  isPending,
} = useCardConfig()

onMounted(() => {
  const cardConfig = getDocumentRealtime(user.value.uid)

  watch(cardConfig, () => {
    watermarkName.value = cardConfig.value?.watermarkName;
    watermark.value = cardConfig.value?.watermarkDefault
    showProfileImg.value = cardConfig.value?.showProfileImg;
  })

  jobRole.value = props.profile.profileAbout?.trim()
  lastCompanyName.value = props.profile.companyImgTitle?.[0].name.trim()
})


const profileNameFontSize = computed(() => {
  return profileNameSize.value.toString() + "rem"
})

const descriptionSize = computed(() => {
  return fontDescSize.value.toString() + "rem"
})

const aboutWidth = computed(() => {
  return widthRange.value.toString() + "%"
})

const companiesHeight = computed(() => {
  return heightRange.value.toString() + "px"
})

const profileImageHeight = computed(() => {
  return imageHeight.value.toString() + "px"
})

function handleDownload() {
  const cardElement = document.querySelector('.profile-card');
  html2canvas(cardElement, { useCORS: true, scale: 2 })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = downloadableName(props.profile?.profileImgName);
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

  .profile-card,
  .profile-card * {
    visibility: visible;
    /* Shows only the profile card and its sub-children */
  }

  .profile-card {
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

.profile-card,
.profile-card * {
  visibility: visible;
  /* Shows only the profile card and its sub-children */
}

.profile-card {
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

.background-img {
  position: relative;
  width: auto;
  height: 225px;
  object-fit: cover;
  z-index: 1;
}

.profile-info {
  position: relative;
  display: flex;
  margin-top: -160px;
  height: 208px;
  height: v-bind('profileImageHeight');
}

.profile-img {
  position: absolute;
  display: flex;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid var(--text-color);
  left: 440px;
  margin-top: 40px;
  z-index: 3;
}

.profile-desc {
  display: flex;
  width: auto;
  flex-wrap: nowrap;
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  text-align: left;
  margin-left: 20px;
  margin-bottom: 10px;
  margin-right: 0px;
  margin-top: 25px;
  padding: 0px;
  color: black;
}

.profile-name {
  margin: 0px;
  font-weight: bold;
  font-size: x-large;
  font-size: v-bind('profileNameFontSize');
}

.profile-desc-container {
  display: flex;
  justify-content: start;
  align-items: center;
}

.profile-desc {
  width: v-bind('aboutWidth');
}

.profile-about {
  margin: 0px;
  font-size: 20px;
  font-size: v-bind('descriptionSize');
  font-weight: 500;
}

#job-role {
  color: black;
  font-size: 20px;
  font-weight: normal;
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
</style>
