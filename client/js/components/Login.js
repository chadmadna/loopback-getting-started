import React from 'react'
import { connect } from 'react-redux'
import { login } from '../redux/actions'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      email: 'foo@bar.com',
      password: 'foobar',
      submitted: false
    }
  }

  handleSubmit(event) {
    const { dispatch } = this.props
    const email = event.target.elements['email'].value
    const password = event.target.elements['password'].value
    const valid = email.trim().length && password.trim().length
    this.setState({ submitted: true })
    if (valid) {
      dispatch(login({ email, password }))
      this.setState({ submitted: false })
    }
    event.preventDefault()
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, submitted: false })
  }

  render() {
    return (
      <section>
        <form name="form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Login form</legend>

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/>
              {
                !this.state.email.trim()
                && this.state.submitted
                && <p className="hint">Email is required</p>
              }
            </div>

            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
              {
                !this.state.password.trim()
                && this.state.submitted
                && <p className="hint">Password is required</p>
              }
            </div>

            <div className="actions">
              <label></label>
              <button type="submit">Login</button>
            </div>
          </fieldset>
        </form>
      </section>
    )
  }
}

export default connect()(Login)
