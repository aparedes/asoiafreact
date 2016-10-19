/* @flow */

import * as Immutable from 'immutable'
import type { Map } from 'immutable'

type ActionType = {
  type: string,
  allHouses: Map<string, *>,
}
export default function(state: Map<string, *> = new Immutable.Map(), action: ActionType) {
  switch (action.type) {
    case 'GET_ALL_HOUSES':
      return state.set('getting_all', true)
    case 'GOT_ALL_HOUSES':
      return action.allHouses
    default:

  }
  return state
}
