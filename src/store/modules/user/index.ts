import { State, Mutations, Action } from '@/store/types'
import { UserInfo } from './types'

export interface UserState {
  // 用户信息
  userInfo: UserInfo
}

export interface UserMutations {
  // 更新用户信息
  updateUserInfo: Action
}

const state: State<UserState> = {
  // 初始用户信息
  userInfo: {
    token: '',
    userName: '',
    userId: '',
    rank: '',
    rankDesc: '',
    deptId: '',
    deptName: '',
  },
}

const mutations: Mutations<UserMutations> = {
  // 更新用户信息
  updateUserInfo(state) {
    const newState = { ...state }

    return newState
  },
}

export default { state, mutations }
