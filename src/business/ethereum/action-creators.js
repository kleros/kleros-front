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

export const balanceFetchData = () => async dispatch => {
  dispatch(requestBalance(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.court

    const balance = await court.getPNKBalance(process.env.REACT_APP_ARBITRATOR_ADDRESS)
    dispatch(requestBalance(false))
    dispatch(receiveBalance(balance))
  } catch (e) {
    // FIXME display a user-friendly error
    dispatch(failureBalance(true))
  }
}

export const fetchAddress = (account = 0) => async dispatch => {
  dispatch(requestAddress(true))
  try {
    let web3 = await getWeb3()
    // use async method to ensure that web3 has loaded
    const accounts = await new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, accounts) => {
        if (err) reject(err)
        resolve(accounts)
      })
    })
    dispatch(requestAddress(false))
    dispatch(receiveAddress(accounts[account]))
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
