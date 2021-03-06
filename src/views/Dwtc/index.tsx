import React /* , { useState, useEffect } */ from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

import Nav from '@/components/Nav'

// import styles from './index.module.scss'

interface DwtcProps extends RouteChildrenProps {
  pageName: string
}

const Dwtc: FC<DwtcProps> = (props: PropsWithChildren<DwtcProps>) => {
  // return <div className={styles.Dwtc}>单位投产</div>
  return (
    <>
      <Nav title={props.pageName} back={props.history.goBack} />
      <div>单位投产</div>
    </>
  )
}

export default Dwtc
