import { combineReducers } from 'redux'
import {
  fetchPostContract,
  failureContract,
  hashtx
} from './reducers'

export default combineReducers({
  fetchPostContract,
  failureContract,
  hashtx
})
