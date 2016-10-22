/* @flow */
import * as Immutable from 'immutable'
import type { List, Map } from 'immutable'
import React, { Component } from 'react'
import type { Element } from 'react'
import House from './house'
import { connect } from 'react-redux'

type PropsType = {
  allHouses: List<string>,
  error: ?string,
  getting: boolean,
}

class HousesList extends Component {
  static displayName = 'HousesList'
  props: PropsType
  render(): Element<*> {
    const { allHouses, error, getting } = this.props
    return (
      <div>
        { getting ? 'Loading' : error }
        { allHouses.map((house) => <House key={ house } houseId={ house } /> ) }
      </div>
    )
  }
}

const mapStateToProps = (state: { houses: Map<string, *> }) => ({
  allHouses: state.houses.getIn([ 'housesIds' ], new Immutable.List()),
  error: state.houses.getIn([ 'error_all' ], null),
  getting: state.houses.getIn([ 'getting_all' ], false),
})

const mapDispatchToProps = (dispatch: (action: Object) => void): Object => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)
