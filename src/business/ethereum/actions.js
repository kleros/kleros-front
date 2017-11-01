export const REQUEST_BALANCE = 'REQUEST_BALANCE'
export const FAILURE_BALANCE = 'FAILURE_BALANCE'
export const RECEIVE_BALANCE = 'RECEIVE_BALANCE'
export const REQUEST_ADDRESS = 'REQUEST_ADDRESS'
export const FAILURE_ADDRESS = 'FAILURE_ADDRESS'
export const RECEIVE_ADDRESS = 'RECEIVE_ADDRESS'
export const BUYING_PINAKION = 'BUYING_PINAKION'
export const ACTIVATING_PINAKION = 'ACTIVATING_PINAKION'

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

export const requestAddress = isFetching => {
  return {
    type: REQUEST_ADDRESS,
    isFetching
  }
}

export const failureAddress = hasErrored => {
  return {
    type: FAILURE_ADDRESS,
    hasErrored
  }
}

export const receiveAddress = address => {
  return {
    type: RECEIVE_ADDRESS,
    address
  }
}

export const buyingPinakion = isBuying => {
  return {
    type: BUYING_PINAKION,
    isBuying
  }
}

export const activatingPinakion = isActivating => {
  return {
    type: ACTIVATING_PINAKION,
    isActivating
  }
}
