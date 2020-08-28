import React /* , { useState, useEffect } */ from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

import Nav from '@/components/Nav'

// import styles from './index.module.scss'

interface GnzProps extends RouteChildrenProps {
  pageName: string
}

const Gnz: FC<GnzProps> = (props: PropsWithChildren<GnzProps>) => {
  // return <div className={styles.Gnz}>功能组</div>
  return (
    <>
      <Nav title={props.pageName} back={props.history.goBack} />
      <div>功能组</div>
    </>
  )
}

export default Gnz
