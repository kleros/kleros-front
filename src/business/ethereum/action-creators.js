import {
  requestBalance,
  failureBalance,
  receiveBalance
} from './actions'

export function errorAfterFiveSeconds() {
  return dispatch => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(failureBalance(true));
    }, 5000);
  };
}

export function balanceFetchData() {
  return dispatch => {
    dispatch(requestBalance(true));

    // TODO
    asyncWeb3GetBalance()
      .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        dispatch(requestBalance(false));

        return response;
      })
      .then(response => response.json())
      .then(balance => dispatch(receiveBalance(balance)))
      .catch(() => dispatch(failureBalance(true)));
  };
}
