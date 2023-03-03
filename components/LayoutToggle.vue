<script setup lang="ts">
const { toggle, layout } = useLayout()

function toggleLayout() {
  toggle(layout.value === 'home' ? 'default' : 'home')
}
</script>

<template>
  <button class="!outline-none" @click="toggleLayout">
    <slot>
      <div class="i-carbon-home" />
    </slot>
  </button>
</template>
