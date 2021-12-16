import React from 'react';
import { render } from '../../tests/test-utils';
import Regions from './regions';

export {};

// regions: Set<string>,
// selectedRegion: string,
// setRegion: (region: string) => void,

it('Displays the regions', () => {
  // test('Region snapshot', () => {
  // const r = render(
  //   <Regions
  //     regions={Set(['', 'The North', 'Dorne', 'North of The Wall'])}
  //     selectedRegion={''}
  //     setRegion={jest.fn()}
  //   />
  // );
  const { container } = render(<Regions />);
  expect(container).toMatchSnapshot();
  // });

  //
  // regions.find('The North').onClick()
  // regions = component.toJSON()
  // expect(regions).toMatchSnapshot()
});
