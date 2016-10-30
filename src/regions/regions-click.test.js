import * as Immutable from 'immutable'
import React from 'react';
import { Regions } from './regions'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('Regions click test', () => {
  it ('Checks region change', () => {
    const regionNames = new Immutable.Set([ '', 'The North', 'Dorne', 'North of The Wall' ])
    const setRegion = sinon.spy()
    const regions = shallow(
      <Regions regions={ regionNames } selectedRegion={ '' } setRegion={ setRegion }/>
    )

    expect(regions.find('.regionItem').length).toBe(regionNames.size)
    expect(regions.find('.active').node.key).toBe('')
    expect(regions.find('.active').node.props.children).toBe('All')
    let i = 0
    let regionList = regionNames.toList()
    regionList = regionList.update(0, () => 'All')
    regions.find('.regionItem').forEach(region => {
      region.simulate('click')
      regions.setProps({ selectedRegion: setRegion.lastCall.args[0] })
      expect(regions.find('.active').node.key).toBe(regionNames.toList().get(i))
      expect(regions.find('.active').node.props.children).toBe(regionList.get(i++))
      expect(regions.find('.active').node.props.className).toBe('regionItem active')
    })

  })
})
