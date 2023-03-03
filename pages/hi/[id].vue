<script setup lang="ts">
const route = useRoute()
const name = route.params.id
</script>

<template>
  <div>
    <div i-twemoji:waving-hand text-4xl inline-block animate-shake-x animate-duration-5000 />
    <h3 text-2xl font-500>
      Hi,
    </h3>
    <div text-xl>
      {{ name }}!
    </div>

    <template v-if="route.params.id">
      <p text-sm my-4>
        <span op-50>Also as known as:</span>
        <ul>
          {{ route.params.id }}
        </ul>
      </p>
    </template>

    <Counter />

    <div>
      <NuxtLink
        class="btn m-3 text-sm"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
