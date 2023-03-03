<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: true,
  },
  resolve: Function,
  reject: Function,
})

const emit = defineEmits(['close'])
const closeModal = () => emit('close')

const cancel = () => {
  props?.reject?.('cancel')
  closeModal()
}
const confirm = () => {
  props?.resolve?.('confirm')
  closeModal()
}
</script>

<template>
  <TransitionRoot appear :show="true" as="template">
    <Dialog as="div" class="relative z-10" @close="cancel">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0  bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full transform overflow-hidden flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white dark:bg-gray-900 dark:text-gray-100 transition-all"
            >
              <DialogTitle
                as="h2"
                class="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 fill-current shrink-0 dark:text-violet-400">
                  <path d="M451.671,348.569,408,267.945V184c0-83.813-68.187-152-152-152S104,100.187,104,184v83.945L60.329,348.568A24,24,0,0,0,81.432,384h86.944c-.241,2.636-.376,5.3-.376,8a88,88,0,0,0,176,0c0-2.7-.135-5.364-.376-8h86.944a24,24,0,0,0,21.1-35.431ZM312,392a56,56,0,1,1-111.418-8H311.418A55.85,55.85,0,0,1,312,392ZM94.863,352,136,276.055V184a120,120,0,0,1,240,0v92.055L417.137,352Z" />
                  <rect width="32" height="136" x="240" y="112" />
                  <rect width="32" height="32" x="240" y="280" />
                </svg>
                {{ title || '提示' }}
              </DialogTitle>
              <div class="mt-2">
                <p class="flex-1 dark:text-gray-400">
                  {{ desc }}
                </p>
              </div>

              <div class="mt-4">
                <div class="flex flex-col justify-end gap-3 sm:flex-row">
                  <button class="px-6 py-2 rounded-sm" @click="cancel">
                    取消
                  </button>
                  <button class="px-6 py-2 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900" @click="confirm">
                    确认
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
