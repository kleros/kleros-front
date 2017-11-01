import {
  requestBalance,
  failureBalance,
  receiveBalance,
  requestAddress,
  failureAddress,
  receiveAddress,
  buyingPinakion
} from './actions'
import { Kleros } from 'kleros-api'
import { getWeb3 } from '../../helpers/getWeb3'

export const balanceFetchData = () => async dispatch => {
  dispatch(requestBalance(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.court

    const balance = await court.getPNKBalance(process.env.REACT_APP_ARBITRATOR_ADDRESS)
    dispatch(requestBalance(false))
    dispatch(receiveBalance(balance.balance))
  } catch (e) {
    // FIXME display a user-friendly error
    dispatch(failureBalance(true))
  }
}

export const fetchAddress = (account = 0) => async dispatch => {
  dispatch(requestAddress(true))
  try {
    let web3 = await getWeb3()
    dispatch(requestAddress(false))
    dispatch(receiveAddress(web3.eth.accounts[account]))
  } catch (e) {
    // FIXME display a user-friendly error
    dispatch(failureAddress(true))
  }
}

export const buyPinakion = buyForm => async dispatch => {
  dispatch(buyingPinakion(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.court

    const newBalance = await court.buyPinakion(buyForm.amount, process.env.REACT_APP_ARBITRATOR_ADDRESS)
    dispatch(buyingPinakion(false))
    dispatch(receiveBalance(newBalance.balance))
  } catch (e) {
    // FIXME display a user-friendly error
    throw e
  }
}
