/* @flow */
import {  applyMiddleware, createStore  } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './sagas/rootSaga'

let createStoreWithMiddleware: (root: Object, state: Object) => Object
const sagaMiddleware = createSagaMiddleware({ onError: (error: Error) => { console.error('UNCAUGHT SAGA ERROR', error.message, error.stack) } })
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger()
  createStoreWithMiddleware = applyMiddleware(
     loggerMiddleware,
     sagaMiddleware
  )(createStore)
} else {
  createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware
  )(createStore)
}

export default function configureStore(initialState: Object): Object {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  sagaMiddleware.run(rootSaga)
  return store
}
