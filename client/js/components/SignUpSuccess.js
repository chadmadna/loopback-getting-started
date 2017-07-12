import React from 'react'
import { Link } from 'react-router'

const SignUpSuccess = () => (
  <section>
    <h1>You are now registered.</h1>
    <p>Please <Link to="/login">log in</Link> to perform
        more actions.</p>
  </section>
)

export default SignUpSuccess
