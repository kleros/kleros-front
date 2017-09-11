import { combineReducers } from 'redux'
import {
  requestBalance,
  failureBalance,
  balance
} from './reducers'

export default combineReducers({
  requestBalance,
  failureBalance,
  balance
})
