import React /* , { useState, useEffect } */ from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

import Nav from '@/components/Nav'

// import styles from './index.module.scss'

interface ZyglProps extends RouteChildrenProps {
  pageName: string
}

const Zygl: FC<ZyglProps> = (props: PropsWithChildren<ZyglProps>) => {
  // return <div className={styles.Zygl}>增员管理</div>
  return (
    <>
      <Nav title={props.pageName} back={props.history.goBack} />
      <div>增员管理</div>
    </>
  )
}

export default Zygl
