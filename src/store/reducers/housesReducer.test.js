import * as Immutable from 'immutable'
import reducer from './housesReducer'


describe('Test House Reducer', () => {

  function expectIs(left, right) {
    const comparison = Immutable.is(left, right);
    expect(comparison).toBe(true);
    const commutative = Immutable.is(right, left);
    expect(commutative).toBe(true);
  }

  it('Returns Map from no action', () => {
    // Empty Reducer (This doesnt happen, usually it is given a REDUX action to start)
    expectIs(reducer(), new Immutable.Map())
  })

  let map = new Immutable.Map()
  it('Returns Map from unknown action', () => {
    let action = { type: 'INIT_REDUX' }
    expectIs(reducer(map, action), new Immutable.Map())
  })

  // let map = new Immutable.Map()
  it('GET_ALL_HOUSES', () => {
    let action = { type: 'GET_ALL_HOUSES' }
    expectIs(reducer(map, action), new Immutable.Map({ getting_all: true }))
  })

  it('GET_ALL_HOUSES_ERROR after GET_ALL_HOUSES', () => {
    let action = { type: 'GET_ALL_HOUSES_ERROR', error: 'Fetch Error' }
    map = new Immutable.Map({ getting_all: true })
    expectIs(reducer(map, action), new Immutable.Map({ error_all: 'Fetch Error' }))
  })

  it('GET_ALL_HOUSES after GET_ALL_HOUSES', () => {
    let action = {
      type: 'GOT_ALL_HOUSES',
      allHouses: new Immutable.Map({ '1': new Immutable.Map({ name: 'House Stark of Winterfell' })}),
      allHousesIds: new Immutable.List([ '1' ]),
      regions: new Immutable.Set([ 'The North' ]),
    }
    expectIs(reducer(map, action), new Immutable.Map({
      houses: new Immutable.Map({ '1': new Immutable.Map({ name: 'House Stark of Winterfell' })}),
      housesIds: new Immutable.List([ '1' ]),
      regions: new Immutable.Set([ 'The North' ]),
    }))
  })



})
