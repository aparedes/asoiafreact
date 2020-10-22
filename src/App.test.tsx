import { App } from './App';

import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('./regions/regions');
jest.mock('./housesList/housesList');
jest.mock('./searchHouse/searchHouse');
it('renders without crashing', () => {

  // const r = render(<App getAllHouses={jest.fn()} />);
  // expect(r).toMatchSnapshot();
});
