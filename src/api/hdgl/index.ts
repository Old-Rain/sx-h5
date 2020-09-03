import request from '@/utils/request'
import { Res } from '@/api/types'
import { GetClientOrBitInfo } from './types'

let baseURL = 'http://localhost:3001'

// 获取指标概览
export function selectEmpIndexDetail<T>() {
  return request<Res<T>>({
    url: `${baseURL}/mock/hdgl/selectEmpIndexDetail.json`,
    method: 'GET',
    data: {},
  })
}

// 获取客户次数
export function getClient<T>(data: GetClientOrBitInfo) {
  return request<Res<T>>({
    url: `${baseURL}/mock/hdgl/getClient.json`,
    method: 'GET',
    data,
  })
}

// 获取客户时间
export function getBitInfo<T>(data: GetClientOrBitInfo) {
  return request<Res<T>>({
    url: `${baseURL}/mock/hdgl/getBitInfo.json`,
    method: 'GET',
    data,
  })
}
