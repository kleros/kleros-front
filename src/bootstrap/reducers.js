import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import balance from '../business/ethereum'
import disputes from '../business/disputes'

export default combineReducers({
  balance,
  disputes,
  form: formReducer
})
