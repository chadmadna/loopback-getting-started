import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { Router, Route, Redirect, hashHistory } from 'react-router'

import rootReducer from './redux/reducers'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger' // DEVELOPMENT ONLY

import {
  App,
  AllReviews,
  MyReviews,
  ReviewForm,
  SignUpForm,
  SignUpSuccess,
  Login,
  Logout,
  Forbidden
} from './components'

import EnsureLogin from './containers/EnsureLogin'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, createLogger())
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={App}>
        <Redirect path="/" to="/all-reviews"/>
        <Route path="/all-reviews" component={AllReviews}/>
        <Route path="/sign-up" component={SignUpForm}/>
        <Route path="/sign-up/success" component={SignUpSuccess}/>
        <Route path="/login" component={Login}/>
        <Route path="/forbidden" component={Forbidden}/>
        <Route component={EnsureLogin}>
          <Route path="/my-reviews" component={MyReviews}/>
          <Route path="/add-review" component={ReviewForm}/>
          <Route path="/edit-review/:id" component={ReviewForm}/>
          <Route path="/delete-review/:id" component={ReviewForm}/>
          <Route path="/logout" component={Logout}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)