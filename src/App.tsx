/* @flow */
import './App.css';

import React, { useEffect } from 'react';

import HousesList from './housesList/housesList';

import SearchHouse from './searchHouse/searchHouse';
import Regions from './regions/regions';
import { connect } from 'react-redux';
import { Dispatch } from './store/constants/reduxTypes';

type Props = DTP;

export function App(props: Props) {
  const { getAllHouses } = props;
  useEffect(() => {
    getAllHouses();
  }, [getAllHouses]);
  return (
    <div className={'App'}>
      <SearchHouse />
      <HousesList />
      <Regions />
    </div>
  );
}

interface DTP {
  getAllHouses: () => void;
}
const mapDistachToProps = (dispatch: Dispatch): DTP => ({
  getAllHouses: () => dispatch({ type: 'GET_ALL_HOUSES' }),
});

export default connect(null, mapDistachToProps)(App);
