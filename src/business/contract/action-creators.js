import { Kleros } from 'kleros-api'
import {
  fetchPostContract,
  failurePostContract,
  postSuccessContract,
  requestContract,
  failureContract,
  receiveContract
} from './actions'
import Web3 from 'web3'

export const errorAfterFiveSeconds = () => {
  return dispatch => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(failureContract(true))
    }, 5000)
  }
}

export const deployContract = (
  account = undefined,
  value = 0,
  arbitrator,
  hashContract = 0x6aa0bb2779ab006be0739900654a89f1f8a2d7373ed38490a7cbab9c9392e1ff,
  timeout = 100,
  partyB,
  arbitratorExtraData = ''
) => async dispatch => {
  await dispatch(fetchPostContract(true))
  try {
    const provider = await new Web3
      .providers
      .HttpProvider(process.env.REACT_APP_ETHEREUM_PROVIDER)

    let KlerosInstance = await new Kleros(provider)

    // FIXME deploy a central court //

    let centralCourt = await KlerosInstance.centralCourt

    let centralCourtDeployed = await centralCourt.deploy()

    // End deploy a central court //

    let arbitrableTransaction = await KlerosInstance.arbitrableTransaction

    let contractArbitrable = await arbitrableTransaction.deploy(
      undefined,
      undefined,
      centralCourtDeployed.address,
      hashContract,
      timeout,
      partyB,
      arbitratorExtraData
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
    // const provider = await new Web3
    //   .providers
    //   .HttpProvider(process.env.REACT_APP_ETHEREUM_PROVIDER)
    //
    // let KlerosInstance = await new Kleros(provider)
    //
    // let centralCourt = await KlerosInstance.centralCourt

    // add the feature to get data of the contract on kleros-api
    // let centralCourtDeployed = await centralCourt.load(address)

    if (false) { // FIXME centralCourtDeployed
      dispatch(requestContract(false))
      dispatch(receiveContract({address: '0x', arbitrator: '0x'})) // FIXME mock
    }
  } catch (err) {
    dispatch(failureContract(true))
    throw new Error(err) // FIXME this error should not throw the execution
  }
}
