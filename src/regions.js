/* @flow */
import './regions.css'
import * as Immutable from 'immutable'
import React, { Component } from 'react'
import type { Map, Set } from 'immutable'
import { connect } from 'react-redux'

type PropsType = {
  regions: Set<string>,
  selectedRegion: string,
  setRegion: (region: string) => void,
}

class Regions extends Component {
  props: PropsType
  onClick(region) {
    this.props.setRegion(region)
  }
  render() {
    const { regions, selectedRegion } = this.props
    return (
      <div className={ 'regions' }>
        { regions.map(region => (
          <div className={ selectedRegion === region ? 'active' : '' } key={ region } onClick={ this.onClick.bind(this, region) }>
            { region.length === 0 ? 'All' : region }
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: { houses: Map<string, *> }) => ({
  selectedRegion: state.app.region,
  regions: state.houses.getIn([ 'regions' ], new Immutable.Set()),
})
const mapDistachToProps = (dispatch: (action: Object) => void) => ({
  setRegion: (region: string) => dispatch({ type: 'SET_REGION', region }),
})
export default connect(mapStateToProps, mapDistachToProps)(Regions)
