import React from 'react'

import { Button } from 'antd-mobile'
import logo from './logo.svg'
import styles from './App.module.scss'

import QQ from '@/components/QQ'
import faviconPng from '@/assets/favicon.png'
import { chuizi } from '@/utils/dateFormat'
// const QQ = require('@/components/QQ.tsx')

// const faviconPng = require('@/assets/favicon.png')
console.log(styles)
function App() {
  chuizi()

  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className={styles['App-link']} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <img src={faviconPng} alt="" />
        <QQ />
        
        <div className={styles.big}>
          <div className={[styles.font].join(' ')}>大</div>
          <div className={[styles.font, styles.ignoreeee].join(' ')}>ignore</div>
        </div>
        <div className={styles.line}></div>
      </header>
      <Button type="warning" disabled>warning disabled</Button>
    </div>
  )
}

export default App
