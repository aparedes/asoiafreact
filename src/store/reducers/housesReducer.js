/* @flow */

import * as Immutable from 'immutable'
import type { List, Map, Set } from 'immutable'

type ActionType = {
  type: string,
  allHouses: Map<string, *>,
  allHousesIds: List<string>,
  houseId: string,
  house: Map<string, *>,
  error: string,
  regions: Set<string>,
}
export default function (state: Map<string, *> = new Immutable.Map(), action: ActionType) {
  if (action) {
    switch (action.type) {
      // ALL HOUSES
      case 'GET_ALL_HOUSES':
        return state.set('getting_all', true)
      case 'GET_ALL_HOUSES_ERROR':
        return state.remove('getting_all')
                    .set('error_all', action.error)
      case 'GOT_ALL_HOUSES':
        return state.remove('getting_all')
                    .set('houses', action.allHouses)
                    .set('housesIds', action.allHousesIds)
                    .set('regions', action.regions)
      // SINGLE HOUSE
      case 'GET_HOUSE':
        return state.setIn([ 'houses', action.houseId, 'getting' ], true)
      case 'GET_HOUSE_ERROR':
        return state.removeIn([ 'houses', action.houseId, 'getting' ])
                    .setIn([ 'houses', action.houseId, 'error' ], action.error)
      case 'GOT_HOUSE':
        return state.mergeIn([ 'houses', action.houseId ], action.house)
                    .removeIn([ 'houses', action.houseId, 'getting' ])
                    .removeIn([ 'houses', action.houseId, 'error' ])
      default:
    }
  }
  return state
}
