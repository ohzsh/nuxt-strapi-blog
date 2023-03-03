<script lang="ts" setup>
const props = defineProps({
  options: {
    type: Object as () => {
      text: string
      type?: 'info' | 'success' | 'warning' | 'error'
      duration?: number
      closable?: boolean
    },
    required: true,
  },
})
const emit = defineEmits(['close'])
const { text, type = 'info', closable = false } = props.options
const icons = {
  success: 'i-carbon-checkmark-outline',
  error: 'i-carbon-error',
  info: 'i-carbon-information',
  warning: 'i-carbon-undefined',
}
</script>

<template>
  <div class="fixed z-9999 top-7 left-2/4 rounded translate-x--2/4">
    <div class="animate-bounce-in-down cursor-pointer overflow-hidden shadow-lg">
      <div class="flex items-center overflow-hidden max-w-xl relative bg-white dark:bg-gray-900 dark:text-gray-100">
        <div class="self-stretch flex items-center px-3 flex-shrink-0 dark:bg-gray-700 dark:text-violet-400">
          <div :class="icons[type]" />
        </div>
        <div class="p-4 flex-1 min-w-300px">
          <h3 class="text-xl font-bold">
            {{ type?.replace(/^\w/, (c) => c?.toUpperCase()) }}
          </h3>
          <p class="text-sm dark:text-gray-400">
            {{ text }}
          </p>
        </div>
        <button v-if="closable" class="absolute top-2 right-2" @click="emit('close')">
          <div i-carbon-close-filled />
        </button>
      </div>
    </div>
  </div>
</template>
