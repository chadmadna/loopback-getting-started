import * as constants from './constants'
import { get, post } from 'axios'
import { hashHistory } from 'react-router'

const baseUrl = typeof document === 'object' ? document.body.dataset.baseurl : 'http://localhost:3000/api'

/** REVIEWS **/
/** AUTH **/
const requestLogin = credentials => ({
  type: constants.LOGIN_REQUEST,
  credentials
})

const receiveLogin = accessToken => ({
  type: constants.LOGIN_SUCCESS,
  accessToken
})

const requestLogout = () => ({
  type: constants.LOGOUT_REQUEST
})

const receiveLogout = () => ({
  type: constants.LOGOUT_SUCCESS
})

const requestRegister = () => ({
  type: constants.REGISTER_REQUEST
})

const receiveRegister = () => ({
  type: constants.REGISTER_SUCCESS
})

const authError = message => ({
  type: constants.AUTH_ERROR,
  message
})

/** ASYNC AUTH CALLS **/
const login = credentials => {
  return dispatch => {
    dispatch(requestLogin(credentials))

    post(`${baseUrl}/reviewers/login`, credentials)
      .then(response => {
        localStorage.setItem('accessToken', response.data.id)
        dispatch(receiveLogin(response.id))
      })
      .catch(err => dispatch(authError(err.message)))
  }
}

const logout = () => {
  return dispatch => {
    dispatch(requestLogout())

    const accessToken = localStorage.getItem('accessToken')
    post(`${baseUrl}/reviewers/logout`, null, { headers: { 'authorization': accessToken } })
      .then(() => {
        localStorage.removeItem('accessToken')
        dispatch(receiveLogout())
        hashHistory.push('/')
      })
      .catch(err => dispatch(authError(err.message)))
  }
}

const register = credentials => {
  return dispatch => {
    dispatch(requestRegister())
    console.log({ credentials })

    post(`${baseUrl}/reviewers`, credentials)
      .then(() => {
        dispatch(receiveRegister())
        hashHistory.push('/sign-up/success')
      })
      .catch(err => dispatch(authError(err.message)))
  }
}

export { login, logout, register }