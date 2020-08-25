import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

interface EntryProps {}

const Entry: FC<EntryProps> = (props: PropsWithChildren<EntryProps>) => {
  return (
    <div className={styles.Entry}>
      <div className={styles.title}>
        营业部
        <span className={styles.titleLogo}></span>
      </div>
      <div className={[styles.linkGroup, 'clearBoth'].join(' ')}>
        <Link to="/zygl" className={styles.link}>
          增员管理
        </Link>
        <Link to="/xszc" className={styles.link}>
          销售支持
        </Link>
        <Link to="/gnz" className={styles.link}>
          功能组
        </Link>
        <Link to="/hygl" className={styles.link}>
          会议管理
        </Link>
        <Link to="/dwtc" className={styles.link}>
          单位投产
        </Link>
        <Link to="/grjx" className={styles.link}>
          个人绩效
        </Link>
        <Link to="/hdgl" className={styles.link}>
          活动管理
        </Link>
        <Link to="/pygl" className={styles.link}>
          培养管理
        </Link>
      </div>
    </div>
  )
}

export default Entry
