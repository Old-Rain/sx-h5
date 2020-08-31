import request from '@/utils/request'
import { Res } from '@/api/types'

let baseURL = 'http://localhost:3001'

export function selectEmpIndexDetail<T>() {
  return request<Res<T>>({
    url: `${baseURL}/mock/hdgl/selectEmpIndexDetail.json`,
    method: 'GET',
    data: {},
  })
}