import React from 'react'
import { FC, PropsWithChildren } from 'react'

import LoseStatus from '@/components/LoseStatus'

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = (props: PropsWithChildren<NotFoundProps>) => {
  return (
    <div className={''}>
      <LoseStatus type="notFound" tip="您访问的页面被UFO吸走了~" />
    </div>
  )
}

export default NotFound
