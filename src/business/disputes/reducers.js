import {
  REQUEST_DISPUTES,
  FAILURE_DISPUTES,
  RECEIVE_DISPUTES
} from './actions'

export function requestDisputes (state = false, action) {
  switch (action.type) {
    case REQUEST_DISPUTES:
      return action.isFetching
    default:
      return state
  }
}

export function failureDisputes (state = false, action) {
  switch (action.type) {
    case FAILURE_DISPUTES:
      return action.hasErrored
    default:
      return state
  }
}

export function disputes (state = [], action) {
  switch (action.type) {
    case RECEIVE_DISPUTES:
      return action.disputes
    default:
      return state
  }
}
