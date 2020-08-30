import request from '@/utils/request'
import { Res } from '@/api/types'

let baseURL = 'http://localhost:3001'

export function selectEmpIndexDetail() {
  return request<Res>({
    url: `${baseURL}/mock/hdgl/selectEmpIndexDetail.json`,
    method: 'GET',
    data: {},
  })
}