/* @flow */
import './regions.css';
import React, { useCallback, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { ReduxState } from '../store/constants/reduxTypes';
import { appActions } from '../store/reducers/app';

interface RegionProps {
  region: string;
}
function Region(props: RegionProps) {
  const { region } = props;
  const dispatch = useDispatch();
  const isSelected = useSelector<ReduxState, boolean>(
    (state) => state.app.region === region,
    shallowEqual
  );
  const onClickRegion = useCallback(
    () => dispatch(appActions.setRegion(region)),
    [dispatch, region]
  );
  return (
    <div
      data-testid="regionItem"
      // {...(/active/.test(props.className) ? { 'data-testid': 'active' } : {})}
      className={isSelected ? 'regionItem active' : 'regionItem'}
      onClick={onClickRegion}
    >
      {region.length === 0 ? 'All' : region}
    </div>
  );
}
export function Regions() {
  const regions = useSelector<ReduxState, Readonly<string[]>>(
    (state) => state.houses.regions ?? [],
    shallowEqual
  );
  const regionsMapped = useMemo(
    () =>
      regions.map((region) => {
        return <Region key={region} region={region} />;
      }),
    [regions]
  );
  return <div className={'regions'}>{regionsMapped}</div>;
}

export default Regions;
