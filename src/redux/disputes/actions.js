export const REQUEST_DISPUTES = 'REQUEST_DISPUTES'
export const FAILURE_DISPUTES = 'FAILURE_DISPUTES'
export const RECEIVE_DISPUTES = 'RECEIVE_DISPUTES'
export const REQUEST_CASE_DATA = 'REQUEST_CASE_DATA'
export const FAILURE_CASE_DATA = 'FAILURE_CASE_DATA'
export const RECEIVE_CASE_DATA = 'RECEIVE_CASE_DATA'
export const SUBMIT_RULING = 'SUBMIT_RULING'
export const RULING_SUBMITTED = 'RULING_SUBMITTED'
export const RULING_FAILED = 'RULING_FAILED'
export const EXECUTE_SUBMITTED = 'EXECUTE_SUBMITTED'
export const REDISTRIBUTE_SUBMITTED = 'REDISTRIBUTE_SUBMITTED'
// TODO execute and redistibute failure cases

export function requestDisputes (isFetching = true) {
  return {
    type: REQUEST_DISPUTES,
    isFetching
  }
}

export function failureDisputes (hasErrored = false) {
  return {
    type: FAILURE_DISPUTES,
    hasErrored
  }
}

export function receiveDisputes (disputes = []) {
  return {
    type: RECEIVE_DISPUTES,
    disputes
  }
}

export function requestCaseData (isFetching = true) {
  return {
    type: REQUEST_CASE_DATA,
    isFetching
  }
}

export function failureCaseData (hasErrored = false) {
  return {
    type: FAILURE_CASE_DATA,
    hasErrored
  }
}

export function receiveCaseData (caseData = null) {
  return {
    type: RECEIVE_CASE_DATA,
    caseData
  }
}

export function rulingSubmitted (tx = null) {
  return {
    type: RULING_SUBMITTED,
    tx
  }
}

export function submitRuling (isSubmitting = false) {
  return {
    type: SUBMIT_RULING,
    isSubmitting
  }
}

export function rulingFailed (hasErrored = false) {
  return {
    type: RULING_FAILED,
    hasErrored
  }
}

export function submitRedistributeJurorTokens (isSubmitting = false) {
  return {
    type: REDISTRIBUTE_SUBMITTED,
    isSubmitting
  }
}

export function submitExecute (isSubmitting = false) {
  return {
    type: EXECUTE_SUBMITTED,
    isSubmitting
  }
}
