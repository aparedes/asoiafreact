/* @flow */
import './regions.css';
import { Set } from 'immutable';
import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux';

import type { ReduxState, Dispatch } from '../store/constants/reduxTypes';

type Props = {
  regions: Set<string>,
  selectedRegion: string,
  setRegion: (region: string) => void,
};

function Region(props) {
  const { selectedRegion, region, onClick } = props;
  const onClickRegion = useCallback(() => onClick(region), [onClick, region]);
  return (
    <div
      className={selectedRegion === region ? 'regionItem active' : 'regionItem'}
      onClick={onClickRegion}
    >
      {region.length === 0 ? 'All' : region}
    </div>
  );
}
export class Regions extends Component<Props> {
  onClick = (region: string) => {
    this.props.setRegion(region);
  };
  render() {
    const { regions, selectedRegion } = this.props;
    return (
      <div className={'regions'}>
        {regions.map((region) => (
          <Region
            selectedRegion={selectedRegion}
            region={region}
            key={region}
            onClick={this.onClick}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  selectedRegion: state.app.region,
  regions: state.houses.getIn(['regions'], Set()),
});
const mapDistachToProps = (dispatch: Dispatch) => ({
  setRegion: (region: string) => dispatch({ type: 'SET_REGION', region }),
});

export default connect(mapStateToProps, mapDistachToProps)(Regions);
