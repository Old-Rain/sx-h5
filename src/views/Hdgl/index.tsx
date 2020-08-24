import React, { useState, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'

import Nav from '@/components/Nav'

import { backContainer } from '@/utils/cordova'

interface HdglProps {}

const Hdgl: FC<HdglProps> = (props: PropsWithChildren<HdglProps>) => {
  return (
    <>
      <Nav title="活动指标概览" back={backContainer} />
      <div>活动管理</div>
    </>
  )
}

export default Hdgl
