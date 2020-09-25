import React, { useState, useLayoutEffect, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'

import styles from './index.module.scss'

/**
 * 接收的option
 */
interface Option {
  label: string
  value: string
}

/**
 * props
 */
interface PullDownMenuProps {
  /**
   * 是否显示
   */
  show: boolean

  /**
   * 具顶部的距离
   */
  top: string

  /**
   * 关闭
   */
  close: () => void

  /**
   * 选项列表
   */
  optionList: Option[]

  /**
   * 选中项索引
   */
  active: number

  /**
   * 改变事件
   */
  onChange: (item: Option, index: number) => void
}

const PullDownMenu: FC<PullDownMenuProps> = (props: PropsWithChildren<PullDownMenuProps>) => {
  const { show, top, close, active, optionList, onChange } = props

  const [height, setHeight] = useState<string>('0')
  const [opacity, setOpacity] = useState<string>('0')
  const [display, setDisplay] = useState<'block' | 'none'>('none')

  // 选项点击事件
  function optionItemClick(item: Option, index: number) {
    if (active === index) return

    onChange(item, index)
    close()
  }

  // 显示/隐藏动画
  useLayoutEffect(() => {
    // 显示时，先设置display
    if (show) {
      setDisplay('block')
    }

    // 隐藏时，先设置height和opacity
    else {
      setHeight('0')
      setOpacity('0')
    }
  }, [show])

  // display为block后再显示height和opacity
  useEffect(() => {
    if (display === 'block') {
      setHeight(`${optionList.length * 0.36}rem`)
      setOpacity('1')
    }

    // eslint-disable-next-line
  }, [display])

  // 隐藏组件时，过渡结束后再隐藏
  function hide() {
    !show && setDisplay('none')
  }

  return (
    <div className={styles.PullDownMenu} style={{ display, top }}>
      <div className={styles.optionListWrap} style={{ height }}>
        <div className={styles.optionList} style={{ height: `${optionList.length * 0.36}rem` }}>
          {optionList.map((item, index) => (
            <div
              key={index}
              className={[styles.optionItem, active === index ? styles.active : ''].join(' ')}
              onClick={(e) => optionItemClick(item, index)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.mask} style={{ opacity }} onClick={close} onTransitionEnd={hide}></div>
    </div>
  )
}

export default PullDownMenu
