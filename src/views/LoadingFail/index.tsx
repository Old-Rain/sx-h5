import React, { useState, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

import Nav from '@/components/Nav'
import LoseStatus from '@/components/LoseStatus'

interface LoadingFailProps extends RouteComponentProps {}

const LoadingFail: FC<LoadingFailProps> = (props: PropsWithChildren<LoadingFailProps>) => {
  return (
    <>
      <Nav title="失败" back={props.history.goBack} />
      <LoseStatus type="fail" tip="系统在开小差，请返回重试~" />
    </>
  )
}

export default withRouter(LoadingFail)
