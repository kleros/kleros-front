export const REQUEST_BALANCE = 'REQUEST_BALANCE'
export const FAILURE_BALANCE = 'FAILURE_BALANCE'
export const RECEIVE_BALANCE = 'RECEIVE_BALANCE'

export const requestBalance = isFetching => {
  return {
    type: REQUEST_BALANCE,
    isFetching
  }
}

export const failureBalance = hasErrored => {
  return {
    type: FAILURE_BALANCE,
    hasErrored
  }
}

export const receiveBalance = balance => {
  return {
    type: RECEIVE_BALANCE,
    balance
  }
}
