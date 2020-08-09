import React, { RefObject } from 'react'

import { Button } from 'antd-mobile'
import styles from './index.module.scss'

import { chuizi } from '@/utils/dateFormat'

interface FancyButtonProps {
  children: string
  onClick: (e?: any) => void
}

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>((props, ref) => (
  <button ref={ref} className="FancyButton" onClick={props.onClick}>
    {props.children}
  </button>
))

interface FancyInputProps {
  children: () => JSX.Element
}

const FancyInput = React.forwardRef<HTMLInputElement, FancyInputProps>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const qq = 5

  React.useImperativeHandle<HTMLInputElement, any>(ref, () => ({
    focus() {
      inputRef.current?.focus()
    },
    log5() {
      console.log(qq)
    },
  }))
  return (
    <div>
      <input ref={inputRef} />
      {props.children()}
    </div>
  )
})

function Study() {
  chuizi()

  const refButton = React.useRef<HTMLButtonElement>(null)
  const refFancyInput = React.useRef<HTMLInputElement>(null)

  const refInputFocus = (refFancyInput: RefObject<HTMLInputElement>) => {
    ;(refFancyInput.current as any).log5()
    refFancyInput.current?.focus()
  }

  return (
    <div className={styles.Study}>
      <FancyButton ref={refButton} onClick={() => console.log(refButton)}>
        Click me!
      </FancyButton>
      <FancyInput ref={refFancyInput}>
        {() => {
          return <button onClick={() => refInputFocus(refFancyInput)}>点我</button>
        }}
      </FancyInput>
      <Button
        type="warning"
        disabled={false}
        onClick={(e) => {
          console.log(e)
          alert(1)
        }}
      >
        warning disabled
      </Button>
    </div>
  )
}

export default Study
