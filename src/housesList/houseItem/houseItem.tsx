/* @flow */
import './houseItem.css';
import React, { Component, MouseEvent } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { ReduxState, Dispatch } from '../../store/constants/reduxTypes';

interface DTP {
  getHouse: () => void;
  // openHouse: () => void;
}
type Props = STP & DTP & ReduxProps;

type State = {
  showFull: boolean;
};

export class HouseItem extends Component<Props, State> {
  static displayName = 'House';
  state = { showFull: false };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      !prevState.showFull &&
      this.state.showFull &&
      !this.props.got &&
      !this.props.getting
    ) {
      this.props.getHouse();
    }
  }

  changeState = () => {
    this.setState({
      showFull: !this.state.showFull,
    });
  };

  openExternal = (evt: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    evt.preventDefault();
    evt.stopPropagation();
    // this.props.openHouse();
  };

  renderDetails = () => {
    const { coatOfArms, words } = this.props;
    return (
      <div className={'houseDetails'}>
        <div className={'houseDetail'}>
          <b>{'Coat of Arms: '}</b>
          {coatOfArms.length > 0 ? coatOfArms : '?'}
        </div>
        <div className={'houseDetail'}>
          <b>{'Words: '}</b>
          {words.length > 0 ? words : '?'}
        </div>
        <div className={'houseOpen'} onClick={this.openExternal}>
          <i className={'fa fa-external-link'} aria-hidden={'true'} />
        </div>
      </div>
    );
  };

  render() {
    const { error, getting } = this.props;
    return (
      <div className={'house'} data-testid="house" onClick={this.changeState}>
        <div className={'houseName'}>{this.props.name}</div>
        {this.state.showFull
          ? getting
            ? 'Loading'
            : error
            ? error
            : this.renderDetails()
          : null}
      </div>
    );
  }
}

type ReduxProps = { houseId: string };

interface STP {
  coatOfArms: string;
  error?: string;
  getting: boolean;
  got: boolean;
  name: string;
  words: string;
}

function mapStateToProps(state: ReduxState, { houseId }: ReduxProps): STP {
  const house = state.houses.getIn(['houses', houseId], Map());
  return {
    coatOfArms: house.getIn(['coatOfArms'], ''),
    error: house.getIn(['error'], null),
    getting: house.getIn(['getting'], false),
    got: house.has('coatOfArms'),
    name: house.getIn(['name'], ''),
    words: house.getIn(['words'], ''),
  };
}

function mapDispatchToProps(dispatch: Dispatch, { houseId }: ReduxProps) {
  return {
    getHouse: () => dispatch({ type: 'GET_HOUSE', houseId }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseItem);
