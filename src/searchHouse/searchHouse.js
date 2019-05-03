/* @flow */
import './searchHouse.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {
  setSearch: (search: string) => void,
};

export class SearchHouse extends Component<Props> {
  static displayName = 'SearchHouse';

  onChange: (evt: KeyboardEvent) => void;

  constructor(props: Props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt: KeyboardEvent) {
    const input = evt.target;
    console.log(input.value);
    this.props.setSearch(input.value);
  }

  render() {
    return (
      <input
        className={'search'}
        onChange={this.onChange}
        placeholder={'Search house'}
      />
    );
  }
}

const mapStateToProps = (state: Object): Object => ({});

const mapDispatchToProps = (dispatch: (action: Object) => void): Object => ({
  setSearch: (search: string) => dispatch({ type: 'SET_SEARCH', search }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHouse);
