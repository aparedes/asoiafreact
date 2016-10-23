/* @flow */
import './houseList.css'
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
      <div className={ 'houseList' }>
        { getting ? 'Loading' : error }
        { allHouses.map((house) => <House key={ house } houseId={ house } /> ) }
      </div>
    )
  }
}

const mapStateToProps = (state: { app: { search: string, region: string }, houses: Map<string, *> }): Object => {
  let allHouses
  if (state.app.search && state.app.search.length > 0) {
    const search = new RegExp(state.app.search.toLowerCase())
    allHouses = state.houses.getIn([ 'houses' ], new Immutable.Map())
                            .filter(house => search.test(house.get('name', '').toLowerCase()))
                            .sortBy(house => house.getIn([ 'name' ], ''))
                            .keySeq()
                            .toList()
  } else if (state.app.region) {
    const region = new RegExp(state.app.region.toLowerCase())
    allHouses = state.houses.getIn([ 'houses' ], new Immutable.Map())
                            .filter(house => region.test(house.get('region', '').toLowerCase()))
                            .sortBy(house => house.getIn([ 'name' ], ''))
                            .keySeq()
                            .toList()
  } else {
    allHouses = state.houses.getIn([ 'housesIds' ], new Immutable.List())
  }
  return ({
    allHouses,
    error: state.houses.getIn([ 'error_all' ], null),
    getting: state.houses.getIn([ 'getting_all' ], false),
  })
}
const mapDispatchToProps = (dispatch: (action: Object) => void): Object => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)
