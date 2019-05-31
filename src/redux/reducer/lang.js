import {
  ACTION_CHANGE_LANG,
  ACTION_INIT_DATA,
  ACTION_SAVE_DATA
} from '../actionTypes'

const initializationState = {
  currentLang: 'jp',
  allLangs: ['jp', 'cn', 'en'],
  data: {}
}

export default (state = initializationState, action) => {
  switch (action.type) {
    case ACTION_INIT_DATA:
      return {
        ...state,
        data: action.data
      }
    case ACTION_CHANGE_LANG:
      return {
        ...state,
        ...action.data
      }
    case ACTION_SAVE_DATA:
      let newState = { ...state }
      newState.data = { ...action.data }
      
      return newState
    default:
      return state
  }
}
