<script setup lang="ts">
const { files, open, reset } = useFileDialog({
  accept: '.jpg,.jpeg,.png,.gif',
})
const { create } = useStrapi()
const router = useRouter()
const userInfo = useStrapiUser()
const form = reactive({
  content: '',
  topic: null,
  images: [],
  user: userInfo.value?.id,
})
const handlePublish = async ({ id }: any) => {
  if (files.value?.length) { // 有上传图片
    const uploadRes = await upload(files.value)
    if (!uploadRes?.length)
      return
    form.images = uploadRes.map(({ id }: { id: number }) => id)
  }
  form.topic = id
  const res = await create('messages', form)
  if (!res?.data?.id)
    return useMessage().error('发布失败，请稍后重试！')
  form.content = ''
  reset()
  router.push({
    name: 'home',
  })
}
</script>

<template>
  <div class="p-5 bg-white dark:bg-gray-900 h-full w-full">
    <div class="relative mb-3" data-te-input-wrapper-init>
      <textarea
        id="exampleFormControlTextarea" v-model="form.content"
        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        rows="9" placeholder="请开始你的表演"
      />
      <label
        for="exampleFormControlTextarea1"
        class="pointer-events-none absolute top--2 left-3 mb-0
          max-w-[90%] origin-[0_0] truncate pt-2 leading-[1.6]
        text-neutral-500 transition-all duration-200 ease-out
          peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8]
          peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem]
          peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none
        dark:text-violet-400 dark:peer-focus:text-violet-400"
        :class="{ '-translate-y-[0.9rem] scale-[0.8]': form.content }"
      >
        <div class="flex">
          <div class="i-twemoji-feather relative bottom--1 mr-3" />
          <div>你想说些什么?</div>
        </div>
      </label>
    </div>
    <!-- images -->
    <section v-if="files?.length" class="dark:bg-gray-800 mb-5">
      <div class="container flex flex-col justify-center p-4 mx-auto">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
          <img
            v-for="file in files"
            :key="file.size"
            class="object-cover w-full
          dark:bg-gray-500 aspect-square"
            :src="useShowImgUrl(file)"
          >
        </div>
      </div>
    </section>
    <div class="flex justify-between">
      <div class="flex items-center dark:text-violet-500 cursor-pointer hover:dark:text-violet-400" @click="open()">
        <div class="i-twemoji-framed-picture mr-2" />
        <div>选择图片</div>
      </div>
      <PublishBtn @click="handlePublish" />
    </div>
  </div>
</template>
