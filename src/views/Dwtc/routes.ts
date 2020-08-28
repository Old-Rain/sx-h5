import { lazy } from 'react'
import { TheRoute } from '@/router/type'

const routes: TheRoute[] = [
  {
    path: '/dwtc',
    name: '单位投产',
    isExact: true,
    isBuryPoint: true,
    component: lazy(() => import('./index')),
  },
]

export default routes
