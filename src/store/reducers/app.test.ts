import { appReducer, appActions } from './app';

describe('Test App Reducer', () => {
  // it('Returns {}', () => {
  //   // Empty Reducer (This doesnt happen, usually it is given a REDUX action to start)
  //   expect(AppReducer(undefined, { type: 'WHATEVER' })).toEqual({});
  // });

  // it('Returns {} from unknown action', () => {
  //   expect(AppReducer({}, { type: 'INIT_REDUX' })).toEqual({});
  // });

  it("Return { search: 'Stark' } from {}", () => {
    expect(appReducer({}, appActions.setSearch('Stark'))).toEqual({
      search: 'Stark',
    });
  });

  it("Returns { search: 'Targaryan' } from { search: 'Stark' }", () => {
    expect(
      appReducer({ search: 'Stark' }, appActions.setSearch('Targaryan'))
    ).toEqual({
      search: 'Targaryan',
    });
  });

  it("Retruns { region: 'The North' } from { search: 'Stark' }", () => {
    expect(
      appReducer({ search: 'Stark' }, appActions.setRegion('The North'))
    ).toEqual({
      search: 'Stark',
      region: 'The North',
    });
  });

  it("Retruns { region: 'Dorne' } from { region: 'The North' }", () => {
    expect(
      appReducer({ region: 'The North' }, appActions.setRegion('Dorne'))
    ).toEqual({
      region: 'Dorne',
    });
  });
});
