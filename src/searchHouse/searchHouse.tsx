import './searchHouse.css';
import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../store/constants/reduxTypes';
import { AppEnum } from '../store/reducers/app';

interface Props extends DTP {}
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

interface DTP {
  setSearch: (search: string) => void;
}
const mapDispatchToProps = (dispatch: Dispatch): DTP => ({
  setSearch: (search: string) => dispatch({ type: AppEnum.SET_SEARCH, search }),
});

export default connect(null, mapDispatchToProps)(SearchHouse);
