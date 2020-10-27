import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { HouseItem } from './houseItem';

// coatOfArms: string,
// error: ?string,
// getHouse: () => void,
// getting: boolean,
// got: boolean,
// name: string,
// words: string,

test('Displays a house', () => {
  const component = render(
    <HouseItem
      houseId={'1'}
      name={'House Stark of Winterfell'}
      words={'Winter is Comming'}
      coatOfArms={'Dire wolf'}
      getHouse={jest.fn()}
      getting={false}
      got
    />
  );

  expect(component).toMatchSnapshot();
  fireEvent.click(component.getByTestId('house'));
  expect(component).toMatchSnapshot();
});
