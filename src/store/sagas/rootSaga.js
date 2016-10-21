/* @flow */
import houseSaga from './houseSaga'

export default function *(): Generator<*, *, *> {
  yield [
    houseSaga(),
  ]
}
