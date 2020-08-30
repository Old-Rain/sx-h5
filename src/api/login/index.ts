import request from '@/utils/request'
import { Res } from '@/api/types'
import { UserInfoParams } from './types'

let baseURL = 'http://localhost:3001'

export function userInfo(data: UserInfoParams) {
  return request<Res>({
    url: `${baseURL}/mock/login/login.json`,
    method: 'GET',
    data,
  })
}

export function keepToken() {
  return request<Res>({
    url: `${baseURL}/mock/login/keepToken.json`,
    method: 'GET',
    data: {},
  })
}
