import { lazy } from 'react'
import { TheRoute } from '@/router/type'

const routes: TheRoute[] = [
  {
    path: '/pygl',
    name: '培养管理',
    isExact: true,
    isBuryPoint: true,
    component: lazy(() => import('./index')),
  },
]

export default routes
