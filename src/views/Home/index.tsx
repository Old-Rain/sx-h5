// react
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// component
import { Toast } from 'antd-mobile'
import LoseStatus from '@/components/LoseStatus'

// store
import store from '@/store'
import { appLogin } from '@/utils/appAuth'

setTimeout(appLogin, 300)

const Home: React.FC = () => {
  const [authStatus, setAuthStatus] = useState(store.getState().userModule.authStatus)

  useEffect(() => {
    console.log('鉴权执行')

    if (!authStatus) {
      Toast.loading('加载中...', 0)
    } else {
      Toast.hide()
    }

    store.subscribe(() => {
      setAuthStatus(store.getState().userModule.authStatus)
    })
  }, [authStatus])

  return (
    <>
      {authStatus === -1 ? (
        <LoseStatus type="fail" tip="系统在开小差，请返回重试~" />
      ) : authStatus === 1 ? (
        <div>
          <Link to="/hdgl">Hdgl</Link>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default Home

//
//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| | |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ | /// | |
//                     | \_| ''\-:-/'' | |
//                      \ .-\__ `|` ___/-. /
//                   ___`. .' /--:--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ : /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖保佑                  永无BUG
//          佛曰:
//                  写字楼里写字间，写字间里程序员；
//                  程序人员写程序，又拿程序换酒钱。
//                  酒醒只在网上坐，酒醉还来网下眠；
//                  酒醉酒醒日复日，网上网下年复年。
//                  但愿老死电脑间，不愿鞠躬老板前；
//                  奔驰宝马贵者趣，公交自行程序员。
//                  别人笑我忒疯癫，我笑自己命太贱；
//                  不见满街漂亮妹，哪个归得程序员？
