import * as constants from './constants'

const defaultState = {
  credentials: null,
  reviews: [],
  auth: {
    isFetching: false,
    isAuthenticated: localStorage.getItem('accessToken') ? true : false,
    message: null,
    accessToken: null
  }
}

function rootReducer(state = defaultState, action) {
  switch (action.type) {
    /** REVIEWS **/
    // case constants.REQUEST_REVIEWS:
    // case constants.RECEIVE_REVIEWS:
    // case constants.ALL_REVIEWS:
    // case constants.ADD_REVIEW:
    // case constants.EDIT_REVIEW:
    // case constants.DELETE_REVIEW:

    /** AUTH **/
    case constants.LOGIN_REQUEST:
      return {
        ...state,
        auth: {
          isFetching: true,
          isAuthenticated: false,
          message: null,
        },
        credentials: {
          email: action.credentials.email
        }
      }
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          isFetching: false,
          isAuthenticated: true,
          accessToken: action.accessToken
        }
      }
    case constants.LOGOUT_REQUEST:
      return {
        ...state,
        auth: {
          isFetching: true,
          isAuthenticated: true,
          message: null
        }
      }
    case constants.LOGOUT_SUCCESS:
      return {
        ...state,
        auth: {
          isFetching: false,
          isAuthenticated: false,
          accessToken: null
        },
        credentials: null
      }
    case constants.REGISTER_REQUEST:
      return {
        ...state,
        auth: {
          isFetching: true,
          isAuthenticated: false
        }
      }
    case constants.REGISTER_SUCCESS:
      return {
        ...state,
        auth: {
          isFetching: false,
          isAuthenticated: false
        }
      }
    case constants.AUTH_FAILURE:
      return {
        ...state,
        auth: {
          isFetching: false,
          message: action.message
        }
      }
    default:
      return state
  }
}

export default rootReducer