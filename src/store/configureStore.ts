import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './sagas/rootSaga';

import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware({
  onError: (error: Error) => {
    console.error('UNCAUGHT SAGA ERROR', error.message, error.stack);
  },
});

const middleware = [sagaMiddleware] as Middleware[];
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleWare) => [
    ...defaultMiddleWare({ thunk: false }),
    ...middleware,
  ],
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
