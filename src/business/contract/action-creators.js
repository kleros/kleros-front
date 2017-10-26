import { Kleros } from 'kleros-api'
import {
  fetchPostContract,
  failurePostContract,
  postSuccessContract,
  requestContract,
  failureContract
} from './actions'
import { getWeb3 } from '../../helpers/getWeb3'

export const errorAfterFiveSeconds = () => {
  return dispatch => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(failureContract(true))
    }, 5000)
  }
}

export const deployContract = ({
  account = undefined,
  value = undefined,
  arbitrator,
  hashContract,
  timeout = 100,
  partyB,
  arbitratorExtraData = '',
  email = '',
  description = ''
}) => async dispatch => {
  await dispatch(fetchPostContract(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, 'https://kleros.im')

    console.log(KlerosInstance)

    let arbitrableTransaction = await KlerosInstance.arbitrableTransaction

    let contractArbitrable = await arbitrableTransaction.deploy(
      account,
      value,
      process.env.REACT_APP_ARBITRATOR_ADDRESS,
      hashContract,
      timeout,
      partyB,
      arbitratorExtraData,
      email,
      description
    )

    await dispatch(postSuccessContract(contractArbitrable.address))
    await dispatch(fetchPostContract(false))
  } catch (err) {
    dispatch(failurePostContract(true))
    // FIXME send an error user-friendly
    throw new Error(err)
  }
}

export const contractFetchData = address => async dispatch => {
  dispatch(requestContract(true))

  try {
    // TOOO
  } catch (err) {
    dispatch(failureContract(true))
    throw new Error(err) // FIXME this error should not throw the execution
  }
}
