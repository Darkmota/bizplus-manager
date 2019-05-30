
import { combineReducers } from 'redux'
import user from './reducer/user'
import lang from './reducer/lang'

export default combineReducers({
  user,
  lang
})
