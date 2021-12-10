import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './sagas/rootSaga';

import {  configureStore } from '@reduxjs/toolkit';
// import {createLogger} from 'redux-logger';

// let middleware: StoreEnhancer<{ dispatch: Dispatch }, {}>;
const sagaMiddleware = createSagaMiddleware({
  onError: (error: Error) => {
    console.error('UNCAUGHT SAGA ERROR', error.message, error.stack);
  },
});
let middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  // const logger = createLogger()
  // middleware.concat([applyMiddleware(logger)]);
}
// else {
//   middleware = applyMiddleware(sagaMiddleware);
// // }

// export type StoreType = Store<ReduxState, ReduxActions>;
// export default function configureStore(): StoreType {
//   const store: StoreType = createStore(rootReducer, compose(middleware));
//   sagaMiddleware.run(rootSaga);
//   return store;
// }

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare({ thunk: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
