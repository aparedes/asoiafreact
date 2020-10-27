import { App } from './App';

import React from 'react';
import { render } from '@testing-library/react';

jest.mock('./regions/regions', () => () => null);
jest.mock('./housesList/housesList', () => () => null);
jest.mock('./searchHouse/searchHouse', () => () => null);
test('renders without crashing', () => {
  const component = render(<App getAllHouses={jest.fn()} />);
  expect(component).toMatchSnapshot();
});
