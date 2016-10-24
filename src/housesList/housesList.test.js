import * as Immutable from 'immutable'
import React from 'react';
import { HousesList } from './housesList'
import renderer from 'react-test-renderer'

// jest.enableAutomock()
jest.mock('../house/house')
test('Prints a list of houses', () => {
  const component = renderer.create(
    <HousesList getting={ false } allHouses={ new Immutable.List([ '1', '2' ])}/>
  );
  let housesList = component.toJSON();
  expect(housesList).toMatchSnapshot();
})
