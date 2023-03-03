export function useTopics() {
  /**
   * 当前话题的id
   */
  const curTopicId = useState('currentTopicId', () => 1)

  /**
   * 切换话题
   * @param id 当前话题的id
   */
  function toggle(id: number) {
    curTopicId.value = id
  }

  return {
    curTopicId,
    toggle,
  }
}
