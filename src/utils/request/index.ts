import axios from 'axios'

const request = axios.create({
  timeout: 60000,
})

// 请求拦截
request.interceptors.request.use(
  (value) => {
    return value
  },
  (error) => {
    return
  },
)

// 响应拦截
request.interceptors.response.use(
  (value) => {
    return value.data
  },
  (error) => {
    return
  },
)

export default request
