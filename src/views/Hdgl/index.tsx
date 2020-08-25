import React, { useState, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Nav from '@/components/Nav'

interface HdglProps extends RouteComponentProps {}

const Hdgl: FC<HdglProps> = (props: PropsWithChildren<HdglProps>) => {
  return (
    <>
      <Nav title="活动指标概览" back={props.history.goBack} />
      <div>活动管理</div>
    </>
  )
}

export default Hdgl
