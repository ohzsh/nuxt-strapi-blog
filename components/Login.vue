<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
withDefaults(defineProps<{
  type: TYPE
}>(), {
  type: 'login',
})
enum allType {
  login = '登录',
  register = '注册',
}
type TYPE = keyof typeof allType

const { login, register } = useStrapiAuth()
const isOpen = ref(false)
function setIsOpen(value: boolean) {
  isOpen.value = value
}
const avtiveList: { [key in TYPE]: (data: any) => Promise<any> } = {
  login,
  register,
}
const form = reactive({
  login: {
    identifier: '',
    password: '',
  },
  register: {
    username: '',
    email: '',
    password: '',
  },
})
const tipMsg = ref('')
const handleActive = async (name: TYPE, params: any) => avtiveList[name](params)
const handleSubmit = async (name: TYPE) => {
  const { error } = await useAsyncData(() => handleActive(name, form[name]))
  const errMsg = error.value?.error?.message
  if (errMsg)
    return (tipMsg.value = errMsg)
  setIsOpen(false)
}
</script>

<template>
  <div @click="setIsOpen(true)">
    <slot>
      {{ allType[type] }}
    </slot>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="setIsOpen(false)">
      <TransitionChild
        as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
                <div class="mb-8 text-center">
                  <h1 class="my-3 text-4xl font-bold">
                    {{ allType[type] }}
                  </h1>
                  <p v-if="tipMsg" class="text-sm text-red-600">
                    {{ tipMsg }}
                  </p>
                </div>
                <form
                  action="" class="space-y-12 ng-untouched ng-pristine ng-valid"
                  data-bitwarden-watching="1"
                >
                  <div class="space-y-4">
                    <div>
                      <label for="email" class="block mb-2 text-sm">Email address</label>
                      <input
                        id="email" v-model="form[type][type === 'login' ? 'identifier' : 'email']" type="email" name="email"
                        placeholder="test@qq.com"
                        class="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      >
                    </div>
                    <div>
                      <div class="flex justify-between mb-2">
                        <label for="password" class="text-sm">Password</label>
                        <a rel="noopener noreferrer" href="#" class="text-xs hover:underline dark:text-gray-400">忘记密码?</a>
                      </div>
                      <input
                        id="password" v-model="form[type].password" type="password" name="password"
                        placeholder="*****"
                        class="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      >
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div>
                      <button
                        type="button"
                        class="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
                        @click="handleSubmit(type)"
                      >
                        {{ allType[type] }}
                      </button>
                    </div>
                    <p class="px-6 text-sm text-center dark:text-gray-400">
                      还没有账户去？
                      <a rel="noopener noreferrer" href="#" class="hover:underline dark:text-violet-400">去注册</a>.
                    </p>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
