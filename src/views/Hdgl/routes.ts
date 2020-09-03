import { lazy } from 'react'
import { TheRoute } from '@/router/type'

const routes: TheRoute[] = [
  {
    path: '/hdgl',
    name: '活动指标概览',
    isExact: true,
    isBuryPoint: true,
    component: lazy(() => import('./index')),
  },
  {
    path: '/hdgl/downdirll',
    name: '活动指标下钻页面',
    // isExact: true,
    isBuryPoint: true,
    component: lazy(() => import('./DownDrill')),
  },
]

export default routes
