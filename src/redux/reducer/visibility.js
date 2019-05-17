import { ACTION_SET_VISIBILITY } from '../actionTypes'

const initializationState = {
  v: {}
}

export default (state = initializationState, action) => {
  switch (action.type) {
    case ACTION_SET_VISIBILITY:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}
