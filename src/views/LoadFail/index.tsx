import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

import Nav from '@/components/Nav'
import LoseStatus from '@/components/LoseStatus'

interface LoadFailProps extends RouteComponentProps {
  pageName: string
}

const LoadFail: FC<LoadFailProps> = (props: PropsWithChildren<LoadFailProps>) => {
  return (
    <>
      <Nav title={props.pageName} back={props.history.goBack} />
      <LoseStatus type="fail" tip="系统在开小差，请返回重试~" />
    </>
  )
}

export default withRouter(LoadFail)
