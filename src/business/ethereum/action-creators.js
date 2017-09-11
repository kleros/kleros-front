import {
  requestBalance,
  failureBalance,
  receiveBalance
} from './actions'

const asyncWeb3GetBalance = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(42)
    }, 2000)
  })
}

export const balanceFetchData = () => {
  return dispatch => {
    dispatch(requestBalance(true))

    asyncWeb3GetBalance()
      .then(response => {
        dispatch(requestBalance(false))
        dispatch(receiveBalance(response))
      })
      .catch(() => dispatch(failureBalance(true)))
  }
}
