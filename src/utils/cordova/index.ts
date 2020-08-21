// 登录鉴权
export function auth() {
  window.cordova.exec(
    (res) => {
      console.log(JSON.parse(res))
    },
    (err) => {
      console.log(err)
    },
    'userInfo',
    'auth',
    [],
  )
}

// 心跳保活
export function keep() {
  cordova.exec(
    (res) => {
      console.log(JSON.parse(res))
    },
    (err) => {
      console.log(err)
    },
    'userInfo',
    'auth',
    [],
  )
}
