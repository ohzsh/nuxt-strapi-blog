import { createApp, h } from 'vue'
import Message from '../components/Message.vue'

interface MessageOptions {
  text?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  description?: string
  duration?: number
  closable?: boolean
  closableCb?: () => void
}
export const messages = shallowReactive<Record<symbol, any>>({})

const createMessage = (options: MessageOptions) => {
  // eslint-disable-next-line symbol-description
  const MSG_ID = Symbol()
  const messageInstance = createApp({
    render() {
      return h(Message, {
        options,
        onClose: () => {
          messages[MSG_ID]?.()
          delete messages[MSG_ID]
          options?.closableCb?.()
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
  messages[MSG_ID] = close
  // 如果存在关闭按钮只能手动点击关闭
  if (!options.closable) {
    setTimeout(() => {
      close()
    }, options.duration || 5000)
  }

  return {
    close,
  }
}

export const message = {
  info(text: string, options?: MessageOptions) {
    createMessage({ text, type: 'info', ...options })
  },
  success(text: string, options?: MessageOptions) {
    createMessage({ text, type: 'success', ...options })
  },
  warning(text: string, options?: MessageOptions) {
    createMessage({ text, type: 'warning', ...options })
  },
  error(text: string, options?: MessageOptions) {
    createMessage({ text, type: 'error', ...options })
  },
}

const useMessage = () => message

export default useMessage
