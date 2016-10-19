/* @flow */

type ActionType = {
  type: string,
  name: string,
}

export default function(state: Object = {}, action: ActionType) {
  switch (action.type) {
    case 'SET_NAME':
      state = Object.assign(state, { name: action.name })
      break;
    default:

  }
  return state
}
