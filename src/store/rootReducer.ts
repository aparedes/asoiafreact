/* @flow */
import AppReducer from './reducers/app';
import HousesReducer from './reducers/housesReducer';
import { combineReducers } from 'redux';
import {  ReduxState } from './constants/reduxTypes';

const rootReducer = combineReducers<ReduxState>({
  app: AppReducer,
  houses: HousesReducer,
});

export default rootReducer;
