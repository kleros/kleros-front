export const FETCH_POST_CONTRACT = 'REQUEST_DISPUTES'
export const FAILURE_POST_CONTRACT = 'FAILURE_POST_CONTRACT'
export const RECEIVE_ADDRESS = 'RECEIVE_ADDRESS'
export const REQUEST_CONTRACT = 'REQUEST_CONTRACT'
export const FAILURE_CONTRACT = 'FAILURE_CONTRACT'
export const RECEIVE_CONTRACT = 'RECEIVE_CONTRACT'

export const fetchPostContract = isFetching => {
  return {
    type: FETCH_POST_CONTRACT,
    isFetching
  }
}

export const failurePostContract = hasErrored => {
  return {
    type: FAILURE_POST_CONTRACT,
    hasErrored
  }
}

export const postSuccessContract = address => {
  return {
    type: RECEIVE_ADDRESS,
    address
  }
}

export const requestContract = isFetching => {
  return {
    type: REQUEST_CONTRACT,
    isFetching
  }
}

export const failureContract = hasErrored => {
  return {
    type: FAILURE_CONTRACT,
    hasErrored
  }
}

export const receiveContract = data => {
  return {
    type: RECEIVE_CONTRACT,
    data
  }
}
