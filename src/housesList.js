/* @flow */
import * as Immutable from 'immutable'
import React, { Component } from 'react'
import House from './house'
import type { Element } from 'react'
import type { Map } from 'immutable'
import { connect } from 'react-redux'

type PropsType = {
  allHouses: Map<string, string>,
  getting: boolean,
}
class HousesList extends Component {
  props: PropsType
  render(): Element<*> {
    const { allHouses, getting } = this.props
    return (
      <div>
        { getting ? 'Loading' : null }
        { allHouses.map((house) => <House key={ house } houseId={ house } /> ) }
      </div>
    )
  }
}

const mapStateToProps = (state: { houses: Map<string, *> }) => ({
  allHouses: state.houses.getIn([ 'houses' ], new Immutable.Map()).sortBy(house => house.getIn([ 'name' ], '')).keySeq(),
  getting: state.houses.getIn([ 'getting_all' ], false),
})
function mapDispatchToProps(dispatch: (action: Object | Function) => void): Object {
  return ({

  })
}
export default connect(mapStateToProps, mapDispatchToProps)(HousesList)
