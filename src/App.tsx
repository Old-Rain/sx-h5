// react
import React from 'react'

import store from '@/store'
import { Provider } from 'react-redux'

// router
import TheRouter from '@/router'

function App() {
  return (
    <Provider store={store}>
      <TheRouter />
    </Provider>
  )
}

export default App
