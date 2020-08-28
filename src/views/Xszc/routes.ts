import { lazy } from 'react'
import { TheRoute } from '@/router/type'

const routes: TheRoute[] = [
  {
    path: '/xszc',
    name: '销售支持',
    isExact: true,
    isBuryPoint: true,
    component: lazy(() => import('./index')),
  },
]

export default routes
