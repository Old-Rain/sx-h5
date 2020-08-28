/**
 * 鉴权高阶组件
 */

// react
import React, { useState, useEffect, useRef } from 'react'
import { ComponentClass, LazyExoticComponent, FC, PropsWithChildren } from 'react'
import { Unsubscribe } from 'redux'

// component
import Loading from '@/components/Loading'
import LoadFail from '@/components/LoadFail'

// store
import store from '@/store'
import { appLogin } from '@/utils/appAuth'
import { USER } from '@/store/modules/user/actionTypes'

interface AuthProps {}

const withAuth = (
  Component: ComponentClass<any> | FC<any> | LazyExoticComponent<any>,
  pageName: string,
): FC<AuthProps> => {
  const Auth: FC<AuthProps> = (props: PropsWithChildren<AuthProps>) => {
    const [authStatus, setAuthStatus] = useState(store.getState().userModule.authStatus)
    const unsubscribe = useRef<Unsubscribe>(() => {})

    useEffect(() => {
      // 监听authStatus
      unsubscribe.current = store.subscribe(() => {
        setAuthStatus(store.getState().userModule.authStatus)
      })

      return () => {
        // 卸载订阅者的监听
        unsubscribe.current()
      }
    }, [authStatus])

    useEffect(() => {
      // 是否需要鉴权
      if (store.getState().userModule.authStatus !== 1) {
        appLogin()
      }

      return () => {
        // 如果鉴权失败，离开页面将状态改为未鉴权状态，下次进来继续执行鉴权操作
        if (store.getState().userModule.authStatus !== 1) {
          store.dispatch({
            type: USER.UPDATE_AUTH_STATUS,
            value: 0,
          })
        }
      }
    }, [])

    return (
      <>
        {!authStatus ? (
          // 鉴权中
          <Loading pageName={pageName} />
        ) : authStatus === -1 ? (
          // 鉴权失败
          <LoadFail pageName={pageName} />
        ) : authStatus === 1 ? (
          // 鉴权成功
          <Component pageName={pageName} {...props} />
        ) : (
          ''
        )}
      </>
    )
  }
  return Auth
}

export default withAuth
