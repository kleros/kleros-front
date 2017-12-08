import { Kleros } from 'kleros-api'
import {
  requestDisputes,
  failureDisputes,
  receiveDisputes,
  requestCaseData,
  receiveCaseData,
  submitRuling,
  rulingSubmitted,
  rulingFailed,
  submitRedistributeJurorTokens,
  submitExecute
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

export const getDisputes = (
  account = 0
) => async dispatch => {
  dispatch(requestDisputes(true))

  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    const disputes = await KlerosInstance.disputes.getDisputesForUser(
      process.env.REACT_APP_ARBITRATOR_ADDRESS,
      web3.eth.accounts[account]
    )
    console.log(disputes)
    await dispatch(receiveDisputes(disputes))
    await dispatch(requestDisputes(false))
  } catch (e) {
    // FIXME display a user-friendly error
    throw e
  }
}

export const submitDisputeResolution = (
  ruling,
  disputeId,
  votes,
  hash,
  account = 0
) => async dispatch => {
  dispatch(submitRuling(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    const submittedRulingTx = await KlerosInstance.disputes.submitVotesForDispute(
      process.env.REACT_APP_ARBITRATOR_ADDRESS,
      disputeId,
      ruling,
      votes,
      hash,
      web3.eth.accounts[account]
    )
    dispatch(rulingSubmitted(submittedRulingTx))
    dispatch(submitRuling(false))
  } catch (e) {
    dispatch(rulingFailed(true))
    // FIXME display a user-friendly error //
    throw e
  }
}

export const getDisputeForContract = (
  arbitratedContractAddress,
  account = 0
) => async dispatch => {
  dispatch(requestCaseData(true))

  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    // FIXME use a variable input for user to set their court contract
    const disputeData = await KlerosInstance.disputes.getDataForDispute(
      arbitratedContractAddress,
      web3.eth.accounts[account]
    )
    // use same reducer as fetch disputes
    await dispatch(receiveCaseData(disputeData))
    await dispatch(requestCaseData(false))
  } catch (e) {
    // FIXME display a user-friendly error
    throw e
  }
}

export const appealDispute = (disputeId, extraData) => async dispatch => {
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.klerosPOC
    await court.appealRuling(process.env.REACT_APP_ARBITRATOR_ADDRESS, disputeId, extraData)
  } catch (e) {
    throw e
  }
}

export const repartitionJurorTokens = disputeId => async dispatch => {
  dispatch(submitRedistributeJurorTokens(true))
  try {
    const web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.klerosPOC
    await court.repartitionJurorTokens(process.env.REACT_APP_ARBITRATOR_ADDRESS, disputeId)
    dispatch(submitRedistributeJurorTokens(false))
  } catch (e) {
    throw e
  }
}

export const executeRuling = disputeId => async dispatch => {
  dispatch(submitExecute(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.klerosPOC
    await court.executeRuling(process.env.REACT_APP_ARBITRATOR_ADDRESS, disputeId)
    dispatch(submitExecute(false))
  } catch (e) {
    throw e
  }
}
