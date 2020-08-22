import { auth, iOSScroll } from '../cordova'
import store from '@/store'
import { USER } from '@/store/modules/user/actionTypes'

// 异步加载cordova计数器
let appLoginCount = 0
export function appLogin() {
  // 轮询cordova
  if (!window.cordova || !window.cordova.exec) {
    appLoginCount++

    setTimeout(() => {
      console.log(`尝试加载cordova_${appLoginCount}次`)
      appLogin()
    }, 100)

    return
  }

  // 10秒加载不出来鉴权失败
  if (appLoginCount >= 100) {
    console.log('cordova加载失败')

    store.dispatch({
      type: USER.UPDATE_AUTH_STATUS,
      value: '-1',
    })

    return
  }

  // 开启iOS滚动视图
  iOSScroll()

  // 加载成功，调用cordova登录鉴权
  auth()
    .then((res) => {
      console.log(res)
      store.dispatch({
        type: USER.UPDATE_AUTH_STATUS,
        value: '1',
      })
      store.dispatch({
        type: USER.UPDATE_USER_INFO,
        value: {
          userName: '李东游',
          userId: 'ex-lidongyou002',
          rankCode: 't6',
          rankDesc: '中级前端开发工程师',
          deptCode: 'Nanjing001',
          deptDesc: '南京共享开发中心一组',
          token: '23UGE23ndinwr.584gEWRFf54g.fiISJRFIJ4r2AHU',
        },
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
