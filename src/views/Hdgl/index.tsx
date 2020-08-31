/**
 * 活动指标概览
 */

// react
import React, { useState, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'

// component
import Nav from '@/components/Nav'
import { Toast, DatePicker } from 'antd-mobile'

import styles from './index.module.scss'

import { getStatusBarHeight } from '@/utils/tool'
import moment from 'moment'

import { selectEmpIndexDetail } from '@/api/hdgl'

import fieldNameConfig from './fieldNameConfig'
console.log(fieldNameConfig)

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

// 指标列表
interface SecondaryResList {
  secondaryType: string
  secondaryName: string
  fieldIndicatorResList: {
    id: string
    fieldNo: string
    fieldIndicatorName: string
    indexUnit: string
    currentSituation: string | null
    lastYearData: string | null
    areaAverage: string | null
  }[]
}

const Hdgl: FC<HdglProps> = (props: PropsWithChildren<HdglProps>) => {
  // 时间选择
  const [selectDate, setSelectDate] = useState<Date>(yesterday())

  // 指标列表
  const [secondaryResList, setSecondaryResList] = useState<SecondaryResList[]>([])

  useEffect(() => {
    ;(async function () {
      Toast.loading('加载中...', 0)
      const { data: res } = await selectEmpIndexDetail<{
        indicatorRes: {
          secondaryResList: SecondaryResList[]
        }
      }>()
      Toast.hide()

      if (res.code !== '00') {
        Toast.info(res.message || '未知错误')

        return
      }

      setSecondaryResList(res.data.indicatorRes.secondaryResList)
    })()
  }, [selectDate])

  useEffect(() => {
    console.log('secondaryResList', secondaryResList)
  }, [secondaryResList])

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

        {/* 指标列表 */}
        {secondaryResList.map((item, index) => (
          <div className={styles.indexItem} key={item.secondaryType}>
            <div className={styles.indexTitle}>{item.secondaryName}</div>
            <div className={styles.indexItemSub}>
              {item.fieldIndicatorResList.map((item1, index1) => (
                <div
                  key={item1.id}
                  className={[styles.indexItemSubCard, styles[`indexItemSubCard-${item.secondaryType}`]].join(' ')}
                >
                  <div className={styles.situation}>
                    {item1.currentSituation ? (
                      <>
                        {item1.indexUnit === '%' ? (+item1.currentSituation).toFixed(2) : item1.currentSituation}
                        <span className={styles.unit}>{item1.indexUnit}</span>
                      </>
                    ) : (
                      '-'
                    )}
                  </div>
                  <div
                    className={styles.indexName}
                    dangerouslySetInnerHTML={{ __html: fieldNameConfig[item1.fieldNo].semantic }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Hdgl
