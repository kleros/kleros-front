import { combineReducers } from 'redux'
import {
  requestBalance,
  failureBalance,
  balance,
  requestAddress,
  failureAddress,
  address
} from './reducers'

export default combineReducers({
  requestBalance,
  failureBalance,
  balance,
  requestAddress,
  failureAddress,
  address
})
