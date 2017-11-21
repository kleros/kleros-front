import { Kleros } from 'kleros-api'
import {
  requestDisputes,
  failureDisputes,
  receiveDisputes,
  requestCaseData,
  receiveCaseData,
  submitRuling,
  rulingSubmitted,
  rulingFailed
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

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.court

    const disputes = await court.getDisputesForUser(process.env.REACT_APP_ARBITRATOR_ADDRESS)
    await dispatch(receiveDisputes(disputes))
    await dispatch(requestDisputes(false))
  } catch (e) {
    // FIXME display a user-friendly error
    throw e
  }
}

export const submitDisputeResolution = (ruling, disputeId, votes, hash) => async dispatch => {
  dispatch(submitRuling(true))
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    let court = KlerosInstance.court

    const submittedRulingTx = await court.submitVotes(
      process.env.REACT_APP_ARBITRATOR_ADDRESS,
      disputeId,
      ruling,
      votes,
      hash
    )
    dispatch(rulingSubmitted(submittedRulingTx))
    dispatch(submitRuling(false))
  } catch (e) {
    dispatch(rulingFailed(true))
    // FIXME display a user-friendly error //
    throw e
  }
}

export const getDisputeById = hash => async dispatch => {
  dispatch(requestCaseData(true))

  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)

    // TODO use KlerosPOC
    let court = KlerosInstance.court
    // FIXME use a variable input for user to set their court contract
    const disputeData = await court.getDisputeByHash(hash, process.env.REACT_APP_ARBITRATOR_ADDRESS)
    // use same reducer as fetch disputes
    await dispatch(receiveCaseData(disputeData))
    await dispatch(requestCaseData(false))
  } catch (e) {
    // FIXME display a user-friendly error
    throw e
  }
}
