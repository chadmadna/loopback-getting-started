import { combineReducers } from 'redux'
import * as constants from './constants'

const defaultState = {
  reviews: {
    isFetching: false,
    didInvalidate: false,
    items: [],
    message: null
  },
  reviewForm: {
    action: null,
    coffeeShops: [],
    isSubmitting: false,
    message: null
  },
  auth: {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('userInfo') ? true : false,
    message: null
  },
  userInfo: !!localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const reviews = (state = defaultState.reviews, action) => {
  switch (action.type) {
    case constants.INVALIDATE_REVIEWS:
      return {
        ...state,
        didInvalidate: true
      }
    case constants.REVIEWS_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        message: null
      }
    case constants.REVIEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.reviews
      }
    case constants.REVIEWS_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.message
      }
    default:
      return state
  }
}

const reviewForm = (state = defaultState.reviewForm, action) => {
  switch (action.type) {
    case constants.CHANGE_REVIEW_ACTION:
      return {
        ...state,
        action: action.action
      }
    case constants.SUBMIT_REVIEW:
      return {
        ...state,
        isSubmitting: true
      }
    case constants.REVIEW_FORM_SUCCESS:
      return {
        ...state,
        action: null,
        isSubmitting: false
      }
    case constants.REVIEW_FORM_ERROR:
      return {
        ...state,
        isSubmitting: false,
        message: action.message
      }
    case constants.COFFEESHOPS_REQUEST:
      return {
        ...state,
        isFetching: true,
        message: null
      }
    case constants.COFFEESHOPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        coffeeShops: action.coffeeShops
      }
    case constants.COFFEESHOPS_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.message
      }
    default:
      return state
  }
}

const auth = (state = defaultState.auth, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        message: null
      }
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true
      }
    case constants.LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true,
        message: null
      }
    case constants.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      }
    case constants.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case constants.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      }
    case constants.AUTH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.message
      }
    default:
      return state
  }
}

const userInfo = (state = defaultState.userInfo, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        email: action.credentials.email
      }
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        userId: action.userId
      }
    case constants.LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}

export default combineReducers({ reviews, reviewForm, auth, userInfo })
