<script setup lang="ts">
import type { Strapi4ResponseMany, Strapi4ResponseSingle } from '@nuxtjs/strapi/dist/runtime/types/v4'
const props = withDefaults(defineProps < {
  params?: { [key in string]: any }
} > (), {
  params: () => ({}),
})
const router = useRouter()
const { find } = useStrapi()
const msgParams = reactive({
  pagination: {
    page: 1,
    pageSize: 10,
  },
  populate: '*',
  sort: 'publishedAt:desc',
  ...props.params,
})
const getCardInfo = () => find<{
  /**
   * 发布时间
   */
  publishedAt: string
  /**
   * 内容
   */
  content: string
  /**
   * 发布用户
   */
  user: Strapi4ResponseSingle<{
    username: string
    avatar: string
  }>
  /**
   * 话题
   */
  topic: Strapi4ResponseSingle<{
    title: string
    desc: string
  }>
  /**
   * 图片
   */
  images: Strapi4ResponseMany<{
    url: string
  }>
}>('messages', msgParams)

const { data: res } = await useAsyncData(getCardInfo)

const getTimeAgo = (time: string) => {
  return useTimeAgo(time, {
    messages: {
      justNow: '刚刚',
      past: n => (n.match(/\d/) ? `${n}以前` : n),
      future: n => (n.match(/\d/) ? `未来 ${n}` : n),
      month: (n, past) => (n === 1 ? (past ? '上个月' : '下个月') : `${n}个月${n > 1 ? '' : ''}`),
      year: (n, past) => (n === 1 ? (past ? '去年' : '明年') : `${n}年${n > 1 ? '' : ''}`),
      day: (n, past) => (n === 1 ? (past ? '昨天' : '明天') : `${n}天${n > 1 ? '' : ''}`),
      week: (n, past) => (n === 1 ? (past ? '上一周' : '下一周') : `${n}周${n > 1 ? '' : ''}`),
      hour: n => `${n}小时${n > 1 ? '' : ''}`,
      minute: n => `${n}分钟${n > 1 ? '' : ''}`,
      second: n => `${n}秒${n > 1 ? '' : ''}`,
    },
  })
}
const isFetch = ref(false)
const { y } = useWindowScroll()
watch(y, async (scrollTop) => {
  const { clientHeight, scrollHeight } = document.documentElement
  if (!isFetch.value && scrollHeight - scrollTop <= clientHeight) {
    isFetch.value = true
    msgParams.pagination.page++
    const moreData = await getCardInfo()
    res.value?.data.push(...moreData.data)
    isFetch.value = false
  }
})

const getUser = ({ attributes }: any) => {
  return attributes?.user?.data?.attributes || attributes?.mockUser?.data?.attributes
}

const getImages = ({ attributes }: any) => {
  return attributes?.images?.data || attributes?.mockImages?.data || []
}
</script>

