/**
 * 空状态
 */

// react
import React from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface LoseStatusProps {
  type: 'fail' | 'empty' | 'notFound' // 加载失败、空状态、404
  tip: string
}

const LoseStatus: FC<LoseStatusProps> = (props: PropsWithChildren<LoseStatusProps>) => {
  return (
    <div className={styles.LoseStatus}>
      <div className={[styles.loseImg, styles[props.type]].join(' ')}></div>
      <p>{props.tip}</p>
    </div>
  )
}

export default LoseStatus
