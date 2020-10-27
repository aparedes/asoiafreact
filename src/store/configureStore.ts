/* @flow */
import {
  applyMiddleware,
  compose,
  createStore,
  // Middleware,
  StoreEnhancer,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './sagas/rootSaga';

import { Dispatch, ReduxActions, ReduxState } from './constants/reduxTypes';
import { Store } from 'redux';

let middleware: StoreEnhancer<{ dispatch: Dispatch }, {}>;
const sagaMiddleware = createSagaMiddleware({
  onError: (error: Error) => {
    console.error('UNCAUGHT SAGA ERROR', error.message, error.stack);
  },
});

// if (process.env.NODE_ENV === 'development') {
//   const loggerMiddleware: Middleware = createLogger();
//   middleware = applyMiddleware(loggerMiddleware, sagaMiddleware);
// } else {
  middleware = applyMiddleware(sagaMiddleware);
// }

export type StoreType = Store<ReduxState, ReduxActions>;
export default function configureStore(): StoreType {
  const store: StoreType = createStore(rootReducer, compose(middleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
