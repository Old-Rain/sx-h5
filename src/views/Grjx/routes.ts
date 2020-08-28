import { lazy } from 'react'
import { TheRoute } from '@/router/type'

const routes: TheRoute[] = [
  {
    path: '/grjx',
    name: '个人绩效',
    isExact: true,
    isBuryPoint: true,
    component: lazy(() => import('./index')),
  },
]

export default routes
