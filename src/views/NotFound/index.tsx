// react
import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { RouteChildrenProps } from 'react-router-dom'

// component
import LoseStatus from '@/components/LoseStatus'
import Nav from '@/components/Nav'

interface NotFoundProps extends RouteChildrenProps {}

const NotFound: FC<NotFoundProps> = (props: PropsWithChildren<NotFoundProps>) => {
  return (
    <>
      <Nav title="Not Found" back={props.history.goBack}></Nav>
      <LoseStatus type="notFound" tip="您访问的页面被UFO吸走了~" />
    </>
  )
}

export default NotFound
