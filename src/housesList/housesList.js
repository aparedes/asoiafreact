/* @flow */
import './houseList.css';
import * as Immutable from 'immutable';
import type { List, Map } from 'immutable';
import React, { Component } from 'react';
import type { Element } from 'react';
import HouseItem from './houseItem/houseItem';
import { connect } from 'react-redux';

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

type ReduxState = {
  app: { search: string, region: string },
  houses: Map<string, *>,
};
function mapStateToProps(state: ReduxState) {
  let allHouses;
  if (state.app.search && state.app.search.length > 0) {
    const search = new RegExp(state.app.search.toLowerCase());
    allHouses = state.houses
      .getIn(['houses'], new Immutable.Map())
      .filter(house => search.test(house.get('name', '').toLowerCase()))
      .sortBy(house => house.getIn(['name'], ''))
      .keySeq()
      .toList();
  } else if (state.app.region) {
    const region = new RegExp(state.app.region.toLowerCase());
    allHouses = state.houses
      .getIn(['houses'], new Immutable.Map())
      .filter(house => region.test(house.get('region', '').toLowerCase()))
      .sortBy(house => house.getIn(['name'], ''))
      .keySeq()
      .toList();
  } else {
    allHouses = state.houses.getIn(['housesIds'], new Immutable.List());
  }
  return {
    allHouses,
    error: state.houses.getIn(['error_all'], null),
    getting: state.houses.getIn(['getting_all'], false),
  };
}

export default connect(mapStateToProps)(HousesList);
