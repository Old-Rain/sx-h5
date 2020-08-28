import React /*,  { useState, useEffect } */ from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

import Nav from '@/components/Nav'

// import styles from './index.module.scss'

interface XszcProps extends RouteChildrenProps {
  pageName: string
}

const Xszc: FC<XszcProps> = (props: PropsWithChildren<XszcProps>) => {
  // return <div className={styles.Xszc}>销售支持</div>
  return (
    <>
      <Nav title={props.pageName} back={props.history.goBack} />
      <div>销售支持</div>
    </>
  )
}

export default Xszc
