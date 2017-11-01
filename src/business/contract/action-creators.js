import { Kleros } from 'kleros-api'
import {
  fetchPostContract,
  failurePostContract,
  postSuccessContract,
  requestContract,
  failureContract,
  receiveContract,
  raiseDisputeContract
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

    let KlerosInstance = new Kleros(
      provider,
      process.env.REACT_APP_STORE_PROVIDER
    )

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

export const contractFetchData = contractAddress => async dispatch => {
  dispatch(requestContract(true))

  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(
      provider,
      process.env.REACT_APP_STORE_PROVIDER
    )

    let arbitrableTransaction = await KlerosInstance.arbitrableTransaction

    const contractDataDeployed = await arbitrableTransaction
      .getDataContract(contractAddress)

    await dispatch(receiveContract(contractDataDeployed))
    await dispatch(requestContract(false))
  } catch (err) {
    dispatch(failureContract(true))
    throw new Error(err) // FIXME this error should not throw the execution
  }
}

export const contractRaiseDispute =
  (contract, arbitrationCost = 1000) => async (
    dispatch
  ) => {
  dispatch(requestContract(true))

  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(
      provider,
      process.env.REACT_APP_STORE_PROVIDER
    )

    let arbitrableTransaction = await KlerosInstance
      .arbitrableTransaction

    let arbitrableTransactionInstance = await arbitrableTransaction
      .load(contract.address)

    let raiseDisputeContractTx = 0x0

    if (KlerosInstance.getWeb3Wrapper().getAccount(0) === contract.partyA) {
      raiseDisputeContractTx = arbitrableTransactionInstance
        .payArbitrationFeeByPartyA()
    } else {
      raiseDisputeContractTx = arbitrableTransactionInstance
        .payArbitrationFeeByPartyB()
    }

    await dispatch(raiseDisputeContract(raiseDisputeContractTx))

    await dispatch(requestContract(false))
  } catch (err) {
    dispatch(failureContract(true))
    throw new Error(err) // FIXME this error should not throw the execution
  }
}

export const deployRNG = () => async dispatch => {
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let rng = await KlerosInstance.rng

    let contractDataDeployed = await rng.deploy()
  } catch (err) {
    throw new Error(err) // FIXME this error should not throw the execution
  }
}

export const deployPinakion = () => async dispatch => {
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let pinakion = await KlerosInstance.pinakion

    let contractDataDeployed = await pinakion.deploy()
  } catch (err) {
    throw new Error(err) // FIXME this error should not throw the execution
  }
}

export const deployKleros = () => async dispatch => {
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let kleros = await KlerosInstance.court

    let contractDataDeployed = await kleros.deploy()
    const data = await kleros.getData()
    console.log(data)
  } catch (err) {
    throw new Error(err) // FIXME this error should not throw the execution
  }
}

export const configureKleros = () => async dispatch => {
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let pnk = await KlerosInstance.pinakion
    let kleros = await KlerosInstance.court
    const pnkdata = await pnk.getData()
    console.log(pnkdata)
    const klerosdata = await kleros.getData()
    console.log(klerosdata)
    let setKleros = await pnk.setKleros()
    let transferOwnership = await pnk.transferOwnership()
  } catch (err) {
    throw new Error(err) // FIXME this error should not throw the execution
  }
}
