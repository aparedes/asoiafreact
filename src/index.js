/* @flow */
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'

ReactDOM.render(
  (
    <Provider store={ configureStore({}) }>
      <App />
    </Provider>
  ),
  document.getElementById('root')
)
