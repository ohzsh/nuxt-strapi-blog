import type { LayoutKey } from '~~/.nuxt/types/layouts'
export function useLayout() {
  const route = useRoute()
  // route.name === all表示没有匹配到路由所以使用 pure布局
  const layout = ref(useState<LayoutKey>('layout', () => route.name === 'all' ? 'pure' : 'default'))
  /**
   * 切换布局
   * @param _layout
   */
  function toggle(_layout: LayoutKey) {
    layout.value = _layout
  }

  return {
    layout,
    toggle,
  }
}
