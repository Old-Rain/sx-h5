// useImperativeHandle 在父组件中调用子组件暴露的方法

import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react'
import {
  FC,
  PropsWithChildren,
  ForwardRefExoticComponent,
  RefAttributes,
  ForwardRefRenderFunction,
  ChangeEvent,
} from 'react'

import { InputProps, InputCurrent } from './Types'

// 方法一
// 1. 创建ForwardRefRenderFunction<T, P = {}> 传入类型InputProps和InputCurrent
const renderInput: ForwardRefRenderFunction<InputCurrent, InputProps> = (props, ref) => {
  const [val, setVal] = useState('只要998')
  const inputRef = useRef<HTMLInputElement>(null)

  const getVal = () => val

  useImperativeHandle(ref, () => ({ getVal }))

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={val}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setVal(e.target.value)
        }}
      />
      {props.children()}
    </div>
  )
}

// 2. 创建ForwardRefExoticComponent。将ForwardRefRenderFunction作为参数传给forwardRef
// ExoticInput的类型被推断出来
const ExoticInput: ForwardRefExoticComponent<InputProps & RefAttributes<InputCurrent>> = forwardRef(renderInput)

// 方法二
// 直接创建ForwardRefExoticComponent。执行forwardRef泛型函数，传入类型InputCurrent和InputProps
// ExoticInput的类型被推断出来
// const ExoticInput: ForwardRefExoticComponent<InputProps & RefAttributes<InputCurrent>> = forwardRef<
//   InputCurrent,
//   InputProps
// >((props, ref) => {
//   const [val, setVal] = useState('只要998')
//   const inputRef = useRef<HTMLInputElement>(null)

//   const getVal = () => val

//   useImperativeHandle(ref, () => ({ getVal }))

//   return (
//     <div>
//       <input
//         ref={inputRef}
//         type="text"
//         value={val}
//         onChange={(e: ChangeEvent<HTMLInputElement>) => {
//           setVal(e.target.value)
//         }}
//       />
//       {props.children()}
//     </div>
//   )
// })

const S_UseImperativeHandle: FC<{}> = (props: PropsWithChildren<{}>) => {
  const [val, setVal] = useState('')
  const exoticInputRef = useRef<InputCurrent>(null)

  return (
    <div>
      <div>{val}</div>
      <ExoticInput ref={exoticInputRef}>
        {() => <button onClick={() => setVal(exoticInputRef.current?.getVal()!)}>点我</button>}
      </ExoticInput>
    </div>
  )
}

export default S_UseImperativeHandle
