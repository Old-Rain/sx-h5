import React, { useState, useRef, useLayoutEffect } from 'react'
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
  const [display, setDisplay] = useState<string>('none')

  const displayTimer = useRef<NodeJS.Timeout | null>(null)

  // 选项点击事件
  function optionItemClick(item: Option, index: number) {
    if (active === index) return

    onChange(item, index)
    close()
  }

  // 显示/隐藏动画
  useLayoutEffect(() => {
    const height = show ? `${optionList.length * 0.36}rem` : '0'
    const opacity = show ? '1' : '0'
    const display = show ? 'block' : 'none'

    if (show) {
      Promise.resolve()
        .then(() => {
          setDisplay(display)

          return Promise.resolve()
        })
        .then(() => {
          displayTimer.current = setTimeout(() => {
            clearTimeout(Number(displayTimer.current))
            displayTimer.current = null

            setHeight(height)
            setOpacity(opacity)
          }, 0)
        })
    } else {
      setHeight(height)
      setOpacity(opacity)
      displayTimer.current = setTimeout(() => {
        clearTimeout(Number(displayTimer.current))
        displayTimer.current = null

        setDisplay(display)
      }, 300)
    }

    return () => {
      clearTimeout(Number(displayTimer.current))
      displayTimer.current = null
    }
  }, [show, optionList])

  return (
    <div className={styles.PullDownMenu} style={{ display, top }}>
      <div className={styles.optionList} style={{ height }}>
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
      <div className={styles.mask} style={{ opacity }} onClick={close}></div>
    </div>
  )
}

export default PullDownMenu
