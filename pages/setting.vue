<script setup lang="ts">
const client = useStrapiClient()
const userInfo = useStrapiUser<IStrapiUser>()
const form = reactive({
  username: userInfo.value?.username,
  email: userInfo.value?.email,
  avatar: userInfo.value?.avatar,
  description: userInfo.value?.description,
})

/**
 * 修改头像
 */
const { files, open, reset } = useFileDialog({
  accept: '.jpg,.jpeg,.png,.gif',
  multiple: false,
})

const { error, success } = useMessage()
const onSubmit = async () => {
  // 上传头像
  if (files.value?.length) {
    const [avatarErr, [avatarRes]] = await to(upload(files.value))
    if (avatarErr)
      return error('头像上传失败！')
    form.avatar = useStrapiMedia(avatarRes?.url)
  }

  // 更新信息
  const [err] = await to<typeof userInfo>(client(`/users/${userInfo.value?.id}`, { method: 'PUT', body: form }))
  if (err)
    return error(err.error.name)
  success('修改成功！', {
    closable: true,
  })
  Object.assign(userInfo.value, form)
}
</script>

<template>
  <section class="p-6 bg-white dark:bg-gray-800 dark:text-gray-50">
    <form class="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
      <fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
        <div class="space-y-2 col-span-full lg:col-span-1">
          <p class="font-medium">
            Profile
          </p>
          <div class="flex items-center">
            <p class="text-xs mr-4">
              设置你的个人信息!
            </p>
            <div i-twemoji-astronaut />
          </div>
        </div>
        <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <label for="username" class="text-sm">用户名</label>
            <input v-model="form.username" type="text" placeholder="Username" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900">
          </div>
          <div class="col-span-full sm:col-span-3">
            <label for="website" class="text-sm">邮箱📮</label>
            <input v-model="form.email" type="text" placeholder="test@qq.com" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900">
          </div>
          <div class="col-span-full">
            <label for="bio" class="text-sm">TODO</label>
            <textarea v-model="form.description" placeholder="介绍一下你自己" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
          </div>
          <div class="col-span-full">
            <label for="bio" class="text-sm">头像</label>
            <div class="flex items-center space-x-2 justify-between">
              <div class="cursor-pointer" @click="() => (reset(), open())">
                <img v-if="files?.[0]" alt="" class="w-12 h-12 mt-4 rounded-full ring-2 ring-offset-4 bg-gray-100 dark:ring-offset-gray-800 dark:bg-gray-500 dark:ring-violet-500" :src="useShowImgUrl(files?.[0])">
                <img v-else alt="" class="w-12 h-12 mt-4 rounded-full ring-2 ring-offset-4 bg-gray-100 dark:ring-offset-gray-800 dark:bg-gray-500 dark:ring-violet-500" :src="form.avatar">
              </div>
              <button type="button" class="px-4 py-2 border rounded-md dark:border-gray-100" @click="onSubmit()">
                更新
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </section>
</template>
