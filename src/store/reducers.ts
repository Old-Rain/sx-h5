import { combineReducers } from 'redux'
import { ReducersMapObject } from 'redux'

import userModule, { UserState } from './modules/user'

export interface StoreModules {
  userModule: UserState
}

export interface CommonAction {
  type: string
  value?: any
}

const reducersMap: ReducersMapObject<StoreModules, CommonAction> = {
  userModule,
}

export default combineReducers(reducersMap)
