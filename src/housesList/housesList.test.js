import * as Immutable from 'immutable';
import React from 'react';
import { HousesList } from './housesList';
import renderer from 'react-test-renderer';

jest.mock('./houseItem/houseItem', () => {
  const React = require('react');
  const { HouseItem } = require.requireActual('./houseItem/houseItem');
  class FakeHouse extends React.Component {
    render() {
      return (
        <HouseItem
          houseId={this.props.houseId}
          name={'House Stark of Winterfell'}
          coatOfArms={'Dire wolf'}
          word={'Winter is comming'}
        />
      );
    }
  }
  FakeHouse.propTypes = HouseItem.propTypes;
  return FakeHouse;
});

test('Prints a list of houses', () => {
  const component = renderer.create(
    <HousesList getting={false} allHouses={new Immutable.List(['1'])} />
  );
  let housesList = component.toJSON();
  expect(housesList).toMatchSnapshot();
});
