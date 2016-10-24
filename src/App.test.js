import { App } from './App'
import React from 'react'
import ReactDOM from 'react-dom'

jest.mock('./regions/regions')
jest.mock('./housesList/housesList')
jest.mock('./searchHouse/searchHouse')
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App getAllHouses={ () => {} }/>, div)
})
