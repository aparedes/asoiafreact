/* @flow */
import AppReducer from './reducers/app'
import HousesReducer from './reducers/houses'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  app: AppReducer,
  houses: HousesReducer,
})

export default rootReducer
