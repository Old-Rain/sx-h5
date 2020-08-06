import React from 'react'
import logo from './logo.svg'
import './App.css'

import QQ from '@/components/QQ'
import faviconPng from '@/assets/favicon.png'
import { chuizi } from '@/utils/dateFormat'
// const QQ = require('@/components/QQ.tsx')

// const faviconPng = require('@/assets/favicon.png')

function App() {
  chuizi()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <img src={faviconPng} alt="" />
        <QQ />
      </header>
    </div>
  )
}

export default App
