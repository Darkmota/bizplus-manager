import {
  ACTION_LOGIN,
  ACTION_LOGOUT
} from '../actionTypes'

const initializationState = {
  isLogin: false,
  username: 'omegaPi',
  token: ''
}

export default (state = initializationState, action) => {
  switch (action.type) {
    case ACTION_LOGIN:
      return {
        ...state,
        ...action.loginData
      }
    case ACTION_LOGOUT:
      return initializationState
    default:
      return state
  }
}
