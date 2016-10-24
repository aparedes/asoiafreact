import * as Immutable from 'immutable'
import React from 'react';
import { HousesList } from './housesList'
import renderer from 'react-test-renderer'

jest.mock('../house/house', () => {
  const { House } = require.requireActual('../house/house')
  class FakeHouse extends React.Component {
  render() {
    return (
      <House
        houseId={ this.props.houseId }
        name={ 'House Stark of Winterfell' }
        coatOfArms={ 'Dire wolf' }
        word={ 'Winter is comming' }
      />
    )
  }
}
FakeHouse.propTypes = House.propTypes;
return FakeHouse
  return House
})
test('Prints a list of houses', () => {
  const component = renderer.create(
    <HousesList getting={ false } allHouses={ new Immutable.List([ '1' ])}/>
  );
  let housesList = component.toJSON();
  expect(housesList).toMatchSnapshot();
})
