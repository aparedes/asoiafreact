import AppReducer, { AppEnum } from './app';

describe('Test App Reducer', () => {
  // it('Returns {}', () => {
  //   // Empty Reducer (This doesnt happen, usually it is given a REDUX action to start)
  //   expect(AppReducer(undefined, { type: 'WHATEVER' })).toEqual({});
  // });

  // it('Returns {} from unknown action', () => {
  //   expect(AppReducer({}, { type: 'INIT_REDUX' })).toEqual({});
  // });

  it("Return { search: 'Stark' } from {}", () => {
    expect(
      AppReducer({}, { type: AppEnum.SET_SEARCH, search: 'Stark' })
    ).toEqual({ search: 'Stark' });
  });

  it("Returns { search: 'Targaryan' } from { search: 'Stark' }", () => {
    expect(
      AppReducer(
        { search: 'Stark' },
        { type: AppEnum.SET_SEARCH, search: 'Targaryan' }
      )
    ).toEqual({
      search: 'Targaryan',
    });
  });

  it("Retruns { region: 'The North' } from { search: 'Stark' }", () => {
    expect(
      AppReducer(
        { search: 'Stark' },
        { type: AppEnum.SET_REGION, region: 'The North' }
      )
    ).toEqual({
      region: 'The North',
    });
  });

  it("Retruns { region: 'Dorne' } from { region: 'The North' }", () => {
    expect(
      AppReducer(
        { region: 'The North' },
        { type: AppEnum.SET_REGION, region: 'Dorne' }
      )
    ).toEqual({
      region: 'Dorne',
    });
  });
});
