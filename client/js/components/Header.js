import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

const Header = ({ credentials, children }) => (
  <div>
    <header>
      <h1>Coffee shop reviews</h1>
      <h2>Hello {!!credentials && credentials.email}</h2>
      <nav>
        <ul>
          <li><Link to="/all-reviews">All reviews</Link></li>
          { !credentials && <li><Link to="/sign-up">Sign up</Link></li> }
          { !!credentials && <li><Link to="/my-reviews">My Reviews</Link></li> }
          { !!credentials && <li><Link to="/add-review">Add Review</Link></li> }
          { !credentials && <li><Link to="/login">Log in</Link></li> }
          { !!credentials && <li><Link to="/logout">Log out</Link></li> }
        </ul>
      </nav>
    </header>
    <main>
      { children }
    </main>
  </div>
)

export default connect(state => state)(Header)
