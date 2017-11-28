import React from 'react'
import ReactDOM from 'react-dom'
import App from './bootstrap/App'
import store from './bootstrap/store'

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)
