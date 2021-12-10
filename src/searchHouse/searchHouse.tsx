import './searchHouse.css';
import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from '../store/reducers/app';

export function SearchHouse() {
  const dispatch = useDispatch();
  const onChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const input = evt.target;
      dispatch(appActions.setSearch(input.value));
    },
    [dispatch]
  );

  return (
    <input
      className={'search'}
      onChange={onChange}
      placeholder={'Search house'}
    />
  );
}
SearchHouse.displayName = 'SearchHouse';

export default SearchHouse;
