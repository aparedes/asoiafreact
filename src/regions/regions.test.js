import { Set } from 'immutable';
import React from 'react';
import { Regions } from './regions';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// regions: Set<string>,
// selectedRegion: string,
// setRegion: (region: string) => void,

describe('Displays the regions', () => {
  it('Region snapshot', () => {
    const component = renderer.create(
      <Regions
        regions={Set(['', 'The North', 'Dorne', 'North of The Wall'])}
        selectedRegion={''}
      />
    );
    let regions = component.toJSON();
    expect(regions).toMatchSnapshot();
  });

  //
  // regions.find('The North').onClick()
  // regions = component.toJSON()
  // expect(regions).toMatchSnapshot()
});
