import { ModulesState, ModulesMutations } from './reducer'

/**
 * @T 各模块描述自己state的接口
 */
export type State<T> = {
  [K in keyof T]: T[K]
}

// mutations里面的属性只能Action类型
export type Mutations<T> = {
  [K in keyof T]: Action
}

// 操作store的函数的类型
export type Action = (state: ReducerState, value?: any) => ReducerState

/**
 * key为每个模块的名称
 * value为每个模块的state
 */
export type ReducerState<T = ModulesState> = {
  [K in keyof T]: State<T[K]>
}

/**
 * key为每个模块的名称
 * value为每个模块的mutations
 */
export type ReducerMutations<T = ModulesMutations> = {
  [K in keyof T]: Mutations<T[K]>
}
