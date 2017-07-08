import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../redux/actions'

const Logout = ({ dispatch }) => {
  dispatch(logout())
  return (
    <div></div>
  )
}

export default connect()(Logout)
