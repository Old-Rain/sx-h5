import React, { useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

import Nav from '@/components/Nav'
import { Toast } from 'antd-mobile'

interface LoadingProps extends RouteComponentProps {
  pageName: string
}

const Loading: FC<LoadingProps> = (props: PropsWithChildren<LoadingProps>) => {
  useEffect(() => {
    Toast.loading('加载中...', 0)
    return () => {
      Toast.hide()
    }
  }, [])

  return (
    <>
      <Nav title={props.pageName} back={props.history.goBack} />
    </>
  )
}

export default withRouter(Loading)
