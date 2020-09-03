/**
 * 活动指标下钻页面
 */

// react
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { FC, PropsWithChildren } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'

// component
import Nav from '@/components/Nav'
import { Toast, Menu } from 'antd-mobile'

import styles from './index.module.scss'
import defaultAvater from '@/assets/hdgl/default_avater.png'

import { getStatusBarHeight } from '@/utils/tool'

import { getClient, getBitInfo } from '@/api/hdgl'
import { GetClientOrBitInfo } from '@/api/hdgl/types'

import fieldNameConfig from '../fieldNameConfig'

/**
 * 是否有详情页
 */
type IsDetailPage = '0' | '1'

/**
 * 排序
 */
type Sort = '0' | '1'

/**
 * props
 */
interface DownDrillProps
  extends RouteComponentProps<
    {},
    StaticContext,
    { isDetailPage: IsDetailPage; fieldNo: string; fieldIndicatorName: string; selectDate: string }
  > {}

/**
 * 客户信息
 */
interface Client {
  clientName: string
  clientId: string
  customerIndex: string
}

/**
 * 排序菜单
 */
interface SortMenu {
  label: string
  value: Sort
}

function theAPI(isDetailPage: IsDetailPage, data: GetClientOrBitInfo) {
  if (isDetailPage === '0') return getClient<Client[]>(data)
  if (isDetailPage === '1') return getBitInfo<Client[]>(data)
  return Promise.reject()
}

const sortMenu0: SortMenu[] = [
  {
    label: '注册时间由远到近',
    value: '0',
  },
  {
    label: '注册时间近远到远',
    value: '1',
  },
]

const sortMenu1: SortMenu[] = [
  {
    label: '客户阅读量由少到多',
    value: '0',
  },
  {
    label: '客户阅读量由多到少',
    value: '1',
  },
]

const DownDrill: FC<DownDrillProps> = (props: PropsWithChildren<DownDrillProps>) => {
  // 路由参数
  const { isDetailPage, fieldNo, fieldIndicatorName, selectDate } = props.location.state

  // 客户列表
  const [clientList, setClientList] = useState<Client[]>([])

  // 客户列表顺序
  const [sort, setSort] = useState<Sort>('1') // 1 升序、0 降序

  // 排序菜单
  const [sortMenu, setSortMenu] = useState<SortMenu[]>([])

  // 排序菜单面板
  const [show, setShow] = useState<boolean>(false)

  // 赋值排序菜单
  useLayoutEffect(() => {
    let temp: SortMenu[] = []

    if (isDetailPage === '0') {
      temp = sortMenu0
    } else if (isDetailPage === '1') {
      temp = sortMenu1
    }

    setSortMenu(temp)
  }, [isDetailPage])

  useEffect(() => {
    ;(async function () {
      Toast.loading('加载中...', 0)
      const { data: res } = await theAPI(isDetailPage, {
        sort,
        fieldNo,
        trackTime: selectDate,
      })
      Toast.hide()

      // 接口错误
      if (res.code !== '00') {
        Toast.info(res.message || '未知错误')

        return
      }

      setClientList(res.data)
    })()
  }, [sort, isDetailPage, fieldNo, selectDate])

  return (
    <>
      {/* 导航栏 */}
      <Nav title={fieldIndicatorName} back={props.history.goBack} />

      <div className={styles.DownDrill}>
        {/* 时间栏 */}
        <div className={styles.dateAndSort} style={{ top: `${getStatusBarHeight()}px` }}>
          <div className={styles.date}>{`${selectDate.replace('-', '年')}月`}</div>
          <div className={[styles.sort, show ? styles.sortShow : ''].join(' ')}>
            <button onClick={() => setShow(!show)}>排序</button>
          </div>
        </div>

        {/* 排序菜单 */}
        <div className={styles.sortMenu} style={{ display: show ? 'block' : 'none', top: `${getStatusBarHeight()}px` }}>
          <Menu className="single-foo-menu" data={sortMenu} value={['1']} level={1} height={0} />
        </div>

        {/* 客户列表 */}
        {isDetailPage === '0'
          ? clientList.map((item, index) => (
              <div className={styles.client} key={index}>
                <img src={defaultAvater} alt="" />
                <div className={[styles.info, styles.info0].join(' ')}>
                  <p>{item.clientName}</p>
                  <span>
                    {fieldNameConfig[fieldNo].dtbs}：{item.customerIndex}
                  </span>
                </div>
              </div>
            ))
          : isDetailPage === '1'
          ? clientList.map((item, index) => (
              <div className={styles.client} key={index}>
                <img src={defaultAvater} alt="" />
                <div className={[styles.info, styles.info1].join(' ')}>
                  <p>{item.clientName}</p>
                  <span>
                    <button>{item.customerIndex}次</button>
                  </span>
                </div>
              </div>
            ))
          : ''}
      </div>
    </>
  )
}

export default DownDrill
