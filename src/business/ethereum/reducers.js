import {
  REQUEST_BALANCE,
  FAILURE_BALANCE,
  RECEIVE_BALANCE
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
