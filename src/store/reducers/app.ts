export enum AppEnum {
  SET_SEARCH = 'SET_SEARCH',
  SET_REGION = 'SET_REGION',
}
interface SET_SEARCH {
  type: AppEnum.SET_SEARCH;
  search: string;
}

interface SET_REGION {
  type: AppEnum.SET_REGION;
  region: string;
}

export type Action = SET_REGION | SET_SEARCH;

export interface AppState {
  search?: string;
  region?: string;
}

function initState(): AppState {
  return {} as AppState;
}

export default function (
  state: AppState = initState(),
  action: Action
): AppState {
  switch (action.type) {
    case AppEnum.SET_SEARCH:
      return { search: action.search };
    case AppEnum.SET_REGION:
      return { region: action.region };
    default:
      return state;
  }
}
