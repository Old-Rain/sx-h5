import React /* , { useState, useEffect } */ from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

import Nav from '@/components/Nav'

// import styles from './index.module.scss'

interface HyglProps extends RouteChildrenProps {
  pageName: string
}

const Hygl: FC<HyglProps> = (props: PropsWithChildren<HyglProps>) => {
  // return <div className={styles.Hygl}>会议管理</div>
  return (
    <>
      <Nav title={props.pageName} back={props.history.goBack} />
      <div>会议管理</div>
    </>
  )
}

export default Hygl
