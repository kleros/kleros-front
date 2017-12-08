import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ethereum from '../redux/ethereum'
import disputes from '../redux/disputes'
import contracts from '../redux/contracts'

export default combineReducers({
  ethereum,
  disputes,
  contracts,
  form: formReducer
})
