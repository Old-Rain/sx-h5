import React from 'react'
import { FC, PropsWithChildren } from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// component
import PageTransition from '@/components/PageTransition'
import withAuth from '@/withComponents/withAuth'
import withPVBuryPoint from '@/withComponents/withPVBuryPoint'

import Home from '@/views/Home'
import NotFound from '@/views/NotFound'

import { routes } from './routesList'

interface RouterProps {}

const TheRouter: FC<RouterProps> = (props: PropsWithChildren<RouterProps>) => {
  return (
    <React.Suspense fallback={<PageTransition />}>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />

          {routes.map((item, index) => {
            const Component = item.isBuryPoint
              ? withAuth(withPVBuryPoint(item.component), item.name)
              : withAuth(item.component, item.name)

            return <Route key={item.name} path={item.path} exact={item.isExact} component={Component} />
          })}

          <Route path="*" exact component={NotFound} />
        </Switch>
      </Router>
    </React.Suspense>
  )
}

export default TheRouter
