export const FETCH_POST_CONTRACT = 'REQUEST_DISPUTES'
export const FAILURE_CONTRACT = 'FAILURE_CONTRACT'
export const RECEIVE_ADDRESS = 'RECEIVE_ADDRESS'

export function fetchPostContract (isFetching = false) {
  return {
    type: FETCH_POST_CONTRACT,
    isFetching
  }
}

export function failureContract (hasErrored = false) {
  return {
    type: FAILURE_CONTRACT,
    hasErrored
  }
}

export function postSuccessContract (address = 0x0) {
  return {
    type: RECEIVE_ADDRESS,
    address
  }
}
