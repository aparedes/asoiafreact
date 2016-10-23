/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'

type PropsType = {
  setSearch: (search: string) => void,
}
class SearchHouse extends Component {
  static displayName = 'SearchHouse'

  constructor(props: PropsType) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  props: PropsType
  onChange: (evt: KeyboardEvent) => void

  onChange(evt: KeyboardEvent) {
    const input: HTMLInputElement = evt.target
    console.log(input.value)
    this.props.setSearch(input.value)
  }
  render() {
    return (
      <input onChange={ this.onChange } placeholder={ 'Search house' }/>
    )
  }
}

const mapStateToProps = (state: Object): Object => ({

})

const mapDispatchToProps = (dispatch: (action: Object) => void): Object => ({
  setSearch: (search: string) => dispatch({ type: 'SET_SEARCH', search }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchHouse)