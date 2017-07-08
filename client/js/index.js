import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import rootReducer from './redux/reducers'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger' // DEVELOPMENT ONLY

import Header from './components/Header'
import SignUpForm from './components/SignUpForm'
import SignUpSuccess from './components/SignUpSuccess'
import Login from './components/Login'
import Logout from './components/Logout'

const store = createStore(
  rootReducer,
  applyMiddleware(createLogger(), thunk)
)

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <Router history={hashHistory}>
      <Route path="/" component={Header}>
        <Route path="/sign-up" component={SignUpForm}/>
        <Route path="/sign-up/success" component={SignUpSuccess}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        {/* <IndexRoute render={() => (<Redirect to="/all-reviews"/>)}/> */}
        {/* <Route path="/all-reviews" component={AllReviews}/> */}
        {/*<Route path="/my-reviews" component={MyReviews}/> */}
        {/*<Route path="/add-review" component={AddReview}/> */}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)