/* @flow */
import './App.css';

import React, { useEffect } from 'react';

import HousesList from './housesList/housesList';

import SearchHouse from './searchHouse/searchHouse';
import Regions from './regions/regions';
import { useDispatch } from 'react-redux';
import { Dispatch } from './store/constants/reduxTypes';
import { houseActions } from './store/reducers/housesReducer';

export function App() {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch(houseActions.getAllHouses());
  }, [dispatch]);
  return (
    <div className={'App'}>
      <SearchHouse />
      <HousesList />
      <Regions />
    </div>
  );
}

export default App;
