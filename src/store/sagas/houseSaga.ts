import { SagaIterator } from 'redux-saga';
import {
  call,
  ForkEffect,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { houseActions } from '../reducers/housesReducer';

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
      const allHouses = houses.data.allHouses.houses;
      const allHousesIds = allHouses.map((house) => house.id);
      let regions: string[] = [];
      allHouses.forEach((house) => {
        if (!regions.includes(house.region)) {
          regions.push(house.region);
        }
      });

      yield put(
        houseActions.gotAllHouses({
          allHouses: allHouses.sort((houseA, houseB) =>
            houseA.name.localeCompare(houseB.name)
          ),
          allHousesIds,
          regions: regions.sort(),
        })
      );
    } else {
      yield put({ type: 'NO HOUSES' });
    }
  } catch (e) {
    console.error(
      'GET ALL HOUSES',
      e,
      (e as Error).message,
      (e as Error).stack
    );
    yield put(houseActions.getAllHousesError({ error: (e as Error).message }));
  }
}

interface GetHouseAction {
  type: 'GET_HOUSE';
  payload: string;
}

function* getHouse({ payload }: GetHouseAction): SagaIterator<void> {
  try {
    const url = `${EndPoint}?query={house(id:"${payload}"){name currentLord{name} region coatOfArms words}}`;
    const houseResponse: HouseType | null = yield call(fetchData, url);
    if (houseResponse) {
      const {
        data: { house },
      } = houseResponse;
      let currentLord = '';
      if (house.currentLord) {
        currentLord = house.currentLord.name;
      }
      yield put(
        houseActions.gotHouse({ houseId: payload, house: { ...house, currentLord } })
      );
    }
  } catch (e) {
    yield put(houseActions.getHouseError({ houseId: payload, error: 'error' }));
  }
}
export default function HouseSaga(): ForkEffect<never>[] {
  return [
    takeLatest('house/getAllHouses', getAllHouses),
    takeEvery('house/getHouse', getHouse),
  ];
}
