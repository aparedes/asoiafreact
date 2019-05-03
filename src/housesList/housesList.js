/* @flow */
import './houseList.css';
import React from 'react';
import { List, Map } from 'immutable';
import HouseItem from './houseItem/houseItem';
import { connect } from 'react-redux';

import type { ReduxState } from '../store/constants/reduxTypes';

type Props = {
  allHouses: List<string>,
  error: ?string,
  getting: boolean,
};

function mapHouses(house: string) {
  return <HouseItem key={house} houseId={house} />;
}

export function HousesList(props: Props) {
  const { allHouses, error, getting } = props;
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
    allHouses = state.houses
      .getIn(['houses'], Map())
      .filter(house => search.test(house.get('name', '').toLowerCase()))
      .sortBy(house => house.getIn(['name'], ''))
      .keySeq()
      .toList();
  } else if (state.app.region) {
    const region = new RegExp(state.app.region.toLowerCase());
    allHouses = state.houses
      .getIn(['houses'], Map())
      .filter(house => region.test(house.get('region', '').toLowerCase()))
      .sortBy(house => house.getIn(['name'], ''))
      .keySeq()
      .toList();
  } else {
    allHouses = state.houses.getIn(['housesIds'], List());
  }
  return {
    allHouses,
    error: state.houses.getIn(['error_all'], null),
    getting: state.houses.getIn(['getting_all'], false),
  };
}

export default connect(mapStateToProps)(HousesList);
