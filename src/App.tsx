import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from '@/views/Home'

const Hdgl = React.lazy(() => import('@/views/Hdgl'))
const Study = React.lazy(() => import('@/views/Study'))

function App() {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <Router>
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/hdgl" component={Hdgl} />
        <Route path="/study" component={Study} />
      </Router>
    </React.Suspense>
  )
}

export default App
