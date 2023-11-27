import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', Password: '', errorMsg: '', showErrorMsg: false}

  userNameChange = event => {
    this.setState({userName: event.target.value})
  }

  passwordChange = event => {
    this.setState({Password: event.target.value})
  }

  formSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  formSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  formSubmit = async event => {
    event.preventDefault()
    const {userName, Password} = this.state
    const userDetails = {
      username: userName,
      password: Password,
    }
    console.log(userDetails)
    const URL = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(URL, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      console.log('success')
      this.formSubmitSuccess(data.jwt_token)
    } else {
      console.log('failure')
      this.formSubmitFailure(data.error_msg)
    }
    console.log(userName)
    console.log(Password)
  }

  render() {
    const {userName, Password, showErrorMsg, errorMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginMainContainer">
        <div className="loginCardContainer">
          <div className="loginLogoContainer">
            <img
              className="loginLogoImg"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>

          <form type="form" className="loginForm" onSubmit={this.formSubmit}>
            <div className="inputContainer">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                className="loginInput"
                placeholder="Username"
                id="username"
                value={userName}
                onChange={this.userNameChange}
              />
            </div>
            <div className="inputContainer">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                className="loginInput"
                placeholder="Password"
                id="password"
                value={Password}
                onChange={this.passwordChange}
              />
            </div>
            <button type="submit" className="loginBtn">
              Login
            </button>
            {showErrorMsg && <p className="errorMsg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
