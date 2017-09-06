export const REQUEST_BALANCE = 'REQUEST_BALANCE',
             FAILURE_BALANCE = 'FAILURE_BALANCE',
             RECEIVE_BALANCE = 'RECEIVE_BALANCE'

export function requestBalance(isFetching) {
  return {
    type: REQUEST_BALANCE,
    isFetching,
  };
}

export function failureBalance(hasErrored) {
  return {
    type: FAILURE_BALANCE,
    hasErrored,
  };
}

export function receiveBalance(balance) {
  return {
    type: RECEIVE_BALANCE,
    balance,
  };
}
