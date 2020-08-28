import { ComponentClass, FC, LazyExoticComponent } from 'react'

export interface TheRoute {
  /**
   * 路径
   */
  path: string

  /**
   * 名称
   */
  name: string

  /**
   * 是否精确匹配
   */
  isExact?: boolean

  /**
   * 是否埋点
   */
  isBuryPoint?: boolean

  /**
   * 组件
   */
  component: ComponentClass<any> | FC<any> | LazyExoticComponent<any>
}
