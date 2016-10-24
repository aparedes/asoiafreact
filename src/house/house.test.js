import React from 'react';
import { House } from './house'
import renderer from 'react-test-renderer'

// coatOfArms: string,
// error: ?string,
// getHouse: () => void,
// getting: boolean,
// got: boolean,
// name: string,
// words: string,

test('Displays a house', () => {
  const component = renderer.create(
    <House houseId={ '1' } name={ 'House Stark of Winterfell' } words={ 'Winter is Comming' } coatOfArms={ 'Dire wolf' } getHouse={ () => {}} />
  );
  let house = component.toJSON()
  expect(house).toMatchSnapshot()

  house.props.onClick()
  house = component.toJSON()
  expect(house).toMatchSnapshot()
})
