import * as constants from './constants'
import { get, post, patch, delete as del } from 'axios'
import { hashHistory } from 'react-router'

const baseUrl = typeof document === 'object' ? document.body.dataset.baseurl : 'http://localhost:3000/api'

/** REVIEWS **/
export const invalidateReviews = () => ({
  type: constants.INVALIDATE_REVIEWS
})

export const requestReviews = () => ({
  type: constants.REVIEWS_REQUEST
})

export const receiveReviews = reviews => ({
  type: constants.REVIEWS_SUCCESS,
  reviews
})

export const reviewError = message => ({
  type: constants.REVIEWS_ERROR,
  message
})

/** REVIEW FORM **/
export const changeReviewAction = action => ({
  type: constants.CHANGE_REVIEW_ACTION,
  action
})

export const submitReviewForm = () => ({
  type: constants.SUBMIT_REVIEW
})

export const receiveReviewForm = () => ({
  type: constants.REVIEW_FORM_SUCCESS
})

export const reviewFormError = message => ({
  type: constants.REVIEW_FORM_ERROR,
  message
})

export const requestCoffeeShops = () => ({
  type: constants.COFFEESHOPS_REQUEST
})

export const receiveCoffeeShops = coffeeShops => ({
  type: constants.COFFEESHOPS_SUCCESS,
  coffeeShops
})

export const coffeeShopsError = message => ({
  type: constants.COFFEESHOPS_ERROR,
  message
})

/** AUTH **/
export const requestLogin = credentials => ({
  type: constants.LOGIN_REQUEST,
  credentials
})

export const receiveLogin = (accessToken, userId) => ({
  type: constants.LOGIN_SUCCESS,
  accessToken,
  userId
})

export const requestLogout = () => ({
  type: constants.LOGOUT_REQUEST
})

export const receiveLogout = () => ({
  type: constants.LOGOUT_SUCCESS
})

export const requestRegister = () => ({
  type: constants.REGISTER_REQUEST
})

export const receiveRegister = () => ({
  type: constants.REGISTER_SUCCESS
})

export const authError = message => ({
  type: constants.AUTH_ERROR,
  message
})

/** ASYNC REVIEW CALLS **/
export const fetchAllReviews = () => {
  return dispatch => {
    dispatch(requestReviews())

    const config = {
      params: {
        filter: {
          include: [ 'coffeeShop', 'reviewer' ]
        }
      }
    }
    get(`${baseUrl}/reviews`, config)
      .then(({ data }) => {
        dispatch(receiveReviews(data))
      })
      .catch(err => dispatch(reviewError(err.message)))
  }
}

export const fetchMyReviews = () => {
  return (dispatch, getState) => {
    dispatch(requestReviews())

    const config = {
      params: {
        filter: {
          where: { publisherId: getState().userInfo.userId },
          include: [ 'coffeeShop', 'reviewer' ]
        }
      }
    }
    get(`${baseUrl}/reviews`, config)
      .then(({ data }) => {
        dispatch(receiveReviews(data))
      })
      .catch(err => dispatch(reviewError(err.message)))
  }
}

export const fetchCoffeeShops = () => {
  return dispatch => {
    dispatch(requestCoffeeShops())

    get(`${baseUrl}/CoffeeShops`)
      .then(({ data }) => {
        dispatch(receiveCoffeeShops(data))
      })
      .catch(err => dispatch(coffeeShopsError(err.message)))
  }
}

export const addReview = (coffeeShopId, rating, comments) => {
  return (dispatch, getState) => {
    dispatch(submitReviewForm())
    const review = {
      date: Date.now(),
      publisherId: getState().userInfo.userId,
      rating,
      comments,
      coffeeShopId
    }
    const accessToken = JSON.parse(localStorage.getItem('userInfo')).accessToken
    post(`${baseUrl}/reviews`, review, { headers: { 'authorization': accessToken } })
      .then(() => {
        dispatch(receiveReviewForm())
        hashHistory.push('/my-reviews')
      })
      .catch(err => dispatch(reviewFormError(err.message)))
  }
}

export const editReview = (coffeeShopId, rating, comments, reviewId) => {
  return (dispatch, getState) => {
    dispatch(submitReviewForm())
    const review = {
      date: Date.now(),
      publisherId: getState().userInfo.userId,
      rating,
      comments,
      coffeeShopId
    }
    const accessToken = JSON.parse(localStorage.getItem('userInfo')).accessToken
    patch(`${baseUrl}/reviews/${reviewId}`, review, { headers: { 'authorization': accessToken } })
      .then(() => {
        dispatch(receiveReviewForm())
        hashHistory.push('/my-reviews')
      })
      .catch(err => dispatch(reviewFormError(err.message)))
  }
}

export const deleteReview = reviewId => {
  return (dispatch, getState) => {
    dispatch(submitReviewForm())
    const accessToken = JSON.parse(localStorage.getItem('userInfo')).accessToken
    del(`${baseUrl}/reviews/${reviewId}`, { headers: { 'authorization': accessToken } })
      .then(() => {
        dispatch(receiveReviewForm())
        window.location.reload()
      })
      .catch(err => dispatch(reviewFormError(err.message)))
  }
}

/** ASYNC AUTH CALLS **/
export const login = credentials => {
  return (dispatch, getState) => {
    dispatch(requestLogin(credentials))

    post(`${baseUrl}/reviewers/login`, credentials)
      .then(({ data }) => {
        dispatch(receiveLogin(data.id, data.userId))
        const userInfo = { accessToken: data.id, userId: data.userId, email: getState().userInfo.email }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        hashHistory.push('/add-review')
      })
      .catch(err => dispatch(authError(err.message)))
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(requestLogout())
    const accessToken = JSON.parse(localStorage.getItem('userInfo')).accessToken
    post(`${baseUrl}/reviewers/logout`, null, { headers: { 'authorization': accessToken } })
      .then(() => {
        localStorage.removeItem('userInfo')
        dispatch(receiveLogout())
        hashHistory.push('/')
      })
      .catch(err => dispatch(authError(err.message)))
  }
}

export const register = credentials => {
  return dispatch => {
    dispatch(requestRegister())

    post(`${baseUrl}/reviewers`, credentials)
      .then(() => {
        dispatch(receiveRegister())
        hashHistory.push('/sign-up/success')
      })
      .catch(err => dispatch(authError(err.message)))
  }
}
