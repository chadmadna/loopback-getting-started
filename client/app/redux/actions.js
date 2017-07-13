import * as constants from './constants'
import * as lbclient from '../lbclient'
import { hashHistory } from 'react-router'

const baseUrl = typeof document === 'object' ? document.body.dataset.baseurl : 'http://localhost:3000/api'

/** REVIEWS **/
export const invalidateReviews = () => ({
  type: constants.INVALIDATE_REVIEWS
})

/** REVIEW FORM **/
export const changeReviewAction = action => ({
  type: constants.CHANGE_REVIEW_ACTION,
  action
})

/** ASYNC REVIEW CALLS **/
export const fetchAllReviews = () => {
  const filter = {
    include: [ 'coffeeShop', 'reviewer' ]
  }

  return lbclient.find('Reviews', filter)
}

export const fetchMyReviews = publisherId => {
  const filter = {
    where: { publisherId },
    include: [ 'coffeeShop', 'reviewer' ]
  }
  
  return lbclient.find('Reviews', filter)
}

export const fetchCoffeeShops = () => {
  return lbclient.find('CoffeeShops')
}

export const addReview = (coffeeShopId, rating, comments, publisherId) => {
  const review = {
    date: Date.now(),
    publisherId,
    rating,
    comments,
    coffeeShopId
  }

  return lbclient.create('Reviews', review, () => {
    hashHistory.push('/my-reviews')
  })
}

export const editReview = (coffeeShopId, rating, comments, reviewId, publisherId) => {
  const review = {
    date: Date.now(),
    publisherId,
    rating,
    comments,
    coffeeShopId
  }

  return lbclient.updateById('Reviews', reviewId, review, () => {
    hashHistory.push('/my-reviews')
  })
}

export const deleteReview = reviewId => {
  return lbclient.destroyById('Reviews', reviewId, () => {
    window.location.reload()
  })
}

/** ASYNC AUTH CALLS **/
export const login = credentials => {
  return lbclient.login('Reviewers', credentials, () => {
    hashHistory.push('/add-review')
  })
}

export const logout = () => {
  return lbclient.logout('Reviewers', () => {
    hashHistory.push('/')
  })
}

export const register = credentials => {
  return lbclient.register('Reviewers', credentials, () => {
    hashHistory.push('/sign-up/success')
  })
}
