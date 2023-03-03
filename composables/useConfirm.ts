import { createApp, h } from 'vue'
import Confirm from '../components/Confirm.vue'

interface ConfirmOptions {
  title?: string
  desc: string
}
export const confirms = shallowReactive<Record<symbol, any>>({})

const useConfirm = async (desc: string, options?: ConfirmOptions) => {
  // eslint-disable-next-line symbol-description
  const CONFIRM_ID = Symbol()
  return new Promise((resolve, reject) => {
    const messageInstance = createApp({
      render() {
        return h(Confirm, {
          desc,
          ...options,
          resolve,
          reject,
          onClose: () => {
            confirms[CONFIRM_ID]?.()
            delete confirms[CONFIRM_ID]
          },
        })
      },
    })
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    const component = messageInstance.mount(mountNode)
    const close = () => {
      messageInstance.unmount()
      mountNode.remove()
      component.$el.remove()
    }
    // 保存引用到外部给内部回调用
    confirms[CONFIRM_ID] = close
  })
}

export default useConfirm
