/* @flow */
import './App.css';
import React, { useEffect } from 'react';
import HousesList from './housesList/housesList';
import type { Map } from 'immutable';
import SearchHouse from './searchHouse/searchHouse';
import Regions from './regions/regions';
import { connect } from 'react-redux';

type Props = {
  getAllHouses: () => void,
};

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

const mapStateToProps = (state: { houses: Map<string, *> }) => ({});
const mapDistachToProps = (dispatch: (action: Object) => void) => ({
  getAllHouses: () => dispatch({ type: 'GET_ALL_HOUSES' }),
});

export default connect(
  mapStateToProps,
  mapDistachToProps
)(App);
