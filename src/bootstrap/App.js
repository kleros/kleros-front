import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Disputes from '../Disputes'
import Contracts from '../Contracts'
import { Provider } from 'react-redux'
import generateStore from './generateStore'
import registerServiceWorker from './registerServiceWorker'
import Layout from '../Layout'
import './index.css'

const store = generateStore()

const App = () => (
  <Provider store={ store }>
    <Router>
      <Switch>
        <Layout>
          <Route exact path='/Disputes' component={ Disputes } />
          <Route exact path='/Contracts' component={ Contracts } />
        </Layout>
      </Switch>
    </Router>
  </Provider>
)

registerServiceWorker()

export default App
