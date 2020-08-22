// 登录鉴权
export function auth() {
  return new Promise((resolve, reject) => {
    window.cordova.exec(
      (res) => {
        resolve(res)
      },
      (err) => {
        reject(err)
      },
      'userInfo',
      'auth',
      [],
    )
  })
}

// 心跳保活
export function keep() {
  cordova.exec(
    (res) => {
      console.log(res)
      console.log('心跳保活成功')
    },
    (err) => {
      console.log(err)
      console.log('心跳保活失败')
    },
    'userInfo',
    'keep',
    [],
  )
}

// 开启滚动视图
export function iOSScroll() {
  cordova.exec(
    (res) => {
      console.log(res)
      console.log('开启滚动视图成功')
    },
    (err) => {
      console.log(err)
      console.log('开启滚动视图失败')
    },
    'layout',
    'scroll',
    [],
  )
}
