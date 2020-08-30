/**
 * 活动指标概览
 */

// react
import React, { useState, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'

// component
import Nav from '@/components/Nav'
import { DatePicker } from 'antd-mobile'

import styles from './index.module.scss'

import { selectEmpIndexDetail } from '@/api/hdgl'
import { getStatusBarHeight } from '@/utils/tool'
import moment from 'moment'

// 昨天
function yesterday() {
  return new Date(+new Date() - 1000 * 60 * 60 * 24)
}

// 获取所选时间所在月份的最后一天
function theMonthFirstDay(val: Date): Date {
  const theDate = new Date(val)
  const theYear = theDate.getFullYear()
  const theMonth = theDate.getMonth()

  const firstDay = new Date(theYear, theMonth)

  return firstDay
}

// 获取所选时间所在月份的最后一天
function theMonthLastDay(val: Date): Date {
  const theDate = new Date(val)
  const theYear = theDate.getFullYear()
  const theMonth = theDate.getMonth()

  const lastDay = +new Date(theYear, theMonth + 1) - 1000 * 60 * 60 * 24

  return new Date(lastDay)
}

// 统计时间格式化
function dateRangeFormat(val: Date): string {
  // 所选时间的年月
  const selectYear = val.getFullYear()
  const selectMonth = val.getMonth()

  // 今天所在的年月
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()

  if (selectYear < currentYear)
    return `${moment(theMonthFirstDay(val)).format('MM/DD')} - ${moment(theMonthLastDay(val)).format('MM/DD')}`

  if (selectYear === currentYear && selectMonth < currentMonth)
    return `${moment(theMonthFirstDay(val)).format('MM/DD')} - ${moment(theMonthLastDay(val)).format('MM/DD')}`

  if (selectYear === currentYear && selectMonth === currentMonth)
    return `${moment(theMonthFirstDay(val)).format('MM/DD')} - ${moment(yesterday()).format('MM/DD')}`

  return '-'
}

interface HdglProps extends RouteComponentProps {
  pageName: string
}

const Hdgl: FC<HdglProps> = (props: PropsWithChildren<HdglProps>) => {
  const [selectDate, setSelectDate] = useState<Date>(yesterday())

  useEffect(() => {
    console.log(+yesterday())
    ;(async function () {
      const { data: res } = await selectEmpIndexDetail()
      console.log(res)
    })()
  }, [selectDate])

  return (
    <>
      {/* 导航栏 */}
      <Nav title={props.pageName} back={props.history.goBack} />

      {/* 页面主体 */}
      <div className={styles.Hdgl}>
        {/* 时间栏 */}
        <div className={styles.dateBar} style={{ top: `${getStatusBarHeight()}px` }}>
          <DatePicker
            title="选择时间"
            mode="month"
            value={selectDate}
            onChange={(date) => {
              setSelectDate(date)
            }}
          >
            <div className={styles.dateBarContainer}>
              <div className={styles.dateBtn}>{moment(selectDate).format('YYYY年MM月')}</div>
              <div>统计时间：{dateRangeFormat(selectDate)}</div>
            </div>
          </DatePicker>
        </div>
        天塌地陷紫金锤
      </div>
    </>
  )
}

export default Hdgl
