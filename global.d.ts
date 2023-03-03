interface IStrapiUser {
  id: number
  username?: string
  email?: string
  provider?: string
  confirmed?: boolean
  blocked?: boolean
  createdAt?: string
  updatedAt?: string
  /**
   * 个人简介
   */
  description: string
  /**
   * 头像
   */
  avatar: string,
}