import { Action as AppAction } from '../reducers/app';
import type { Map } from 'immutable';

export type ReduxState = { app: Object, houses: Map<string, *> };
export type ReduxActions = AppAction;
