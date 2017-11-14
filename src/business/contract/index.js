import { combineReducers } from 'redux'
import {
  fetchPostContract,
  failurePostContract,
  address,
  requestContract,
  failureContract,
  contract,
  requestContracts,
  failureContracts,
  contracts,
  raiseDisputeContract,
  addEvidenceContract
} from './reducers'

export default combineReducers({
  fetchPostContract,
  failurePostContract,
  address,
  requestContract,
  failureContract,
  contract,
  requestContracts,
  failureContracts,
  contracts,
  raiseDisputeContract,
  addEvidenceContract
})
