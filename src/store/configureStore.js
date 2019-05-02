/* @flow */
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './sagas/rootSaga';

let middleware: (root: Object, state: Object) => Object;
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

export default function configureStore(initialState: Object): Object {
  const store = createStore(rootReducer, compose(middleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
