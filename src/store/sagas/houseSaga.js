/* @flow */
import { Map, Set } from 'immutable';
import { call, put } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga/effects';

type AllHousesType = {
  data: {
    allHouses: {
      totalCount: number,
      houses: Array<{ id: string, name: string, region: string }>,
    },
  },
};
type HouseType = {
  data: {
    house: {
      name: string,
      currentLord: {
        name: string,
      },
      region: string,
      coatOfArms: string,
      words: string,
    },
  },
};

function fetchData(url: string, options?: Object) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((r) => resolve(r.json()))
      .catch(reject);
  });
}
const EndPoint =
  // process.env.NODE_ENV === 'production'
  // ?
  'https://iceandfire.aparedes.net/';
// : 'http://localhost:5000/';
function* getAllHouses(): Generator<*, *, *> {
  try {
    const houses: ?AllHousesType = yield call(
      fetchData,
      `${EndPoint}?query={allHouses{totalCount houses{id name region}}}`
    );
    if (houses) {
      let allHouses = Map();
      let regions = Set();
      houses.data.allHouses.houses.forEach((house) => {
        allHouses = allHouses.set(house.id, Map(house));
        regions = regions.add(house.region);
      });
      regions = regions.sort();
      const allHousesIds = allHouses
        .sortBy((house) => house.getIn(['name'], ''))
        .keySeq()
        .toList();
      yield put({ type: 'GOT_ALL_HOUSES', allHouses, allHousesIds, regions });
    } else {
      yield put({ type: 'NO HOUSES' });
    }
  } catch (e) {
    console.error('GET ALL HOUSES', e, e.message, e.stack);
    yield put({ type: 'GET_ALL_HOUSES_ERROR', error: e.message });
  }
}

function* getHouse({ houseId }: { houseId: string }): Generator<*, *, *> {
  try {
    const url = `${EndPoint}?query={house(id:"${houseId}"){name currentLord{name} region coatOfArms words}}`;
    const houseResponse: ?HouseType = yield call(fetchData, url);
    if (houseResponse) {
      const {
        data: { house },
      } = houseResponse;
      let { currentLord, ...allHouse } = house;
      if (house.currentLord) {
        currentLord = house.currentLord.name;
      }
      const immutableHouse = Map(allHouse).set('currentLord', currentLord);
      yield put({ type: 'GOT_HOUSE', houseId, house: immutableHouse });
      console.log(JSON.stringify(house, null, '\t'));
    }
  } catch (e) {
    yield put({ type: 'GET_HOUSE_ERROR', houseId, error: e.message });
  }
}
export default function (): Array<*> {
  return [
    takeLatest('GET_ALL_HOUSES', getAllHouses),
    takeEvery('GET_HOUSE', getHouse),
  ];
}
