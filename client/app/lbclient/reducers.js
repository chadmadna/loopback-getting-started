import { combineReducers } from 'redux'
import * as constants from './constants'

const defaultState = {
  auth: {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('userInfo') ? true : false,
    message: null
  },
  userInfo: !!localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

export const loopbackStore = (state = {}, action) => {
  switch (action.type) {
    case constants.LB_REQUEST:
      return {
        ...state,
        [action.model]: {
          ...state[action.model],
          isFetching: true,
          message: null
        }
      }
    case constants.LB_SUCCESS:
      return {
        ...state,
        [action.model]: {
          ...state[action.model],
          isFetching: false
        }
      }
    case constants.LB_RECEIVE:
      return {
        ...state,
        [action.model]: {
          ...state[action.model],
          isFetching: false,
          items: action.data
        }
      }
    case constants.LB_ERROR:
      return {
        ...state,
        [action.model]: {
          ...state[action.model],
          isFetching: false,
          message: action.message
        }
      }
    default:
      return state
  }
}

export const auth = (state = defaultState.auth, action) => {
  switch (action.type) {
    case constants.LB_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        message: null
      }
    case constants.LB_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true
      }
    case constants.LB_LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true,
        message: null
      }
    case constants.LB_LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      }
    case constants.LB_REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      }
    case constants.LB_REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      }
    case constants.LB_AUTH_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.message
      }
    default:
      return state
  }
}

export const userInfo = (state = defaultState.userInfo, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        email: action.credentials.email
      }
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.userInfo.accessToken,
        userId: action.userInfo.userId
      }
    case constants.LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}

export default combineReducers({ loopbackStore, auth, userInfo })
