/**
 * PV埋点高阶组件
 */

// react
import React, { useEffect } from 'react'
import { ComponentClass, LazyExoticComponent, FC, PropsWithChildren } from 'react'

interface PVBuryPointProps {}

const withPVBuryPoint = (Component: ComponentClass<any> | LazyExoticComponent<any> | FC<any>): FC<PVBuryPointProps> => {
  const PVBuryPoint: FC<PVBuryPointProps> = (props: PropsWithChildren<PVBuryPointProps>) => {
    useEffect(() => {
      // 页面埋点方法
      SKApp.PVBuryPoint()
    }, [])

    return <Component {...props} />
  }

  return PVBuryPoint
}

export default withPVBuryPoint
