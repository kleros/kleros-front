import {
  requestBalance,
  failureBalance,
  receiveBalance,
  requestAddress,
  failureAddress,
  receiveAddress,
  buyingPinakion,
  activatingPinakion
} from './actions'
import { Kleros } from 'kleros-api'
import { getWeb3 } from '../../helpers/getWeb3'

// fetch account async to avoid race conditions. use for actions that are triggered on page load
const _getAccountSafe = async (
  account = 0
) => {
  try {
    let web3 = await getWeb3()

    const accounts = await new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, accounts) => {
        if (err) reject(err)
        resolve(accounts)
      })
    })

    return accounts[account]
  } catch (e) {
    throw e
  }
}

export const balanceFetchData = () => async dispatch => {
  dispatch(requestBalance(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.court
    const account = await _getAccountSafe()
    const balance = await court.getPNKBalance(process.env.REACT_APP_ARBITRATOR_ADDRESS, account)
    dispatch(requestBalance(false))
    dispatch(receiveBalance(balance))
  } catch (e) {
    console.log(e)
    // FIXME display a user-friendly error
    dispatch(failureBalance(true))
  }
}

export const fetchAddress = (account = 0) => async dispatch => {
  dispatch(requestAddress(true))
  try {
    // use async method to ensure that web3 has loaded
    const userAccount = await _getAccountSafe(account)
    dispatch(requestAddress(false))
    dispatch(receiveAddress(userAccount))
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

    const newBalance = await court.buyPNK(buyForm.amount, process.env.REACT_APP_ARBITRATOR_ADDRESS)
    dispatch(buyingPinakion(false))
    dispatch(receiveBalance(newBalance))
  } catch (e) {
    // FIXME display a user-friendly error
    throw e
  }
}

export const activatePinakion = activateForm => async dispatch => {
  dispatch(activatingPinakion(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.court

    const newBalance = await court.activatePNK(activateForm.amount, process.env.REACT_APP_ARBITRATOR_ADDRESS)
    dispatch(activatingPinakion(false))
    dispatch(receiveBalance(newBalance))
  } catch (e) {
    // FIXME display a user-friendly error
    throw e
  }
}
