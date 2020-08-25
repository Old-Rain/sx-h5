// react
import React, { useState, useEffect } from 'react'
import { ComponentClass, LazyExoticComponent, FC, PropsWithChildren } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

// component
import { Toast } from 'antd-mobile'
import LoseStatus from '@/components/LoseStatus'
import LoadingFail from '@/views/LoadingFail'

// store
import store from '@/store'
import { appLogin } from '@/utils/appAuth'

interface withAuthProps /* extends RouteChildrenProps */ {}

const withAuth = (Component: ComponentClass<any> | FC<any> | LazyExoticComponent<any>): FC<withAuthProps> => {
  const Auth: FC<withAuthProps> = (props: PropsWithChildren<withAuthProps>) => {
    const [authStatus, setAuthStatus] = useState(store.getState().userModule.authStatus)

    useEffect(() => {
      console.log('鉴权')
      if (authStatus !== 1) {
        appLogin()
      }
    }, [])

    useEffect(() => {
      console.log('authStatus', authStatus)

      if (!authStatus) {
        Toast.loading('加载中...', 0)
      } else if (authStatus) {
        Toast.hide()
      }

      store.subscribe(() => {
        console.log('监听', store.getState().userModule.authStatus)

        setAuthStatus(store.getState().userModule.authStatus)
      })
    }, [authStatus])

    return <>{authStatus === -1 ? <LoadingFail /> : authStatus === 1 ? <Component {...props} /> : ''}</>
  }
  return Auth
}

export default withAuth
