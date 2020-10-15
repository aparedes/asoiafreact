/* @flow */
import './regions.css';
import { Set } from 'immutable';
import React, { Component, useCallback } from 'react';
import { connect } from 'react-redux';

import { ReduxState, Dispatch } from '../store/constants/reduxTypes';
import { AppEnum } from '../store/reducers/app';

type Props = STP & DTP;

export class Regions extends Component<Props> {
  onClick = (region: string) => {
    this.props.setRegion(region);
  };
  render() {
    const { regions, selectedRegion } = this.props;

    return (
      <div className={'regions'}>
        {regions.toArray().map((region) => {
          const onClickRegion = () => this.onClick(region);
          return (
            <div
              className={
                selectedRegion === region ? 'regionItem active' : 'regionItem'
              }
              key={region}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={onClickRegion}
            >
              {region.length === 0 ? 'All' : region}
            </div>
          );
        })}
      </div>
    );
  }
}

interface STP {
  regions: Set<string>;
  selectedRegion: string | undefined;
}
const mapStateToProps = (state: ReduxState): STP => ({
  selectedRegion: state.app.region,
  regions: state.houses.getIn(['regions'], Set()),
});
interface DTP {
  setRegion: (region: string) => void;
}
const mapDistachToProps = (dispatch: Dispatch) => ({
  setRegion: (region: string) => dispatch({ type: AppEnum.SET_REGION, region }),
});

export default connect(mapStateToProps, mapDistachToProps)(Regions);
