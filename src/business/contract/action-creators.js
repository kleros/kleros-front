import _ from 'lodash'
import { Kleros } from 'kleros-api'
import {
  fetchPostContract,
  failureContract,
  postSuccessContract
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

export const postContract = () => async dispatch => {
  try {
    let web3 = await getWeb3()

    let provider = web3.provider

    let KlerosInstance = await new Kleros(provider)

    let court = await KlerosInstance.court

    setTimeout(async () => {
      // await dispatch(receiveDisputes(disputes))
      // await dispatch(requestDisputes(false))
    }, 2000)
  } catch (err) {
    // FIXME send an error user-friendly
    throw err
  }
}
