import _ from 'lodash'
import { Kleros } from 'kleros-api'
import {
  requestDisputes,
  failureDisputes,
  receiveDisputes
} from './actions'
import { getWeb3 } from '../../helpers/getWeb3'

export const errorAfterFiveSeconds = () => {
  return dispatch => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(failureDisputes(true))
    }, 5000)
  }
}

export const getDisputes = () => async dispatch => {
  try {
    // FIXME https://github.com/MetaMask/faq/blob/master/detecting_metamask.md#web3-deprecation

    // Use the browser's ethereum provider
    // FIXME bug when already runned
    let web3 = await getWeb3()

    let provider = web3.provider

    let KlerosInstance = await new Kleros(provider)

    let court = await KlerosInstance.court

    let disputes = await court.getDisputes()

    dispatch(requestDisputes(true))

    // FIXME simulate get disputes from Ethereum
    setTimeout(async () => {
      await dispatch(receiveDisputes(disputes))
      await dispatch(requestDisputes(false))
    }, 2000)
  } catch (err) {
    // FIXME send an error user-friendly
    throw err
  }
}
