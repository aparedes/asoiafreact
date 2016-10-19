/* @flow */
import * as Immutable from 'immutable'
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'

type AllHousesType = {
  data: {
    allHouses: {
      totalCount: number,
      houses: Array<{ id: string, name: string }>,
    }
  }
}

function fetchData(url: string, options?: Object) {
  return new Promise((resolve, reject) => {
    fetch(url, options).then(r => resolve(r.json())).catch(reject)
  })
}

function *getAllHouses() {
  try {
    const houses: ?AllHousesType = yield call(fetchData, 'https://aqueous-citadel-58469.herokuapp.com/?query={allHouses{totalCount houses{id name}}}')
    if (houses) {
      let allHouses = new Immutable.Map()
      houses.data.allHouses.houses.forEach(house => allHouses = allHouses.setIn( [ house.id, 'name' ], house.name ) )
      yield put({ type: 'GOT_ALL_HOUSES', allHouses })
    } else {
      yield put({ type: 'NO HOUSES' })
    }
    // }
  } catch(e) {
    console.error('GET ALL HOUSES', e, e.message, e.stack);
    yield put({ type: 'GET_ALL_HOUSES_ERROR' })
  }
}

export default function *() {
  yield [
    takeLatest('GET_ALL_HOUSES', getAllHouses),
  ]
}
