import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router'

class App extends Component {
  render () {
    return (
      <Router>
        <Suspense fallback={null}>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default App
