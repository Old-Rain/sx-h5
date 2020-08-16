import React, { useState, useEffect } from 'react'
import { FC, PropsWithChildren } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'

const S_UseEffect = React.lazy(() => import('@/views/Study/S_UseEffect'))
const S_UseImperativeHandle = React.lazy(() => import('@/views/Study/S_UseImperativeHandle'))

interface StudyProps extends RouteComponentProps {}

const Study: FC<StudyProps> = (props: PropsWithChildren<StudyProps>) => {
  console.log(props)

  return (
    <div className={''}>
      何意百炼钢，化为绕指柔！Study
      <hr />
      <button onClick={() => props.history.push(`${props.match.path}/effect`)}>to Effect</button> |{' '}
      <button onClick={() => props.history.push(`${props.match.path}/imperativehandle`)}>to ImperativeHandle</button>
      <Route path={`${props.match.path}/effect`} component={S_UseEffect} />
      <Route path={`${props.match.path}/imperativehandle`} component={S_UseImperativeHandle} />
    </div>
  )
}

export default Study
