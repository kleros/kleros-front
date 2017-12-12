import {
  REQUEST_DISPUTES,
  FAILURE_DISPUTES,
  RECEIVE_DISPUTES,
  REQUEST_CASE_DATA,
  FAILURE_CASE_DATA,
  RECEIVE_CASE_DATA,
  SUBMIT_RULING,
  RULING_SUBMITTED,
  RULING_FAILED,
  REDISTRIBUTE_SUBMITTED,
  EXECUTE_SUBMITTED
} from './actions'

export function requestDisputes (state = true, action) {
  switch (action.type) {
    case REQUEST_DISPUTES:
      return action.isFetching
    default:
      return state
  }
}

export function failureDisputes (state = false, action) {
  switch (action.type) {
    case FAILURE_DISPUTES:
      return action.hasErrored
    default:
      return state
  }
}

export function disputes (state = [], action) {
  switch (action.type) {
    case RECEIVE_DISPUTES:
      return action.disputes
    default:
      return state
  }
}

export function requestCaseData (state = true, action) {
  switch (action.type) {
    case REQUEST_CASE_DATA:
      return action.isFetching
    default:
      return state
  }
}

export function failureCaseData (state = false, action) {
  switch (action.type) {
    case FAILURE_CASE_DATA:
      return action.hasErrored
    default:
      return state
  }
}

export function caseData (state = [], action) {
  switch (action.type) {
    case RECEIVE_CASE_DATA:
      return action.caseData
    default:
      return state
  }
}

export function submitRuling (state = [], action) {
  switch (action.type) {
    case SUBMIT_RULING:
      return action.isSubmitting
    default:
      return state
  }
}

export function rulingSubmitted (state = [], action) {
  switch (action.type) {
    case RULING_SUBMITTED:
      return action.tx
    default:
      return state
  }
}

export function rulingFailed (state = [], action) {
  switch (action.type) {
    case RULING_FAILED:
      return action.hasErrored
    default:
      return state
  }
}

export function redistibuteJurorTokensSubmitted (state = false, action) {
  switch (action.type) {
    case REDISTRIBUTE_SUBMITTED:
      return action.isSubmitting
    default:
      return state
  }
}

export function executeSubmitted (state = false, action) {
  switch (action.type) {
    case EXECUTE_SUBMITTED:
      return action.isSubmitting
    default:
      return state
  }
}
