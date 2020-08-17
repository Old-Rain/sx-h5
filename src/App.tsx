import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from '@/views/Home'

const Hdgl = React.lazy(() => import('@/views/Hdgl'))

function App() {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <Router>
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/hdgl" component={Hdgl} />git
      </Router>
    </React.Suspense>
  )
}

export default App
