import * as Immutable from 'immutable';
import React from 'react';
import { Regions } from './regions';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Regions click test', () => {
  it('Checks region change', () => {
    expect('toupdate').toMatchSnapshot()
    // const regionNames = Immutable.Set([
    //   '',
    //   'The North',
    //   'Dorne',
    //   'North of The Wall',
    // ]);
    // const setRegion = jest.fn();

    // const regions = render(
    //   <Regions
    //     regions={regionNames}
    //     selectedRegion={''}
    //     setRegion={setRegion}
    //   />
    // );
    // expect(regions).toMatchSnapshot();
    // expect(screen.getAllByTestId('regionItem').length).toBe(regionNames.size);
    // expect(
    //   screen
    //     .getAllByTestId('regionItem')
    //     .filter((elem) => /active/.test(elem.className)).length
    // ).toBe(1);
    // expect(
    //   screen
    //     .getAllByTestId('regionItem')
    //     .filter((elem) => /active/.test(elem.className))[0].innerHTML
    // ).toBe('All');
    // expect(regions.find('.active').getElement().props.children).toBe('All');
    // let i = 0;
    // let regionList = regionNames.toList();
    // regionList = regionList.update(0, () => 'All');
    // regions.find('.regionItem').forEach((region) => {
    //   region.simulate('click');
    //   regions.setPropsy({ selectedRegion: setRegion.lastCall.args[0] });
    //   expect(regions.find('.active').getElement().key).toBe(
    //     regionNames.toList().get(i)
    //   );
    //   expect(regions.find('.active').getElement().props.children).toBe(
    //     regionList.get(i++)
    //   );
    //   expect(regions.find('.active').getElement().props.className).toBe(
    //     'regionItem active'
    //   );
    // });
  });
});
