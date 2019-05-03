import { Action as AppAction } from '../reducers/app';
import type { Map } from 'immutable';
import type { Dispatch as ReduxDispatch } from 'redux';

export type ReduxState = { app: Object, houses: Map<string, *> };
export type ReduxActions = AppAction;
export type Dispatch = ReduxDispatch<ReduxActions>;
