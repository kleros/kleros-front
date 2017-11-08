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

export const contractRaiseDispute = (
  contract,
  arbitrationCost = 1500000000
) => async dispatch => {
  dispatch(requestContract(true))

  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(
      provider,
      process.env.REACT_APP_STORE_PROVIDER
    )

    let arbitrableTransaction = await KlerosInstance.arbitrableTransaction

    let contractInstance = await KlerosInstance.arbitrableTransaction.load(
      contract.address
    )

    // TODO move to  the kleros-api
    const partyAFeeContractInstance = await contractInstance.partyAFee()

    const courtInstance = await KlerosInstance.court.load(
      process.env.REACT_APP_ARBITRATOR_ADDRESS
    )

    const arbitrationCost = await courtInstance.arbitrationCost(
      partyAFeeContractInstance.toNumber()
    )

    let raiseDisputeContractTx = 0x0

    const addressParty = KlerosInstance.getWeb3Wrapper().getAccount(0)

    if (addressParty === contract.data.partyA) {
      raiseDisputeContractTx = await arbitrableTransaction
        .payArbitrationFeeByPartyA(
          undefined,
          contract.address,
          arbitrationCost.toNumber()
        )
    } else {
      raiseDisputeContractTx = await arbitrableTransaction
        .payArbitrationFeeByPartyB(
          undefined,
          contract.address,
          arbitrationCost.toNumber()
        )
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

    const rngInstance = await rng.deploy()
    await rng.getData(rngInstance.address)
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

    await pinakion.deploy()
  } catch (err) {
    throw new Error(err) // FIXME this error should not throw the execution
  }
}

export const deployKleros = (PNKAddress, RNGAddress) => async dispatch => {
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let kleros = await KlerosInstance.court

    await kleros.deploy(RNGAddress, PNKAddress)
  } catch (err) {
    throw new Error(err) // FIXME this error should not throw the execution
  }
}

export const configureKleros = (klerosAddress, PNKAddress) => async dispatch => {
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let pnk = await KlerosInstance.pinakion
    await pnk.setKleros(PNKAddress, klerosAddress)
    await pnk.transferOwnership(PNKAddress, klerosAddress)
  } catch (err) {
    throw new Error(err) // FIXME this error should not throw the execution
  }
}

export const getArbitratorData = (
  klerosAddress = process.env.REACT_APP_ARBITRATOR_ADDRESS
) => async dispatch => {
  dispatch(requestContract(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    const arbitrator = await KlerosInstance.court
    const data = await arbitrator.getData(klerosAddress)
    await dispatch(receiveContract(data))
    await dispatch(requestContract(false))
  } catch (e) {
    dispatch(failureContract(true))
    throw new Error(e) // FIXME this error should not throw the execution
  }
}

export const passPeriod = (
  klerosAddress = process.env.REACT_APP_ARBITRATOR_ADDRESS
) => async dispatch => {
  dispatch(requestContract(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    const arbitrator = await KlerosInstance.court
    const data = await arbitrator.passPeriod(klerosAddress)
    await dispatch(receiveContract(data))
    await dispatch(requestContract(false))
  } catch (e) {
    dispatch(failureContract(true))
    throw new Error(e) // FIXME this error should not throw the execution
  }
}

export const getContracts = (
  klerosAddress = process.env.REACT_APP_ARBITRATOR_ADDRESS
) => async dispatch => {
  try {
    
  } catch (e) {

  }
}
