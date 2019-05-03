/* @flow */

import { Map } from 'immutable';
import type { List, Set } from 'immutable';

type GET_ALL_HOUSES = { type: 'GET_ALL_HOUSES' };
type GET_ALL_HOUSES_ERROR = { type: 'GET_ALL_HOUSES_ERROR', error: string };
type GOT_ALL_HOUSES = {
  type: 'GOT_ALL_HOUSES',
  allHousesIds: List<string>,
  allHouses: Map<string, *>,
  regions: Set<string>,
};
type GET_HOUSE = { type: 'GET_HOUSE', houseId: string };
type GET_HOUSE_ERROR = {
  type: 'GET_HOUSE_ERROR',
  houseId: string,
  error: string,
};
type GOT_HOUSE = { type: 'GOT_HOUSE', houseId: string, house: Map<string, *> };
export type Action =
  | GET_ALL_HOUSES
  | GET_ALL_HOUSES_ERROR
  | GOT_ALL_HOUSES
  | GET_HOUSE_ERROR
  | GOT_HOUSE
  | GET_HOUSE;
export default function(state: Map<string, *>, action: Action) {
  if (!state) {
    state = Map();
  }
  if (action) {
    switch (action.type) {
      // ALL HOUSES
      case 'GET_ALL_HOUSES':
        return state.setIn(['getting_all'], true);
      case 'GET_ALL_HOUSES_ERROR':
        return state
          .removeIn(['getting_all'])
          .setIn(['error_all'], action.error);
      case 'GOT_ALL_HOUSES':
        return state
          .removeIn(['getting_all'])
          .setIn(['houses'], action.allHouses)
          .setIn(['housesIds'], action.allHousesIds)
          .setIn(['regions'], action.regions);
      // SINGLE HOUSE
      case 'GET_HOUSE':
        return state.setIn(['houses', action.houseId, 'getting'], true);
      case 'GET_HOUSE_ERROR':
        return state
          .removeIn(['houses', action.houseId, 'getting'])
          .setIn(['houses', action.houseId, 'error'], action.error);
      case 'GOT_HOUSE':
        return state
          .mergeIn(['houses', action.houseId], action.house)
          .removeIn(['houses', action.houseId, 'getting'])
          .removeIn(['houses', action.houseId, 'error']);
      default:
    }
  }
  return state;
}
