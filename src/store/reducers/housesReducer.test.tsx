
import { houseActions, houseReducer } from './housesReducer';

describe('Test House Reducer', () => {
  const map = { gettingAll: false, houses: [] };
  // it('Returns Map from unknown action', () => {
  //   let action = { type: 'INIT_REDUX' };
  //   expectIs(reducer(map, action), Map());
  // });

  it('GET_ALL_HOUSES', () => {
    expect(houseReducer(undefined, houseActions.getAllHouses())).toEqual({
      gettingAll: true,
      houses: [],
      housesIds: [],
      regions: [],
    });
  });

  it('GET_ALL_HOUSES_ERROR after GET_ALL_HOUSES', () => {
    expect(
      houseReducer(
        { gettingAll: true, houses: [] },
        houseActions.getAllHousesError('Fetch Error')
      )
    ).toEqual({
      gettingAll: false,
      houses: [],
      errorAll: 'Fetch Error',
    });
  });

  it('GET_ALL_HOUSES after GET_ALL_HOUSES', () => {
    let action = {
      allHouses: [
        { id: '1', name: 'House Stark of Winterfell', region: 'The North' },
      ],
      allHousesIds: ['1'],
      regions: ['The North'],
    };
    expect(
      houseReducer(map, houseActions.gotAllHouses(action))
    ).toMatchSnapshot();
  });
});