<template>
  <div class="w-full">
    <template v-if="res?.data?.length">
      <div v-for="item in res?.data" :key="item.id" class="bg-w dark:text-gray-100 not-first:mt-5">
        <div class="container bg-white max-w-4xl px-5 py-6 rounded-lg shadow-sm dark:bg-gray-900">
          <div class="flex items-center justify-between">
            <div>
              <a rel="noopener noreferrer" href="#" class="flex items-center">
                <img
                  v-if="getUser(item)?.avatar"
                  :src="getUser(item)?.avatar" alt="avatar"
                  class="object-cover w-10 h-10 mr-4 rounded-full dark:bg-gray-500"
                >
                <div class="flex flex-col">
                  <span class="hover:underline dark:text-gray-400">{{ getUser(item)?.username }}</span>
                  <ClientOnly>
                    <span class="text-sm dark:text-gray-400">{{ getTimeAgo(item?.attributes?.publishedAt) }}</span>
                  </ClientOnly>
                </div>
              </a>
            </div>
            <a rel="noopener noreferrer" href="#" class="px-2 py-1 font-bold rounded dark:bg-violet-400 dark:text-gray-900">
              {{ item?.attributes?.topic?.data?.attributes?.title }}
            </a>
          </div>
          <section>
            <div class="container flex flex-col justify-center py-4 px-14 mx-auto">
              <div>
                <!-- <a rel="noopener noreferrer" href="#" class="text-2xl font-bold hover:underline">Nos creasse pendere crescit angelos etc</a> -->
                <p class="mb-2">
                  {{ item?.attributes?.content }}
                </p>
              </div>
              <div
                v-if="getImages(item)?.length"
                class="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2"
              >
                <!-- <img
                  v-for="(image, index) in getImages(item)"
                  :key="index"
                  class="object-cover w-full
              dark:bg-gray-500 aspect-square"
                  :src="/^https?:/.test(image.attributes.url) ? image.attributes.url : useStrapiMedia(image.attributes.url)"
                > -->
                <PicturePreview
                  v-for="(image, index) in getImages(item)"
                  :key="index"
                  class="w-full"
                  :image-url="/^https?:/.test(image.attributes.url) ? image.attributes.url : useStrapiMedia(image.attributes.url)"
                />
              </div>
            </div>
          </section>
          <div class="flex justify-between items-center mt-4">
            <slot name="operation" :info="item">
              <div />
            </slot>
            <a rel="noopener noreferrer" href="#" class="hover:underline dark:text-violet-400">Read more</a>
          </div>
        </div>
      </div>
    </template>
    <ClientOnly>
      <section v-if="!res?.data?.length" class="flex items-center h-full p-16 pt-0 dark:text-gray-100">
        <div class="container flex flex-col items-center mx-auto justify-center px-5 my-8">
          <div class="max-w-md text-center">
            <h2 class="mb-8 font-extrabold dark:text-gray-600 flex flex-col items-center">
              <svg class="max-w-50 max-h-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1024 1024">
                <path fill="url(#paint0_linear_2804_3741)" d="M780.675 425.858H460.309C454.079 425.858 449.029 430.908 449.029 437.138V757.504C449.029 763.733 454.079 768.783 460.309 768.783H780.675C786.905 768.783 791.955 763.733 791.955 757.504V437.138C791.955 430.908 786.905 425.858 780.675 425.858Z" />
                <path fill="#D7EAFE" d="M449.038 425.858H260.135V768.783H449.038V425.858Z" />
                <path fill="#B7D2ED" d="M260.134 425.858L162 530.972H375.139L449.03 425.858H260.134Z" />
                <path fill="#D7EAFE" d="M791.962 425.862L862 532.333H519.575L449.029 425.354L791.962 425.862Z" />
                <line stroke-linecap="round" stroke-width="11.2799" stroke="#D7EAFE" y2="330.539" x2="429.897" y1="330.539" x1="365.037" />
                <line stroke-linecap="round" stroke-width="11.2799" stroke="#D7EAFE" transform="matrix(-1 0 0 1 681.415 336.179)" y2="-5.63996" x2="70.4995" y1="-5.63996" x1="5.63996" />
                <line stroke-linecap="round" stroke-width="11.2799" stroke="#D7EAFE" y2="283.343" x2="461.176" y1="237.48" x1="415.313" />
                <line stroke-linecap="round" stroke-width="11.2799" stroke="#D7EAFE" transform="matrix(0.642788 -0.766044 -0.766044 -0.642788 579.355 295.806)" y2="-5.63996" x2="70.4995" y1="-5.63996" x1="5.63996" />
                <line stroke-linecap="round" stroke-width="11.2799" stroke="#D7EAFE" y2="268.499" x2="520.136" y1="203.64" x1="520.136" />
                <defs>
                  <linearGradient id="paint0_linear_2804_3741" gradientUnits="userSpaceOnUse" y2="218.093" x2="621.427" y1="767.477" x1="621.427">
                    <stop stop-color="#B7D2ED" />
                    <stop stop-color="#9AB4CF" offset="1" />
                  </linearGradient>
                </defs>
              </svg>
            </h2>
            <p class="text-2xl font-semibold md:text-3xl">
              啊哦😯！
            </p>
            <p class=" mb-8 dark:text-gray-400">
              你还没有任何动态赶紧去发布一个吧
            </p>
            <button class="px-4 py-2 font-semibold text-sm bg-white text-black  dark:bg-violet-500 dark:text-white rounded-md shadow-sm hover:scale-125 ease-in-out duration-150" @click="router.push({ name: 'publish' })">
              去看看
            </button>
          </div>
        </div>
      </section>
    </ClientOnly>
  </div>
</template>
