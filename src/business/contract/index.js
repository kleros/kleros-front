import { combineReducers } from 'redux'
import {
  fetchPostContract,
  failureContract,
  address
} from './reducers'

export default combineReducers({
  fetchPostContract,
  failureContract,
  address
})
