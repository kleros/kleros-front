import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import balance from '../business/ethereum'
import disputes from '../business/disputes'
import contract from '../business/contract'

export default combineReducers({
  balance,
  disputes,
  contract,
  form: formReducer
})
