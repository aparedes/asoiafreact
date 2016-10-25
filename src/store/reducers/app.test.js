import AppReducer from './app'

describe('Test App Reducer', () => {

  it('Returns {}', () => {
    // Empty Reducer (This doesnt happen, usually it is given a REDUX action to start)
    expect(AppReducer()).toEqual({})
  })

  it('Returns {} from unknown action', () => {
    let action = { type: 'INIT_REDUX' }
    expect(AppReducer({}, action)).toEqual({})
  })

  it('Return { search: \'Stark\' } from {}', () => {
    let action = { type: 'SET_SEARCH', search: 'Stark' }
    expect(AppReducer({}, action)).toEqual({ search: 'Stark' })
  })

  it('Returns { search: \'Targaryan\' } from { search: \'Stark\' }', () => {
    let action = { type: 'SET_SEARCH', search: 'Targaryan' }
    expect(AppReducer({ search: 'Stark' }, action)).toEqual({ search: 'Targaryan' })
  })

  it('Retruns { region: \'The North\' } from { search: \'Stark\' }', () => {
    let action = { type: 'SET_REGION', region: 'The North' }
    expect(AppReducer({ search: 'Stark' }, action)).toEqual({ region: 'The North' })
  })

  it('Retruns { region: \'Dorne\' } from { region: \'The North\' }', () => {
    let action = { type: 'SET_REGION', region: 'Dorne' }
    expect(AppReducer({ region: 'The North' }, action)).toEqual({ region: 'Dorne' })
  })

})
