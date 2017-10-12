import {
  FETCH_POST_CONTRACT,
  FAILURE_CONTRACT,
  RECEIVE_DISPUTES
} from './actions'

export function requestDisputes (state = false, action) {
  switch (action.type) {
    case FETCH_POST_CONTRACT:
      return action.isFetching
    default:
      return state
  }
}

export function failureDisputes (state = false, action) {
  switch (action.type) {
    case FAILURE_CONTRACT:
      return action.hasErrored
    default:
      return state
  }
}

export function disputes (state = 0x0, action) {
  switch (action.type) {
    case RECEIVE_DISPUTES:
      return action.disputes
    default:
      return state
  }
}
