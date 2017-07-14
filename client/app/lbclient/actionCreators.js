import * as constants from './constants'

export const request = (modelName) => ({
  type: constants.LB_REQUEST,
  model: modelName
})

export const success = (modelName) => ({
  type: constants.LB_SUCCESS,
  model: modelName
})

export const receive = (modelName, data) => ({
  type: constants.LB_RECEIVE,
  model: modelName,
  data
})

export const error = (modelName, message) => ({
  type: constants.LB_ERROR,
  message
})

/** AUTH **/
export const requestLogin = credentials => ({
  type: constants.LB_LOGIN_REQUEST,
  credentials
})

export const receiveLogin = data => ({
  type: constants.LB_LOGIN_SUCCESS,
  userInfo: {
    accessToken: data.id,
    userId: data.userId
  }
})

export const requestLogout = () => ({
  type: constants.LB_LOGOUT_REQUEST
})

export const receiveLogout = () => ({
  type: constants.LB_LOGOUT_SUCCESS
})

export const requestRegister = () => ({
  type: constants.LB_REGISTER_REQUEST
})

export const receiveRegister = () => ({
  type: constants.LB_REGISTER_SUCCESS
})

export const authError = message => ({
  type: constants.LB_AUTH_ERROR,
  message
})