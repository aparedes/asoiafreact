import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  search?: string;
  region?: string;
}

function initState(): AppState {
  return {} as AppState;
}

const appSlice = createSlice({
  name: 'app',
  initialState: initState(),
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
  },
});

export const { actions: appActions, reducer: appReducer } = appSlice;
