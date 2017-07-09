import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const App = ({ user, children }) => (
  <main>
    <header id="header">
      <h1>Coffee shop reviews</h1>
      {
        !!user && <h2>Hello {!!user && user.email}</h2>
      }
      <nav>
        <ul>
          <li><Link activeClassName="active" to="/all-reviews">All reviews</Link></li>
          {
            !user && <li><Link activeClassName="active" to="/sign-up">Sign up</Link></li>
          }
          {
            !!user && <li><Link activeClassName="active" to="/my-reviews">My Reviews</Link></li>
          }
          {
            !!user && <li><Link activeClassName="active" to="/add-review">Add Review</Link></li>
          }
          {
            !user && <li><Link activeClassName="active" to="/login">Log in</Link></li>
          }
          {
            !!user && <li><Link activeClassName="active" to="/logout">Log out</Link></li>
          }
        </ul>
      </nav>
    </header>
    { children }
  </main>
)

const mapStateToProps = state => ({
  user: state.userInfo
})

export default connect(mapStateToProps)(App)
