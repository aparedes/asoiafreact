/* @flow */
type SET_SEARCH = { type: 'SET_SEARCH', search: string };
type SET_REGION = { type: 'SET_REGION', region: string };
export type Action = SET_REGION | SET_SEARCH;

export default function(state: Object = {}, action: Action) {
  if (action) {
    switch (action.type) {
      case 'SET_SEARCH':
        return { search: action.search };
      case 'SET_REGION':
        return { region: action.region };
      default:
    }
  }
  return state;
}
