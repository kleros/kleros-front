import { combineReducers } from 'redux'
import {
  fetchPostContract,
  failurePostContract,
  address,
  requestContract,
  failureContract,
  data
} from './reducers'

export default combineReducers({
  fetchPostContract,
  failurePostContract,
  address,
  requestContract,
  failureContract,
  data
})
