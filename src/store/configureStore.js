/* @flow */
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './sagas/rootSaga';

import type { ReduxActions, ReduxState } from './constants/reduxTypes';
import type { Store, StoreEnhancer } from 'redux';

let middleware: StoreEnhancer<ReduxState, ReduxActions>;
const sagaMiddleware = createSagaMiddleware({
  onError: (error: Error) => {
    console.error('UNCAUGHT SAGA ERROR', error.message, error.stack);
  },
});
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger();
  middleware = applyMiddleware(loggerMiddleware, sagaMiddleware);
} else {
  middleware = applyMiddleware(sagaMiddleware);
}

export type StoreType = Store<ReduxState, ReduxActions>;
export default function configureStore(initialState: Object): StoreType {
  const store: StoreType = createStore(rootReducer, compose(middleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
