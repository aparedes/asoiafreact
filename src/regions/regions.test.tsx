import { render } from '@testing-library/react';
import { Set } from 'immutable';
import React from 'react';
import { Regions } from './regions';

// regions: Set<string>,
// selectedRegion: string,
// setRegion: (region: string) => void,

describe('Displays the regions', () => {
  it('Region snapshot', () => {
    const r = render(
      <Regions
        regions={Set(['', 'The North', 'Dorne', 'North of The Wall'])}
        selectedRegion={''}
        setRegion={jest.fn()}
      />
    );

    expect(r).toMatchSnapshot();
  });

  //
  // regions.find('The North').onClick()
  // regions = component.toJSON()
  // expect(regions).toMatchSnapshot()
});
