// react
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// component
import PageTransition from '@/components/PageTransition'

// page
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'

const Hdgl = React.lazy(() => import('@/views/Hdgl'))

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
