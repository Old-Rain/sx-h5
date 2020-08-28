import React /* , { useState, useEffect } */ from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

import Nav from '@/components/Nav'

// import styles from './index.module.scss'

interface GrjxProps extends RouteChildrenProps {
  pageName: string
}

const Grjx: FC<GrjxProps> = (props: PropsWithChildren<GrjxProps>) => {
  // return <div className={styles.Grjx}>个人绩效</div>
  return (
    <>
      <Nav title={props.pageName} back={props.history.goBack} />
      <div>个人绩效</div>
    </>
  )
}

export default Grjx
