// react
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// component
import PageTransition from '@/components/PageTransition'
import withAuth from '@/withComponents/withAuth'

// page
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'

const Hdgl = withAuth(
  React.lazy(() => import('@/views/Hdgl')),
  '活动指标概览',
)

function App() {
  return (
    <React.Suspense fallback={<PageTransition />}>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route path="/hdgl" component={Hdgl} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Router>
    </React.Suspense>
  )
}

export default App
