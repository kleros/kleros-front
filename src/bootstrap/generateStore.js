import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import balanceReducer from '../business/balance/index';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState) {
  return createStore(
    balanceReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
}
