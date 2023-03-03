import { acceptHMRUpdate, defineStore } from 'pinia'
export const userInfo = defineStore('user', () => {
  const info = useStrapiUser<IStrapiUser>()

  function setUserInfo(info: any) {
    info.value = info
  }
  return {
    info,
    setUserInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(userInfo, import.meta.hot))
