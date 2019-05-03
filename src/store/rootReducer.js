/* @flow */
import AppReducer from './reducers/app';
import HousesReducer from './reducers/housesReducer';
import { combineReducers } from 'redux';
import type { ReduxActions, ReduxState } from './constants/reduxTypes';
import type { CombinedReducer } from 'redux';

const rootReducer: CombinedReducer<ReduxState, ReduxActions> = combineReducers({
  app: AppReducer,
  houses: HousesReducer,
});

export default rootReducer;
