import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

class EnsureLogin extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL, isLoggedIn } = this.props

    if (!isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      // dispatch(setRedirectUrl(currentURL)) // TODO: Implement redirect after login
      hashHistory.replace("/forbidden")
    }
  }

  render() {
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.auth.isAuthenticated,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(EnsureLogin)