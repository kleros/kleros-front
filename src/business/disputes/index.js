import { combineReducers } from 'redux'
import {
  requestDisputes,
  failureDisputes,
  disputes
} from './reducers'

export default combineReducers({
  requestDisputes,
  failureDisputes,
  disputes
})
