import { combineReducers } from 'redux'
import {
  requestDisputes,
  failureDisputes,
  disputes,
  requestCaseData,
  failureCaseData,
  caseData
} from './reducers'

export default combineReducers({
  requestDisputes,
  failureDisputes,
  disputes,
  requestCaseData,
  failureCaseData,
  caseData
})
