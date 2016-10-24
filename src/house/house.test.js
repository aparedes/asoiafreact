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
    <House houseId={ '1' } getting={ false } name={ 'House Stark of Winterfell' } words={ 'Winter is Comming' } coatOfArms={ 'Dire wolf' } getHouse={ () => {}} />
  );
  let housesList = component.toJSON()
  expect(housesList).toMatchSnapshot()

  // Open house
  housesList.props.onClick()
  housesList = component.toJSON()
  expect(housesList).toMatchSnapshot()
})
