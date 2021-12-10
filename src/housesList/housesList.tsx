import './houseList.css';
import React, { ReactElement } from 'react';
import HouseItem from './houseItem/houseItem';
import {  useSelector } from 'react-redux';
import { ReduxState } from '../store/constants/reduxTypes';


function mapHouses(house?: string): ReactElement<void> | null {
  if (!house) {
    return null;
  }
  return <HouseItem key={house} houseId={house} />;
}

export function HousesList() {
  const { allHouses, error, getting } = useSelector(mapStateToProps);

  return (
    <div className={'houseList'}>
      {getting ? 'Loading' : error}
      {allHouses.map(mapHouses)}
    </div>
  );
}

function mapStateToProps(state: ReduxState) {
  let allHouses;
  if (state.app.search && state.app.search.length > 0) {
    const search = new RegExp(state.app.search.toLowerCase());
    allHouses = state.houses.houses
      .filter((house: any) => search.test(house.name.toLowerCase()))
      .map((house) => house.id);
  } else if (state.app.region) {
    const region = new RegExp(state.app.region.toLowerCase());
    allHouses = state.houses.houses
      .filter((house) => region.test(house.region.toLowerCase()))
      .map((house) => house.id);
    // .sortBy((house: Map<string, unknown>) => house.getIn(['name'], ''))
  } else {
    allHouses = [...(state.houses.housesIds ?? [])];
  }
  console.warn(allHouses)
  return {
    allHouses,
    error: state.houses.errorAll,
    getting: state.houses.gettingAll,
  };
}

export default HousesList;
