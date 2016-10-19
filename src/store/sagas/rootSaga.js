/* @flow */
import houseSaga from './houseSaga'

export default function *() {
  yield [
    houseSaga(),
  ]
}
