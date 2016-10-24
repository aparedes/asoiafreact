/* @flow */
import './App.css'
import React, { Component } from 'react'
import HousesList from './housesList/housesList'
import type { Map } from 'immutable'
import SearchHouse from './searchHouse/searchHouse'
import Regions from './regions/regions'
import { connect } from 'react-redux'

type PropsType = {
  getAllHouses: () => void,
}

export class App extends Component {
  static displayName = 'App'
  componentDidMount() {
    this.props.getAllHouses()
  }
  props: PropsType
  render() {
    return (
      <div className={ 'App' }>
        <SearchHouse />
        <HousesList />
        <Regions />
      </div>
    )
  }
}

const mapStateToProps = (state: { houses: Map<string, *>}) => ({
})
const mapDistachToProps = (dispatch: (action: Object) => void) => ({
  getAllHouses: () => dispatch({ type: 'GET_ALL_HOUSES' }),
})
export default connect(mapStateToProps, mapDistachToProps)(App)
