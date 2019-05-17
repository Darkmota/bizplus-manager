
import { combineReducers } from 'redux'
import user from './reducer/user'
import visibility from './reducer/visibility'

export default combineReducers({
  user,
  visibility
})
