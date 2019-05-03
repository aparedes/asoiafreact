/* @flow */
import './regions.css';
import * as Immutable from 'immutable';
import React, { Component } from 'react';
import type { Map, Set } from 'immutable';
import { connect } from 'react-redux';

type Props = {
  regions: Set<string>,
  selectedRegion: string,
  setRegion: (region: string) => void,
};

export class Regions extends Component<Props> {
  onClick(region: string) {
    this.props.setRegion(region);
  }
  render() {
    const { regions, selectedRegion } = this.props;
    return (
      <div className={'regions'}>
        {regions.map(region => (
          <div
            className={
              selectedRegion === region ? 'regionItem active' : 'regionItem'
            }
            key={region}
            onClick={this.onClick.bind(this, region)}
          >
            {region.length === 0 ? 'All' : region}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: {
  app: { region: string },
  houses: Map<string, *>,
}) => ({
  selectedRegion: state.app.region,
  regions: state.houses.getIn(['regions'], new Immutable.Set()),
});
const mapDistachToProps = (dispatch: (action: Object) => void) => ({
  setRegion: (region: string) => dispatch({ type: 'SET_REGION', region }),
});
export default connect(
  mapStateToProps,
  mapDistachToProps
)(Regions);
