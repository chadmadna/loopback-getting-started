import React from 'react'
import { Link } from 'react-router'

const Forbidden = () => (
  <section>
    <h1>403 Forbidden</h1>
    <p>Please <Link to="/login" activeClassName="active">log in</Link> to perform this action.</p>
  </section>
)

export default Forbidden
