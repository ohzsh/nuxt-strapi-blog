<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
const emit = defineEmits(['click'])
const { find } = useStrapi()
const { data } = await find<{
  /**
   * 话题
   */
  title: string
  /**
   * 话题简介
   */
  desc: string
}>('topics')
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center rounded-md px-8 py-3 font-semibold rounded-full bg-gray-100 dark:bg-violet-400 dark:text-gray-800"
      >
        发布
        <div class="i-carbon-caret-down ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100 dark:hover:text-gray-500 dark:text-gray-800" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-900  shadow-lg ring-1 focus:outline-none"
      >
        <div class="px-3 py-1 flex items-center text-xs">
          <div class="i-twemoji-backhand-index-pointing-down mr-4 animate-bounce" />
          <div class="text-red-400">
            发布时必须选择一个话题
          </div>
        </div>
        <div class="px-1 py-1">
          <MenuItem v-for="item in data" :key="item.id" v-slot="{ active }">
            <button
              class="group flex flex-col justify-start w-full rounded-md px-2 py-2 text-sm" :class="[
                active ? 'bg-gray-100 dark:bg-violet-400 text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white',
              ]"
              @click="emit('click', item)"
            >
              <h3 class="font-semibold tracking-wide">
                {{ item.attributes.title }}
              </h3>
              <h6 class="text-xs tracking-wide uppercase text-gray-400" :class="{ 'dark:text-white': active }">
                {{ item.attributes.desc }}
              </h6>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
