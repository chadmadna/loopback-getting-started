import React from 'react'
import { connect } from 'react-redux'
import { register } from '../redux/actions'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    const { dispatch } = this.props
    const email = event.target.elements['email'].value
    const password = event.target.elements['password'].value
    dispatch(register({ email, password }))
    event.preventDefault()
  }

  render() {
    return (
      <section>
        <form name="form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Sign up form</legend>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="text"/>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"/>
            </div>

            <div className="actions">
              <label></label>
              <button type="submit">Sign up</button>
            </div>
          </fieldset>
        </form>
      </section>
    )
  }
}

export default connect()(SignUpForm)
