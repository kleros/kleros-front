export const REQUEST_DISPUTES = 'REQUEST_DISPUTES'
export const FAILURE_DISPUTES = 'FAILURE_DISPUTES'
export const RECEIVE_DISPUTES = 'RECEIVE_DISPUTES'

export function requestDisputes (isFetching = true) {
  return {
    type: REQUEST_DISPUTES,
    isFetching
  }
}

export function failureDisputes (hasErrored = false) {
  return {
    type: FAILURE_DISPUTES,
    hasErrored
  }
}

export function receiveDisputes (disputes = []) {
  return {
    type: RECEIVE_DISPUTES,
    disputes
  }
}
