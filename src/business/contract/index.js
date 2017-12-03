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
  requestRaiseDispute,
  failureRaiseDispute,
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
  requestRaiseDispute,
  failureRaiseDispute,
  addEvidenceContract
})
