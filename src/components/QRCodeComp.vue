<template>
  <div id="qr-img" ref="qrCodeRef" draggable="true" @dragstart="dragStarted" @dragend="droppedQr">
    <qrcode-vue :value="profileUrl" :size="qrCodeSize" level="H" />
  </div>
</template>

<script setup>
import QrcodeVue from "qrcode.vue";
import getActiveTabUrl from "../utils/getActiveTabUrl.js";
import { ref } from "vue";

const profileUrl = ref("");
const qrCodeRef = ref(null);
const topHeight = ref("55px");
const rightWidth = ref("390px");

const props = defineProps(["qrCodeSize"])

const activeTabUrl = getActiveTabUrl().then((pUrl) => { profileUrl.value = pUrl; })

let dragStartX = 0
let dragStartY = 0

function dragStarted(event) {
  console.log("Event: ", event)
  dragStartX = event.clientX;
  dragStartY = event.clientY;
}

function droppedQr(event) {
  const deltaX = event.clientX - dragStartX;
  const deltaY = event.clientY - dragStartY;

  const currentRight = parseInt(rightWidth.value)
  const currentTop = parseInt(topHeight.value);

  rightWidth.value = `${currentRight - deltaX}px`;
  topHeight.value = `${currentTop + deltaY}px`;
}
</script>

<style scoped>
#qr-img {
  position: absolute;
  top: v-bind('topHeight');
  right: v-bind('rightWidth');
  padding: 20px;
  z-index: 2;
  cursor: move;
}
</style>