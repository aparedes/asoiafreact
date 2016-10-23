/* @flow */
type ActionType = {
  type: string,
  search: string,
}

export default function (state: Object = { }, action: ActionType) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { search:  action.search }
    default:

  }
  return state
}
