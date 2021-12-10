import { render } from '@testing-library/react';
import { List } from 'immutable';
import React from 'react';
import { HousesList } from './housesList';

// jest.mock('./houseItem/houseItem', () => {
//   const React = require('react');
//   const { HouseItem } = jest.requireActual('./houseItem/houseItem');
//   function mockFakeHouse(props: { houseId: string }) {
//     return (
//       <HouseItem
//         houseId={props.houseId}
//         name={'House Stark of Winterfell'}
//         coatOfArms={'Dire wolf'}
//         word={'Winter is comming'}
//       />
//     );
//   }
//   mockFakeHouse.propTypes = HouseItem.propTypes;
//   return mockFakeHouse;
// });

test('Prints a list of houses', () => {
  // const component = render(
  //   <HousesList getting={false} allHouses={List(['1'])} />
  // );
  expect('toupdate').toMatchSnapshot();
});
