import './searchHouse.css';
import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';

interface Props {
  setSearch: (search: string) => void;
}
interface KeyEvt {
  target: { value: string };
}

export class SearchHouse extends Component<Props> {
  static displayName = 'SearchHouse';

  constructor(props: Props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt: ChangeEvent<HTMLInputElement>) {
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchHouse);
