/* @flow */
import './App.css'
import React, { Component } from 'react'
import type { Map } from 'immutable'
import { connect } from 'react-redux'
import HousesList from './housesList'

type PropsType = {
  getAllHouses: () => void,
}
class App extends Component {

  componentDidMount() {
    this.props.getAllHouses()
  }
  props: PropsType
  render() {
    return (
      <div className="App">
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
