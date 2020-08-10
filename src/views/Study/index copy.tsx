import React from 'react'

import { Button } from 'antd-mobile'
import styles from './index.module.scss'

// Button
interface FancyButtonProps {
  children: string
  onClick: (e?: any) => void
}
const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>((props, ref) => (
  <button ref={ref} className="FancyButton" onClick={props.onClick}>
    {props.children}
  </button>
))

// Input
interface FancyInputProps {
  children: () => JSX.Element
}
interface FancyInputFn {
  focus: () => void
  log5: () => void
  log4: () => void
}

const FancyInput = React.forwardRef<FancyInputFn, FancyInputProps>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const qq = 5
  const chuzi = 5

  React.useImperativeHandle<FancyInputFn, FancyInputFn>(ref, () => ({
    focus() {
      inputRef.current?.focus()
    },
    log5() {
      console.log(qq)
    },
    log4() {
      console.log(chuzi)
    },
  }))
  return (
    <div>
      <input ref={inputRef} />
      {props.children()}
    </div>
  )
})

// const FancyInput: React.FC<FancyInputProps> = (props) => (
//   <div>
//     <input />
//     {props.children()}
//   </div>
// )

function Study() {
  const refButton = React.useRef<HTMLButtonElement>(null)
  const refFancyInput = React.useRef<FancyInputFn>(null)

  const refInputFocus = (refFancyInput: React.RefObject<FancyInputFn>) => {
    console.log(refFancyInput)
    refFancyInput.current?.focus()
    refFancyInput.current?.log5()
    refFancyInput.current?.log4()
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
