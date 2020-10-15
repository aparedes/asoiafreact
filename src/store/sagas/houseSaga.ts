/* @flow */
import { Map, Set } from 'immutable';
import { SagaIterator } from 'redux-saga';
import {
  call,
  ForkEffect,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

interface AllHousesType {
  data: {
    allHouses: {
      totalCount: number;
      houses: Array<{ id: string; name: string; region: string }>;
    };
  };
}
interface HouseType {
  data: {
    house: {
      name: string;
      currentLord: {
        name: string;
      };
      region: string;
      coatOfArms: string;
      words: string;
    };
  };
}

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

interface GetAllHousesAction {
  type: 'GET_ALL_HOUSES';
}

function* getAllHouses(_action: GetAllHousesAction): SagaIterator<void> {
  try {
    const houses: AllHousesType | undefined = yield call(
      fetchData,
      `${EndPoint}?query={allHouses{totalCount houses{id name region}}}`
    );
    if (houses) {
      let allHouses = Map<string, Map<string, string>>();
      let regions: Set<string> = Set();
      houses.data.allHouses.houses.forEach((house) => {
        allHouses = allHouses.set(house.id, Map(house));
        regions = regions.add(house.region);
      });
      regions = regions.sort().toSet();
      const allHousesIds = allHouses
        .sortBy((house) => house?.getIn(['name'], '') ?? '')
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

interface GetHouseAction {
  type: 'GET_HOUSE';
  houseId: string;
}

function* getHouse({ houseId }: GetHouseAction): SagaIterator<void> {
  try {
    const url = `${EndPoint}?query={house(id:"${houseId}"){name currentLord{name} region coatOfArms words}}`;
    const houseResponse: HouseType | null = yield call(fetchData, url);
    if (houseResponse) {
      const {
        data: { house },
      } = houseResponse;
      let currentLord = '';
      if (house.currentLord) {
        currentLord = house.currentLord.name;
      }
      const immutableHouse = Map(house)
        .remove('currentLord')
        .set('currentLord', currentLord);
      yield put({ type: 'GOT_HOUSE', houseId, house: immutableHouse });
      console.log(JSON.stringify(house, null, '\t'));
    }
  } catch (e) {
    yield put({ type: 'GET_HOUSE_ERROR', houseId, error: e.message });
  }
}
export default function (): ForkEffect<never>[] {
  return [
    takeLatest('GET_ALL_HOUSES', getAllHouses),
    takeEvery('GET_HOUSE', getHouse),
  ];
}
