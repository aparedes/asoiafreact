/* @flow */
import './App.css'
import React, { Component } from 'react'
import type { Map } from 'immutable'
import { connect } from 'react-redux'

type PropsType = {
  getAllHouses: () => void,
  houses: Map<string, *>,
}
class App extends Component {

  componentDidMount() {
    this.props.getAllHouses()
  }
  props: PropsType
  render() {
    console.log(this.props.houses)
    return (
      <div className="App">
        { this.props.houses.map((house: Map<string, string>, houseId) => <div key={ houseId }>{ house.get('name', '')}</div> ).valueSeq() }
      </div>
    )
  }
}

const mapStateToProps = (state: { houses: Map<string, *>}) => ({
  houses: state.houses.remove('getting_all').sortBy((house: Map<string, *>): string => house.getIn([ 'name' ], '')),
})
const mapDistachToProps = (dispatch: (action: Object) => void) => ({
  getAllHouses: () => dispatch({ type: 'GET_ALL_HOUSES' }),
})
export default connect(mapStateToProps, mapDistachToProps)(App)
