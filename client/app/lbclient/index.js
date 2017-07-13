import { get, post, patch, delete as del } from 'axios'
import {
  request,
  success,
  receive,
  error,
  requestLogin,
  receiveLogin,
  requestLogout,
  receiveLogout,
  requestRegister,
  receiveRegister,
  authError
} from './actionCreators'

const baseUrl = typeof document === 'object' 
  ? document.body.dataset.baseurl 
  : 'http://0.0.0.0:3000/api'

const getAccessToken = () => {
  return JSON.parse(localStorage.getItem('userInfo')).accessToken
}

export const create = (modelName, data, done) => {
  return dispatch => {
    dispatch(request(modelName))
    const config = { headers: { 'authorization': getAccessToken() } }
    post(`${baseUrl}/${modelName}`, data, config)
      .then(() => {
        dispatch(success(modelName))
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(error(err.message)))
  }
} 

export const find = (modelName, filter = {}, done) => {
  return dispatch => {
    dispatch(request(modelName))
    const config = { params: { filter }, headers: { 'authorization': getAccessToken() } }
    get(`${baseUrl}/${modelName}`, config)
      .then(({ data }) => {
        dispatch(receive(modelName, data))
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(error(err.message)))
  }
} 

export const findById = (modelName, id, filter = {}, done) => {
  return dispatch => {
    dispatch(request(modelName))
    const config = { params: { filter }, headers: { 'authorization': getAccessToken() } }
    get(`${baseUrl}/${modelName}/${id}`, config)
      .then(({ data }) => {
        dispatch(receive(modelName, data))
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(error(err.message)))
  }
} 

export const findOne = (modelName, filter = {}, done) => {
  return dispatch => {
    dispatch(request(modelName))
    const config = { params: { filter }, headers: { 'authorization': getAccessToken() } }
    get(`${baseUrl}/${modelName}`, config)
      .then(({ data }) => {
        dispatch(receive(data[0]))
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(error(err.message)))
  }
} 

export const updateAll = (modelName, filter = {}, data, done) => {
  return dispatch => {
    dispatch(request(modelName))
    const config = { params: { filter }, headers: { 'authorization': getAccessToken() } }
    post(`${baseUrl}/${modelName}`, data, config)
      .then(({ data }) => {
        dispatch(success(modelName))
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(error(err.message)))
  }
}

export const updateById = (modelname, id, data, done) => {
  return dispatch => {
    dispatch(request(modelName))
    const config = { params: { filter }, headers: { 'authorization': getAccessToken() } }
    get(`${baseUrl}/${modelName}/${id}`, config)
      .then(({ data }) => {
        dispatch(success(modelName))
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(error(err.message)))
  }
}

export const destroyById = (modelName, id, done) => {
  return dispatch => {
    dispatch(request(modelName))
    const config = { headers: { 'authorization': getAccessToken() } }
    delete(`${baseUrl}/${modelName}/${id}`, config)
      .then(({ data }) => {
        dispatch(success(modelName))
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(error(err.message)))
  }
}

export const register = (credentials, done) => {
  return dispatch => {
    dispatch(requestRegister())

    post(`${baseUrl}/User`, credentials)
      .then(() => {
        dispatch(receiveRegister())
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(authError(err.message)))
  }
}

export const login = (credentials, done) => {
  return dispatch => {
    dispatch(requestLogin(credentials))

    post(`${baseUrl}/User/login`, credentials)
      .then(({ data }) => {
        dispatch(receiveLogin(data))
        const userInfo = { accessToken: data.id, userId: data.userId, email: credentials.email }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(authError(err.message)))
  }
}

export const logout = (done) => {
  return dispatch => {
    dispatch(requestLogout(modelName))
    const config = { headers: { 'authorization': getAccessToken() } }
    post(`${baseUrl}/User/logout`, null, config)
      .then(() => {
        localStorage.removeItem('userInfo')
        dispatch(receiveLogout(modelName))
        if (done && typeof done == 'function') done()
      })
      .catch(err => dispatch(authError(err.message)))
  }
}
