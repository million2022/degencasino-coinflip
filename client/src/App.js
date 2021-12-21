import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Flip from './components/games/coinflip/index.js'
import NotFound from './components/layout/NotFound';
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  useEffect(() => {
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Flip} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
