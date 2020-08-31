import request from '@/utils/request'
import { Res } from '@/api/types'
import { UserInfoIn } from './types'

let baseURL = 'http://localhost:3001'

export function userInfo<T>(data: UserInfoIn) {
  return request<Res<T>>({
    url: `${baseURL}/mock/login/login.json`,
    method: 'GET',
    data,
  })
}

export function keepToken<T>() {
  return request<Res<T>>({
    url: `${baseURL}/mock/login/keepToken.json`,
    method: 'GET',
    data: {},
  })
}
