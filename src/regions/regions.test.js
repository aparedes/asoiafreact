import * as Immutable from 'immutable'
import React from 'react';
import { Regions } from './regions'
import renderer from 'react-test-renderer'

// regions: Set<string>,
// selectedRegion: string,
// setRegion: (region: string) => void,

test('Displays the regions', () => {
  const component = renderer.create(
    <Regions regions={ new Immutable.Set([ '', 'The North', 'Dorne', 'North of The Wall' ])} selectedRegion={ '' } />
  );
  let regions = component.toJSON()
  expect(regions).toMatchSnapshot()
  //
  // regions.find('The North').onClick()
  // regions = component.toJSON()
  // expect(regions).toMatchSnapshot()
})
