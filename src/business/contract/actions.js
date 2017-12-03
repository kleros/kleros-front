export const FETCH_POST_CONTRACT = 'FETCH_POST_CONTRACT'
export const FAILURE_POST_CONTRACT = 'FAILURE_POST_CONTRACT'
export const RECEIVE_ADDRESS_CONTRACT = 'RECEIVE_ADDRESS_CONTRACT'
export const REQUEST_CONTRACT = 'REQUEST_CONTRACT'
export const FAILURE_CONTRACT = 'FAILURE_CONTRACT'
export const RECEIVE_CONTRACT = 'RECEIVE_CONTRACT'
export const REQUEST_CONTRACTS = 'REQUEST_CONTRACTS'
export const FAILURE_CONTRACTS = 'FAILURE_CONTRACTS'
export const RECEIVE_CONTRACTS = 'RECEIVE_CONTRACTS'
export const RAISE_DISPUTE_CONTRACT = 'RAISE_DISPUTE_CONTRACT'
export const REQUEST_RAISE_DISPUTE_CONTRACT = 'REQUEST_RAISE_DISPUTE_CONTRACT'
export const FAILURE_RAISE_DISPUTE = 'FAILURE_RAISE_DISPUTE'
export const ADD_EVIDENCE_CONTRACT = 'ADD_EVIDENCE_CONTRACT'
// TODO add REQUEST_ADD_EVIDENCE_CONTRACT and RECEIVE_ADD_EVIDENCE_CONTRACT

export const fetchPostContract = isFetching => {
  return {
    type: FETCH_POST_CONTRACT,
    isFetching
  }
}

export const failurePostContract = hasErrored => {
  return {
    type: FAILURE_POST_CONTRACT,
    hasErrored
  }
}

export const postSuccessContract = address => {
  return {
    type: RECEIVE_ADDRESS_CONTRACT,
    address
  }
}

export const requestContract = isFetching => {
  return {
    type: REQUEST_CONTRACT,
    isFetching
  }
}

export const failureContract = hasErrored => {
  return {
    type: FAILURE_CONTRACT,
    hasErrored
  }
}

export const receiveContract = data => {
  return {
    type: RECEIVE_CONTRACT,
    data
  }
}

export const requestContracts = isFetching => {
  return {
    type: REQUEST_CONTRACTS,
    isFetching
  }
}

export const failureContracts = hasErrored => {
  return {
    type: FAILURE_CONTRACTS,
    hasErrored
  }
}

export const receiveContracts = data => {
  return {
    type: RECEIVE_CONTRACTS,
    data
  }
}

export const raiseDisputeContract = raiseDisputeContractTx => {
  return {
    type: RAISE_DISPUTE_CONTRACT,
    raiseDisputeContractTx
  }
}

export const requestRaiseDispute = isRaisingDispute => {
  return {
    type: REQUEST_RAISE_DISPUTE_CONTRACT,
    isRaisingDispute
  }
}

export const failureRaiseDispute = hasErrored => {
  return {
    type: FAILURE_RAISE_DISPUTE,
    hasErrored
  }
}

export const addEvidenceContract = addEvidenceContractTx => {
  return {
    type: ADD_EVIDENCE_CONTRACT,
    addEvidenceContractTx
  }
}
