import { List, Map, Set, is } from 'immutable';
import reducer, {
  GOT_ALL_HOUSES,
  GET_ALL_HOUSES_ERROR,
  GET_ALL_HOUSES,
} from './housesReducer';

describe('Test House Reducer', () => {
  function expectIs(left: Map<string, unknown>, right: Map<string, unknown>) {
    const comparison = is(left, right);
    expect(comparison).toBe(true);
    const commutative = is(right, left);
    expect(commutative).toBe(true);
  }


  let map: Map<string, unknown> = Map();
  // it('Returns Map from unknown action', () => {
  //   let action = { type: 'INIT_REDUX' };
  //   expectIs(reducer(map, action), Map());
  // });

  it('GET_ALL_HOUSES', () => {
    let action = { type: 'GET_ALL_HOUSES' } as GET_ALL_HOUSES;
    expectIs(reducer(map, action), Map({ getting_all: true }));
  });

  it('GET_ALL_HOUSES_ERROR after GET_ALL_HOUSES', () => {
    let action = {
      type: 'GET_ALL_HOUSES_ERROR',
      error: 'Fetch Error',
    } as GET_ALL_HOUSES_ERROR;
    map = Map({ getting_all: true });
    expectIs(reducer(map, action), Map({ error_all: 'Fetch Error' }));
  });

  it('GET_ALL_HOUSES after GET_ALL_HOUSES', () => {
    let action = {
      type: 'GOT_ALL_HOUSES',
      allHouses: Map({
        '1': Map({ name: 'House Stark of Winterfell' }),
      }),
      allHousesIds: List(['1']),
      regions: Set(['The North']),
    } as GOT_ALL_HOUSES;
    expectIs(
      reducer(map, action),
      Map({
        houses: Map({
          '1': Map({ name: 'House Stark of Winterfell' }),
        }),
        housesIds: List(['1']),
        regions: Set(['The North']),
      })
    );
  });
});
