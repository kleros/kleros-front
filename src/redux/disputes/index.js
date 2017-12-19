import { combineReducers } from 'redux'
import {
  requestDisputes,
  failureDisputes,
  disputes,
  requestCaseData,
  failureCaseData,
  redistibuteJurorTokensSubmitted,
  executeSubmitted
} from './reducers'

export default combineReducers({
  requestDisputes,
  failureDisputes,
  disputes,
  requestCaseData,
  failureCaseData,
  redistibuteJurorTokensSubmitted,
  executeSubmitted
})
