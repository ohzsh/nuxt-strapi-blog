<script setup lang="ts">
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
})
const showModal = ref(false)

function previewImage() {
  showModal.value = true
}

function closePreview() {
  showModal.value = false
}
</script>

<template>
  <div class="image-preview">
    <img :src="imageUrl" @click="previewImage">
    <div v-show="showModal" class="modal" @click.self="closePreview">
      <div class="i-carbon-close-filled bg-white w-60px h-60px cursor-pointer absolute right-40px top-40px" @click.self="closePreview" />
      <img
        class="object-contain w-full aspect-square" :src="imageUrl"
      >
    </div>
  </div>
</template>

<style scoped>
.image-preview {
  position: relative;
  display: inline-block;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal img {
  max-width: 70%;
  max-height: 90%;
}
</style>
