import React from 'react';
import { HouseItem } from './houseItem';
import renderer from 'react-test-renderer';

// coatOfArms: string,
// error: ?string,
// getHouse: () => void,
// getting: boolean,
// got: boolean,
// name: string,
// words: string,

function GetHouse() {}
test('Displays a house', () => {
  const component = renderer.create(
    <HouseItem
      houseId={'1'}
      name={'House Stark of Winterfell'}
      words={'Winter is Comming'}
      coatOfArms={'Dire wolf'}
      getHouse={GetHouse}
    />
  );
  let houseItem = component.toJSON();
  expect(houseItem).toMatchSnapshot();

  houseItem.props.onClick();
  houseItem = component.toJSON();
  expect(houseItem).toMatchSnapshot();
});
