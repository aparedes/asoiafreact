import React from 'react';
import { SearchHouse } from './searchHouse';
import renderer from 'react-test-renderer';

test('Prints a list of houses', () => {
  const component = renderer.create(<SearchHouse />);
  let searchHouse = component.toJSON();
  expect(searchHouse).toMatchSnapshot();
});
