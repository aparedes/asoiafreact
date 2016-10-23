/* @flow */
import './App.css'
import React, { Component } from 'react'
import HousesList from './housesList'
import type { Map } from 'immutable'
import SearchHouse from './searchHouse'
import { connect } from 'react-redux'

type PropsType = {
  getAllHouses: () => void,
}

class App extends Component {
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
