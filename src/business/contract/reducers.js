import {
  FETCH_POST_CONTRACT,
  FAILURE_CONTRACT,
  RECEIVE_ADDRESS
} from './actions'

export function fetchPostContract (state = false, action) {
  switch (action.type) {
    case FETCH_POST_CONTRACT:
      return action.isFetching
    default:
      return state
  }
}

export function failureContract (state = false, action) {
  switch (action.type) {
    case FAILURE_CONTRACT:
      return action.hasErrored
    default:
      return state
  }
}

export function address (state = 0x0, action) {
  switch (action.type) {
    case RECEIVE_ADDRESS:
      return action.address
    default:
      return state
  }
}
