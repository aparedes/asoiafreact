/* @flow */

import * as Immutable from 'immutable'
import type { Map } from 'immutable'

type ActionType = {
  type: string,
  allHouses: Map<string, *>,
  houseId: string,
  house: Map<string, *>,
}
export default function(state: Map<string, *> = new Immutable.Map(), action: ActionType) {
  switch (action.type) {
    case 'GET_ALL_HOUSES':
      return state.set('getting_all', true)
    case 'GOT_ALL_HOUSES':
      return state.remove('getting_all')
                  .set('houses', action.allHouses)
    case 'GET_HOUSE':
      return state.setIn([ 'houses', action.houseId, 'getting' ], true)
    case 'GOT_HOUSE':
      return state.mergeIn([ 'houses', action.houseId ], action.house)
                  .removeIn([ 'houses', action.houseId, 'getting' ])
    default:

  }
  return state
}
