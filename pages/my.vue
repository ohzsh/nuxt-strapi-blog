<script setup lang="ts">
const userInfo = useStrapiUser<IStrapiUser>()
const params = {
  filters: {
    $and: [
      {
        user: {
          id: {
            $eq: userInfo.value?.id,
          },
        },
      },
    ],
  },
}

const handleDelete = async ({ id }: { id: number }) => {
  const [err] = await to(useConfirm('确认要删除这个内容吗？'))
  if (err)
    return
  const [delErr] = await to(useStrapi().delete('messages', id))
  if (delErr)
    return
  useMessage().success('删除成功！')
}
</script>

<template>
  <Card
    :params="params"
  >
    <template #operation="{ info }">
      <div class="cursor-pointer ml-8 rounded-md bg-red-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-red-500" @click="handleDelete(info)">
        删除
      </div>
    </template>
  </Card>
</template>
