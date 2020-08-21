import { Reducer } from 'redux'
import { ReducerState, ReducerMutations } from './types'

import user, { UserState, UserMutations } from './modules/user'

export interface ModulesState {
  user: UserState
}

export interface ModulesMutations {
  user: UserMutations
}

const rState: ReducerState<ModulesState> = {
  user: user.state,
}

const rMutations: ReducerMutations<ModulesMutations> = {
  user: user.mutations,
}

export interface RdeucerAction {
  $module: keyof ModulesMutations // 模块名称
  type: string // 各模块中mutations的各属性的key
  value?: any
}

const reducer: Reducer<ReducerState, RdeucerAction> = (state = rState, action) => {
  const { $module, type, value } = action

  if ($module) {
    ;(rMutations[$module] as any)[type](state, value)
  }

  return state
}

export default reducer
