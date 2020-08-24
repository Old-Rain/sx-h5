import React from 'react'
import { FC, PropsWithChildren, ReactNode } from 'react'

import { NavBar, Icon } from 'antd-mobile'
import { getStatusBarHeight } from '@/utils/tool'

import styles from './index.module.scss'

interface NavProps {
  title: string
  back?: () => void
  right?: ReactNode[]
}

const Nav: FC<NavProps> = (props: PropsWithChildren<NavProps>) => {
  return (
    <div className={styles.NavBarPlaceHolder} style={{ paddingTop: `${getStatusBarHeight()}px` }}>
      <div className={styles.Nav} style={{ top: `${getStatusBarHeight()}px` }}>
        <NavBar
          mode="light"
          icon={props.back && <Icon type="left" />}
          onLeftClick={props.back}
          rightContent={props.right}
        >
          {props.title}
        </NavBar>
      </div>
    </div>
  )
}

export default Nav
