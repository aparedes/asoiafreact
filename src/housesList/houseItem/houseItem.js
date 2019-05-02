/* @flow */
import './houseItem.css';
import * as Immutable from 'immutable';
import React, { Component } from 'react';
import type { Map } from 'immutable';
import { connect } from 'react-redux';

type Props = {
  coatOfArms: string,
  error: ?string,
  getHouse: () => void,
  getting: boolean,
  got: boolean,
  houseId: string,
  name: string,
  words: string,
  openHouse: () => void,
};

type State = {
  showFull: boolean,
};

export class HouseItem extends Component<Props, State> {
  static displayName = 'House';
  changeState: () => void;
  openExternal: (evt: TouchEvent) => void;

  constructor(props: Props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.openExternal = this.openExternal.bind(this);
    this.state = { showFull: false };
  }

  componentDidMount() {
    this.setState({ showFull: false });
  }

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

  changeState() {
    this.setState({
      showFull: !this.state.showFull,
    });
  }

  openExternal(evt: TouchEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.openHouse();
  }
  renderDetails() {
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
  }
  render() {
    const { error, getting } = this.props;
    return (
      <div className={'house'} onClick={this.changeState}>
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

const mapStateToProps = (
  state: { houses: Map<string, Map<string, *>> },
  { houseId }: { houseId: string }
): Object => {
  const house = state.houses.getIn(['houses', houseId], new Immutable.Map());
  return {
    coatOfArms: house.getIn(['coatOfArms'], ''),
    error: house.getIn(['error'], null),
    getting: house.getIn(['getting'], false),
    got: house.has('coatOfArms'),
    name: house.getIn(['name'], ''),
    words: house.getIn(['words'], ''),
  };
};

const mapDispatchToProps = (
  dispatch: (action: Object) => void,
  { houseId }: { houseId: string }
): Object => ({
  getHouse: () => dispatch({ type: 'GET_HOUSE', houseId }),
  openHouse: () => dispatch({ type: 'OPEN_HOUSE', houseId }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseItem);
