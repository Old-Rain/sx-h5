/**
 * 鉴权高阶组件
 */

// react
import React, { useEffect, useMemo } from 'react'
import { ComponentClass, LazyExoticComponent, FC, PropsWithChildren } from 'react'

// component
import Loading from '@/components/Loading'
import LoadFail from '@/components/LoadFail'

// store
import { Dispatch } from 'redux'
import { useSelector, useDispatch, useStore, shallowEqual } from 'react-redux'
import { appLogin } from '@/utils/appAuth'
import { StoreModules, CommonAction } from '@/store/reducers'
import { USER } from '@/store/modules/user/actionTypes'
import { UserState } from '@/store/modules/user/index'

interface AuthProps {}

const withAuth = (
  Component: ComponentClass<any> | FC<any> | LazyExoticComponent<any>,
  pageName: string,
): FC<AuthProps> => {
  const Auth: FC<AuthProps> = (props: PropsWithChildren<AuthProps>) => {
    const store = useStore<StoreModules>()

    const dispatch = useDispatch<Dispatch<CommonAction>>()

    const userState = useSelector<StoreModules, UserState>((state) => state.userModule, shallowEqual)

    const authStatus = useMemo(() => userState.authStatus, [userState])

    useEffect(() => {
      // 是否需要鉴权
      if (store.getState().userModule.authStatus !== 1) {
        appLogin()
      }

      return () => {
        // 如果鉴权失败，离开页面将状态改为未鉴权状态，下次进来继续执行鉴权操作
        if (store.getState().userModule.authStatus !== 1) {
          dispatch({
            type: USER.UPDATE_AUTH_STATUS,
            value: 0,
          })
        }
      }

      // eslint-disable-next-line
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
