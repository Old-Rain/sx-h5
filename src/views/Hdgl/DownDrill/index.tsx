/**
 * 活动指标下钻页面
 */

// react
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { FC, PropsWithChildren } from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'

// component
import Nav from '@/components/Nav'
import PullDownMenu from '@/components/PullDownMenu'
import { Toast } from 'antd-mobile'
import { List as VList, AutoSizer } from 'react-virtualized'
import { ListRowProps } from 'react-virtualized'

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
    label: '注册时间由近到远',
    value: '0',
  },
  {
    label: '注册时间由远到近',
    value: '1',
  },
]

const sortMenu1: SortMenu[] = [
  {
    label: '客户阅读量由多到少',
    value: '0',
  },
  {
    label: '客户阅读量由少到多',
    value: '1',
  },
]

const DownDrill: FC<DownDrillProps> = (props: PropsWithChildren<DownDrillProps>) => {
  // 路由参数
  const { isDetailPage, fieldNo, fieldIndicatorName, selectDate } = props.location.state

  // 客户列表
  const [clientList, setClientList] = useState<Client[]>([])

  // 客户列表顺序
  const [sort, setSort] = useState<Sort>('0') //  0升序、1降序

  // 排序菜单面板
  const [show, setShow] = useState<boolean>(false)

  // 排序菜单
  const [sortMenu, setSortMenu] = useState<SortMenu[]>([])

  // 排序菜单选中项
  const [sortMenuActiveIndex, setSortMenuActiveIndex] = useState<number>(0)

  const vListRef = useRef<VList>(null)

  // 赋值排序菜单
  useLayoutEffect(() => {
    let temp: SortMenu[] = []

    if (isDetailPage === '0') {
      temp = sortMenu0
    } else if (isDetailPage === '1') {
      temp = sortMenu1
    }

    setSortMenu(temp)

    // eslint-disable-next-line
  }, [])

  // 监听sort，其他三个依赖只会在初始时加载一次
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

      // 列表回到初始位置
      vListRef.current?.scrollToRow(0)

      // 为第一个添加空值，撑高度
      res.data.unshift({
        clientName: '',
        clientId: '',
        customerIndex: '',
      })

      // 为最后一个添加空值，撑高度
      res.data.push({
        clientName: '',
        clientId: '',
        customerIndex: '',
      })

      setClientList(res.data)
    })()

    // eslint-disable-next-line
  }, [sort])

  // 无二级页面
  const Client0 = ({ key, index, style }: ListRowProps) => {
    console.log('昂贵的计算0')

    if (!index) {
      return <div className={styles.magic} key={key}></div>
    }

    return (
      <div className={styles.vlist} style={style} key={key}>
        <div className={styles.client}>
          <div className={styles.avater}>
            <img src={defaultAvater} alt="" />
          </div>
          <div className={[styles.info, styles.info0].join(' ')}>
            <p>{clientList[index].clientName}</p>
            <span>
              {fieldNameConfig[fieldNo].dtbs}：{clientList[index].customerIndex}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // 有二级页面
  const Client1 = ({ key, index, style }: ListRowProps) => {
    console.log('昂贵的计算1')

    if (!index || index === clientList.length - 1) {
      return <div className={styles.magic} key={key}></div>
    }

    return (
      <div className={styles.vlist} style={style} key={key}>
        <div className={styles.client}>
          <div className={styles.avater}>
            {sort === '0' && index >= 1 && index <= 3 ? (
              <i className={[styles.sort, styles[`sort${index}`]].join(' ')}></i>
            ) : sort === '1' && index >= clientList.length - 4 && index <= clientList.length - 2 ? (
              <i className={[styles.sort, styles[`sort${clientList.length - 1 - index}`]].join(' ')}></i>
            ) : (
              ''
            )}
            <img src={defaultAvater} alt="" />
          </div>
          <div className={[styles.info, styles.info1].join(' ')}>
            <p>{clientList[index].clientName}</p>
            <span>
              <button>{clientList[index].customerIndex}次</button>
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* 导航栏 */}
      <Nav title={fieldIndicatorName} back={props.history.goBack} />

      <div className={styles.DownDrill}>
        {/* 时间栏 */}
        <div className={styles.dateAndSort} style={{ top: `${getStatusBarHeight()}px` }}>
          <div className={styles.date}>{`${selectDate.replace('-', '年')}月`}</div>
          <div className={[styles.sortArea, show ? styles.sortShow : ''].join(' ')}>
            <button onClick={() => setShow(!show)}>排序</button>
          </div>
        </div>

        {/* 排序菜单 */}
        <PullDownMenu
          show={show}
          top={`calc(${getStatusBarHeight()}px + 1.1rem)`}
          close={() => setShow(false)}
          optionList={sortMenu}
          active={sortMenuActiveIndex}
          onChange={({ value }, index) => {
            setSort(value as Sort)
            setSortMenuActiveIndex(index)
          }}
        />

        <div className={styles.vlistWrap} style={{ marginTop: `${getStatusBarHeight()}px` }}>
          <AutoSizer>
            {({ width, height }) => {
              // 渲染内容
              let rowRenderer = isDetailPage === '0' ? Client0 : isDetailPage === '1' ? Client1 : () => ''

              // 首尾空行高度
              let rowHeightEmpty = (window.innerWidth / 375) * 16

              // 普通行高
              let rowHeightNormal = (window.innerWidth / 375) * 92

              return (
                <VList
                  ref={vListRef}
                  width={width} // 设置列表项所在盒子的宽高
                  height={height}
                  rowCount={clientList.length} // 设置总行数
                  rowHeight={({ index }) => (!index || index === clientList.length - 1 ? rowHeightEmpty : rowHeightNormal)} // 第一个和最后一个空值用16px的空div
                  rowRenderer={rowRenderer} // 需要渲染内容
                />
              )
            }}
          </AutoSizer>
        </div>
      </div>
    </>
  )
}

export default DownDrill
