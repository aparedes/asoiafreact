import { Action as AppAction, AppState } from '../reducers/app';
import { Map } from 'immutable';
import { Dispatch as ReduxDispatch } from 'redux';

export interface ReduxState {
  app: AppState;
  houses: Map<string, unknown>;
}
export type ReduxActions = AppAction;
export type Dispatch = ReduxDispatch<ReduxActions>;
