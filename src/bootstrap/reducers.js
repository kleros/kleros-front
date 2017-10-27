import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ethereum from '../business/ethereum'
import disputes from '../business/disputes'
import contract from '../business/contract'

export default combineReducers({
  ethereum,
  disputes,
  contract,
  form: formReducer
})
