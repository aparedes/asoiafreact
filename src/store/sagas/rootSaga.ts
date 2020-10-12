/* @flow */
import houseSaga from './houseSaga';
import { all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

export default function*(): SagaIterator<void> {
  yield all(houseSaga());
}
