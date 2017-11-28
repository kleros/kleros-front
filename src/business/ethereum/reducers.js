import {
  REQUEST_BALANCE,
  FAILURE_BALANCE,
  RECEIVE_BALANCE,
  REQUEST_ADDRESS,
  FAILURE_ADDRESS,
  RECEIVE_ADDRESS
} from './actions'

export function requestBalance (state = false, action) {
  switch (action.type) {
    case REQUEST_BALANCE:
      return action.isFetching
    default:
      return state
  }
}

export function failureBalance (state = false, action) {
  switch (action.type) {
    case FAILURE_BALANCE:
      return action.hasErrored
    default:
      return state
  }
}

export function balance (state = [], action) {
  switch (action.type) {
    case RECEIVE_BALANCE:
      return action.balance
    default:
      return state
  }
}

export function requestAddress (state = false, action) {
  switch (action.type) {
    case REQUEST_ADDRESS:
      return action.isFetching
    default:
      return state
  }
}

export function failureAddress (state = false, action) {
  switch (action.type) {
    case FAILURE_ADDRESS:
      return action.hasErrored
    default:
      return state
  }
}

export function address (state = 0x0, action) {
  switch (action.type) {
    case RECEIVE_ADDRESS:
      return action.address ? action.address : null
    default:
      return state
  }
}
