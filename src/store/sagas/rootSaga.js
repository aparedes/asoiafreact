/* @flow */
import houseSaga from './houseSaga';
import { all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

export default function*(): Saga<void> {
  yield all(houseSaga());
}
