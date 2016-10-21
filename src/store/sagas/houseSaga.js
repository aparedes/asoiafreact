/* @flow */
import * as Immutable from 'immutable'
import { call, put } from 'redux-saga/effects'
import { takeEvery, takeLatest } from 'redux-saga'

type AllHousesType = {
  data: {
    allHouses: {
      totalCount: number,
      houses: Array<{ id: string, name: string }>,
    }
  }
}
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
    }
  }
}

function fetchData(url: string, options?: Object) {
  return new Promise((resolve, reject) => {
    fetch(url, options).then(r => resolve(r.json())).catch(reject)
  })
}

function *getAllHouses(): Generator<*, *, *> {
  try {
    const houses: ?AllHousesType = yield call(fetchData, 'https://aqueous-citadel-58469.herokuapp.com/?query={allHouses{totalCount houses{id name}}}')
    if (houses) {
      let allHouses = new Immutable.Map()
      houses.data.allHouses.houses.forEach(house => allHouses = allHouses.setIn( [ house.id, 'name' ], house.name ) )
      yield put({ type: 'GOT_ALL_HOUSES', allHouses })
    } else {
      yield put({ type: 'NO HOUSES' })
    }
  } catch(e) {
    console.error('GET ALL HOUSES', e, e.message, e.stack)
    yield put({ type: 'GET_ALL_HOUSES_ERROR' })
  }
}

function *getHouse({ houseId }): Generator<*, *, *> {
  try {
    const houseResponse: ?HouseType = yield call(fetchData, `https://aqueous-citadel-58469.herokuapp.com/?query={house(id:"${houseId}"){name currentLord{name} region coatOfArms words}}`)
    if (houseResponse) {
      const { data: { house } } = houseResponse
      let currentLord
      if (house.currentLord) {
        currentLord = house.currentLord.name
      }
      const immutableHouse = new Immutable.Map(house).set('currentLord', currentLord)
      yield put({ type: 'GOT_HOUSE', houseId, house: immutableHouse })
      console.log(JSON.stringify(house, null, '\t'))
    }
  } catch(e) {
    yield put({ type: 'GET_HOUSE_ERROR', houseId })
  }
}
export default function *(): Generator<*, *, *> {
  yield [
    takeLatest('GET_ALL_HOUSES', getAllHouses),
    takeEvery('GET_HOUSE', getHouse),
  ]
}
