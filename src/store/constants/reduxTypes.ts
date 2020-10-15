import { Action as AppAction, AppState } from '../reducers/app';
import { Map } from 'immutable';
import { Dispatch as ReduxDispatch } from 'redux';
import { HouseAction } from '../reducers/housesReducer';

export interface ReduxState {
  app: AppState;
  houses: Map<string, unknown>;
}
export type ReduxActions = AppAction | HouseAction;
export type Dispatch = ReduxDispatch<ReduxActions>;
