<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const userInfo = useStrapiUser<IStrapiUser>()
const { logout } = useStrapiAuth()
interface IInfo {
  id: number
  icon: string
  routeName: 'home' | 'publish' | 'my' | 'setting'
  name: string
}
const dashboardList: IInfo[] = [
  {
    id: 1,
    icon: 'i-carbon-home',
    routeName: 'home',
    name: '首页',
  },
  {
    id: 2,
    icon: 'i-carbon-user',
    routeName: 'my',
    name: '我的',
  },
  {
    id: 3,
    icon: 'i-carbon-catalog-publish',
    routeName: 'publish',
    name: '发布',
  },
  {
    id: 4,
    icon: 'i-carbon-settings',
    routeName: 'setting',
    name: '设置',
  },
]
</script>

<template>
  <div class="">
    <div class="sticky top-92px p-3 space-y-2 w-60 bg-white dark:bg-gray-900 dark:text-gray-100">
      <div v-if="userInfo?.username" class="flex items-center p-2 space-x-4">
        <img alt="" class="w-12 h-12 rounded-full ring-2 ring-offset-4 bg-gray-100 dark:ring-offset-gray-800 dark:bg-gray-500 dark:ring-violet-500" :src="userInfo?.avatar">
        <div>
          <h2 class="text-lg font-semibold">
            {{ userInfo?.username }}
          </h2>
          <span class="flex items-center space-x-1">
            <a rel="noopener noreferrer" href="#" class="text-xs hover:underline dark:text-gray-400">
              {{ userInfo?.email }}
            </a>
          </span>
        </div>
      </div>
      <div class="divide-y divide-gray-700">
        <ul v-if="userInfo?.username" class="pt-2 pb-4 space-y-1 text-sm">
          <li
            v-for="item in dashboardList" :key="item.id"
            class="dark:text-gray-50 flex items-center p-2 space-x-3 rounded-md cursor-pointer"
            :class="{ 'bg-gray-100 dark:bg-gray-800': item.routeName === route.name }"
            @click="router.push({
              name: item.routeName,
            })"
          >
            <div :class="item.icon" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <ul class="pt-4 pb-2 space-y-1 text-sm">
          <li v-if="userInfo?.username" @click="logout()">
            <a rel="noopener noreferrer" href="#" class="flex items-center p-2 space-x-3 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                class="w-5 h-5 fill-current dark:text-gray-400"
              >
                <path
                  d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"
                />
                <rect width="32" height="64" x="256" y="232" />
              </svg>
              <span>退出</span>
            </a>
          </li>
          <template v-else>
            <li>
              <a rel="noopener noreferrer" href="#" class="flex items-center p-2 space-x-3 rounded-md">
                <div class="i-carbon-login" />
                <Login type="login" />
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#" class="flex items-center p-2 space-x-3 rounded-md">
                <div class="i-carbon-user-follow" />
                <Login type="register" />
              </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
