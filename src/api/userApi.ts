/**
 * axios 的 index.ts 使用示例
 * import { getUserInfo } from '@/pages/api/userApi'
 */
import api from '@/api/index'

// 获取当前登录用户的信息
const getUserInfo = (params = {}): Promise<any> => {
  return api.get('/user/info', params)
}

export {
  getUserInfo
}
