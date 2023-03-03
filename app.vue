<script setup lang="ts">
import { appName } from '~/constants'
useHead({
  title: appName,
})
const { layout } = useLayout()
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}
html.light {
  background: #F4F5F5;
  color: #222;
}
html.dark {
  background: #222;
  color: white;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}

.rotate-home-enter-active,
.rotate-home-leave-active {
  transition: all 0.4s;
}
.rotate-home-enter-from,
.rotate-home-leave-to {
  opacity: 0;
  transform: rotate3d(1, 0, 0, 90deg);
}
</style>
