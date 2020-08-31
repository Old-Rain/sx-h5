// cordova
import { auth, iOSScroll } from '../cordova'
import { Code } from '../cordova/types'

// api
import { userInfo } from '@/api/login'
import { UserInfoIn } from '@/api/login/types'

// store
import store from '@/store'
import { USER } from '@/store/modules/user/actionTypes'
import { UserInfo } from '@/store/modules/user/types'

/**
 * 鉴权流程
 * cordova为异步加载，轮询是否加载完成
 * 然后通过auth从容器app获取code
 * 再通过code从该项目的后端获取用户信息
 *
 * 任何一步失败，都会导致鉴权失败
 */

// 鉴权失败
function authFail() {
  // let timer: NodeJS.Timeout | null = setTimeout(() => {
  //   clearTimeout(Number(timer))
  // timer = null

  store.dispatch({
    type: USER.UPDATE_AUTH_STATUS,
    value: -1,
  })
  // }, 2000)
}

// 鉴权成功
function authPass(value: UserInfo) {
  // let timer: NodeJS.Timeout | null = setTimeout(() => {
  //   clearTimeout(Number(timer))
  //   timer = null

  store.dispatch({
    type: USER.UPDATE_AUTH_STATUS,
    value: 1,
  })
  store.dispatch({
    type: USER.UPDATE_USER_INFO,
    value,
  })
  // }, 2000)
}

// 异步加载cordova计数器
let appLoginCount = 0
export let appLoginTimer: NodeJS.Timeout | null = null
export function appLogin() {
  // 轮询cordova
  if (!window.cordova || !window.cordova.exec) {
    appLoginCount++

    appLoginTimer = setTimeout(() => {
      clearTimeout(Number(appLoginTimer))
      console.log(`尝试加载cordova_${appLoginCount}次`)
      appLogin()
    }, 100)

    return
  }

  // 10秒加载不出来鉴权失败
  if (appLoginCount >= 200) {
    console.log('cordova加载失败')

    appLoginTimer = null
    authFail()

    return
  }

  console.log('cordova加载成功')
  appLoginTimer = null

  // 开启iOS滚动视图
  iOSScroll()

  // 加载成功，调用cordova登录鉴权
  advanceCode()
}

// 加强版获取code
let advanceCodeCount = 0
function advanceCode() {
  auth()
    // 获取code成功通过code调用用户信息
    .then((res) => {
      console.log('获取code成功', res)

      let params = res
      if (typeof params === 'string') {
        params = JSON.stringify(params)
      }

      advanceUserInfo(params as Code)
    })

    // 获取code失败超过10次，鉴权失败；否则继续尝试鉴权
    .catch(() => {
      advanceCodeCount++
      console.log(`获取code失败__${advanceCodeCount}次`)

      if (advanceCodeCount >= 1) {
        console.log(`放弃获取code`)

        authFail()
      } else {
        advanceCode()
      }
    })
}

// 加强版获取用户信息
let advanceUserInfoCount = 0
function advanceUserInfo(data: UserInfoIn) {
  userInfo<UserInfo>(data)
    .then(({ data }) => {
      console.log('获取用户信息成功', data)

      authPass(data.data)
    })
    .catch((err) => {
      advanceUserInfoCount++
      console.log(`获取用户信息失败__${advanceUserInfoCount}次`)

      if (advanceUserInfoCount >= 10) {
        console.log(`放弃获取用户信息`)

        authFail()
      } else {
        advanceUserInfo(data)
      }
    })
}
