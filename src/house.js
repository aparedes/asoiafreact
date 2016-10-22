/* @flow */
import './house.css'
import * as Immutable from 'immutable'
import React, { Component } from 'react'
import type { Map } from 'immutable'
import { connect } from 'react-redux'

type PropsType = {
  coatOfArms: string,
  error: ?string,
  getHouse: () => void,
  getting: boolean,
  got: boolean,
  name: string,
  words: string,
}

type StateType = {
  showFull: boolean
}

class House extends Component {
  static displayName = 'House'

  constructor(props: PropsType) {
    super(props)
    this.changeState = this.changeState.bind(this)
  }
  state: StateType
  componentWillMount() {
    this.state = {
      showFull: false,
    }
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (!prevState.showFull && this.state.showFull && !this.props.got && !this.props.getting) {
      this.props.getHouse()
    }
  }
  changeState: () => void
  props: PropsType

  changeState() {
    this.setState({
      showFull: !this.state.showFull,
    })
  }
  renderDetails() {
    const { coatOfArms, words } = this.props
    return (
      <div className={ 'houseDetails'  }>
        <div className={ 'houseDetail' }>
          <b>{ 'Coat of Arms: '}</b>{ coatOfArms.length > 0 ? coatOfArms : '?'}
        </div>
        <div className={ 'houseDetail' }>
          <b>{ 'Words: '}</b>{ words.length > 0 ? words : '?' }
        </div>
      </div>
    )
  }
  render() {
    const { error, getting } = this.props
    return (
      <div className={ 'house' } onClick={ this.changeState }>
        <div className={ 'houseName' }>{ this.props.name }</div>
        { this.state.showFull ? getting ? 'Loading' : error ? error : this.renderDetails() : null }
      </div>
    )
  }
}

const mapStateToProps = (state: { houses: Map<string, Map<string, *>> }, { houseId }: { houseId: string }): Object => {
  const house = state.houses.getIn([ 'houses', houseId ], new Immutable.Map())
  return ({
    coatOfArms: house.getIn([ 'coatOfArms' ], ''),
    error: house.getIn([ 'error' ], null),
    getting: house.getIn([ 'getting' ], false),
    got: house.has('coatOfArms'),
    name: house.getIn([ 'name' ], ''),
    words: house.getIn([ 'words' ], ''),
  })
}
const mapDispatchToProps = (dispatch: (action: Object) => void, { houseId }: { houseId: string }): Object => ({
  getHouse: () => dispatch({ type: 'GET_HOUSE', houseId }),
})
export default connect(mapStateToProps, mapDispatchToProps)(House)
