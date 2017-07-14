import { combineReducers } from 'redux'
import { loopbackStore, auth, userInfo } from '../lbclient/reducers'
import * as constants from './constants'
import * as lbConstants from '../lbclient/constants'

const defaultState = {
  reviews: {
    didInvalidate: false
  },
  reviewForm: {
    action: null
  }
}

const reviews = (state = defaultState.reviews, action) => {
  switch (action.type) {
    case constants.INVALIDATE_REVIEWS:
      return {
        didInvalidate: true
      }
    case lbConstants.LB_REQUEST:
      return {
        didInvalidate: false
      }
    case lbConstants.LB_SUCCESS:
      return {
        didInvalidate: false
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
    default:
      return state
  }
}

export default combineReducers({ reviews, reviewForm, loopbackStore, auth, userInfo })
