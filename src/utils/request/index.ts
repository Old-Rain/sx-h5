import axios from 'axios'

const API = axios.create({
  timeout: 20000,
})

// 请求拦截
API.interceptors.request.use(
  (value) => {
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
    return
  },
)

export default API.request
