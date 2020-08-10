import React from 'react'

interface InputProps {
  children: () => JSX.Element
}

interface InputCurrent {
  getVal: () => string
}

const Input: React.ForwardRefRenderFunction<InputCurrent, InputProps> = (props, ref) => {
  const [val, setVal] = React.useState('只要998')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const getVal = () => val

  React.useImperativeHandle(ref, () => ({ getVal }))

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={val}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setVal(e.target.value)
        }}
      />
      {props.children()}
    </div>
  )
}

const ExoticInput = React.forwardRef(Input)

const Study = () => {
  const [val, setVal] = React.useState('')
  const exoticInputRef = React.useRef<InputCurrent>(null)

  function handleExoticInput(exoticInputRef: React.RefObject<InputCurrent>) {
    setVal(exoticInputRef.current?.getVal()!)
  }

  return (
    <div>
      <div>{val}</div>
      <ExoticInput ref={exoticInputRef}>{() => <button onClick={() => handleExoticInput(exoticInputRef)}>点我</button>}</ExoticInput>
    </div>
  )
}

export default Study
