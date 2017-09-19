import React from 'react'
import Dashboard from '../containers/Dashboard'
import { Provider } from 'react-redux'
import generateStore from './generateStore'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

const store = generateStore()

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Redirect from='*' to='/' />
      </Switch>
    </Router>
  </Provider>
)

registerServiceWorker()

export default App
