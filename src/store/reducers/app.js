/* @flow */
type ActionType = {
  type: string,
  search: string,
  region: string,
}

export default function (state: Object = { }, action: ActionType) {
  if (action) {
    switch (action.type) {
      case 'SET_SEARCH':
        return { search:  action.search }
      case 'SET_REGION':
        return { region: action.region }
      default:

    }
  }
  return state
}
