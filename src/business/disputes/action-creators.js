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
  dispatch(requestDisputes(true))

  try {
    let web3 = await getWeb3()

    const provider = web3.provider

    let KlerosInstance = new Kleros(provider)

    let court = KlerosInstance.court

    const disputes = await court.getDisputes()

    await dispatch(receiveDisputes(disputes))
    await dispatch(requestDisputes(false))
  } catch (e) {
    // FIXME display a user-friendly error
    throw e
  }
}

export const submitDisputeResolution = (values) => async dispatch => {
  console.log(values)
  try {
    let web3 = await getWeb3()

    const provider = web3.provider

    let KlerosInstance = new Kleros(provider)

    let court = KlerosInstance.court
    // TODO submit decision to contract //
  } catch (e) {
    // FIXME display a user-friendly error //
    throw e
  }
}
