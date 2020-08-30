import axios from 'axios'
import store from '@/store'

import { keep } from '@/utils/cordova'
import { keepToken } from '@/api/login'

import { Toast } from 'antd-mobile'

const API = axios.create({
  timeout: 20000,
})

// 无操作每15分钟内请求一次保活接口
let keepTimer: NodeJS.Timeout | null = null
function H5keepToken() {
  clearTimeout(Number(keepTimer))
  keepTimer = setTimeout(keepToken, 1000 * 60 * 14)
}

// 请求拦截
API.interceptors.request.use(
  (value) => {
    const { token } = store.getState().userModule.userInfo
    value.headers.Authorization = token || null

    keep && keep() // app保活
    H5keepToken() // h5保活

    return value
  },
  (error) => {
    return
  },
)

// 响应拦截
API.interceptors.response.use(
  (value) => {
    return value
  },
  (error) => {
    Toast.info('未知错误', 1)

    return
  },
)

export default API.request
