/* @flow */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type House = {
  id: string;
  region: string;
  name: string;
  currentLord?: {
    name: string;
  };
  coatOfArms?: string;
  words?: string;
  error?: string;
  getting?: boolean;
};

export type HouseState = {
  gettingAll: boolean;
  errorAll?: string;
  housesIds?: string[];
  houses: House[];
  regions?: Readonly<string[]>;
};

const { actions, reducer } = createSlice({
  name: 'house',
  initialState: {
    gettingAll: false,
    houses: [],
    regions: [],
    housesIds: [],
  } as HouseState,
  reducers: {
    getAllHouses(state) {
      state.gettingAll = true;
    },
    getAllHousesError(state, action) {
      state.gettingAll = false;
      state.errorAll = action.payload;
    },
    gotAllHouses(
      state,
      action: PayloadAction<{
        allHouses: House[];
        allHousesIds: string[];
        regions: string[];
      }>
    ) {
      state.gettingAll = false;
      state.houses = action.payload.allHouses;
      state.housesIds = action.payload.allHousesIds;
      state.regions = action.payload.regions;
    },
    getHouse(state, action: PayloadAction<string>) {
      const houseId = state.houses.findIndex(
        (house) => house.id === action.payload
      );
      ((state.houses[houseId] as Record<string, unknown>) ?? {}).getting = true;
    },
    getHouseError(
      state,
      action: PayloadAction<{ houseId: string; error: string }>
    ) {
      const houseId = state.houses.findIndex(
        (house) => house.id === action.payload.houseId
      );
      ((state.houses[houseId] as Record<string, unknown>) ?? {}).getting =
        false;
      ((state.houses[houseId] as Record<string, unknown>) ?? {}).error =
        action.payload.error;
    },
    gotHouse(
      state,
      action: PayloadAction<{ houseId: string; house: Record<string, unknown> }>
    ) {
      const houseId = state.houses.findIndex(
        (house) => house.id === action.payload.houseId
      );
      ((state.houses[houseId] as Record<string, unknown>) ?? {}).getting =
        false;
      ((state.houses[houseId] as Record<string, unknown>) ?? {}).error = null;
      (state.houses[houseId] as Record<string, unknown>) = {
        ...state.houses[houseId],
        ...action.payload.house,
      };
    },
  },
});

export const houseReducer = reducer;
export const houseActions = actions;
