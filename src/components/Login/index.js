import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: '',
    errormsg: '',
    isPasswordChecked: false,
  }

  onSuccessLogin = jwttoken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwttoken, {expires: 30})
    history.replace('/')
  }

  onSubmitfailure = errormsg => {
    console.log(errormsg)
    this.setState({
      errormsg,
      showSubmitError: true,
    })
  }

  submitform = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onSubmitfailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }
  onChecked = event => {
    this.setState({
      isPasswordChecked: event.target.checked,
    })
  }
  render() {
    const {username, password, showSubmitError, errormsg,isPasswordChecked} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
         <div className="Login-bg-container">
          <div>
            <img
              className="login-image"
              src="https://res.cloudinary.com/dgviahrbs/image/upload/v1694865940/Rectangle_1467_qrjtjm.png"
              alt="login page logo"
            />
          </div>
          <div className="login-cred-container">
            <div className="login-base">
              <img
                src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695566650/gpt-bookshelf-low-resolution-logo-black-on-transparent-background_f5zfuu.png" className='logo-bg'
                alt="website logo"
              />
              <form onSubmit={this.submitform}>
                <div className="input-container">
                  <label htmlFor="username" className="label">
                    Username*
                  </label>
                  <input
                    className="input"
                    placeholder="aakash"
                    id="username"
                    type="text"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password" className="label">
                    Password*
                  </label>
                  
                  
                    {isPasswordChecked && (
                    <input
                      value={password}
                      className="input"
                      id="password"
                      placeholder="sky@007"
                      type="text"
                      onChange={this.onChangePassword}
                    />
                  )}
                  {!isPasswordChecked && (
                   <input
                   className="input"
                   placeholder="********"
                   id="password"
                   type="password"
                   onChange={this.onChangePassword}
                   value={password}
                 />
                  )}
                  <div>
                    <input  id="checkBox"
                      type="checkbox"
                      onClick={this.onChecked}/>
                      <label className="label" htmlFor="checkBox"> ShowPassword</label>
                  </div>

                </div>
                <button type="submit" className="Login-button">
                  Login
                </button>
                {showSubmitError && <p className="error">{errormsg}</p>}
              </form>
            </div>
          </div>
         </div>

        <div className="login-bg-small-container">
              <div className='image-container'>
                 <img src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695400786/Ellipse_99_qkndje.jpg" alt="Book Logo"/>
              </div>
              <div className="logo-sm-container">
            <img
              src="https://res.cloudinary.com/dgviahrbs/image/upload/v1695566650/gpt-bookshelf-low-resolution-logo-black-on-transparent-background_f5zfuu.png"
              className='website-logo-small' alt="logo"
            />
          
              </div>
            
              <form className='form-sm-container' onSubmit={this.submitform}>
              <div className="input-sm-container">
                <label htmlFor="smUsername" className="label-sm">
                  UserName*
                </label>
                <input
                  id="smUsername"
                  placeholder="aakash"
                  className="input-sm"
                  type="text"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-sm-container">
                <label htmlFor="smPassword" className="label-sm">
                  Password*
                </label>
                
                 
                 {isPasswordChecked && (
                    <input
                      value={password}
                      className="input-sm"
                      id="password"
                      placeholder="sky@007"
                      type="text"
                      onChange={this.onChangePassword}
                    />
                  )}
                  {!isPasswordChecked && (
                  <input
                  id="smPassword"
                  placeholder="********"
                  className="input-sm"
                  type="password"
                  onChange={this.onChangePassword}
                  value={password}
                />
                  )}
                  <div>
                    <input  id="checkBox"
                      type="checkbox"
                      onClick={this.onChecked}/>
                      <label className="label" htmlFor="checkBox"> ShowPassword</label>
                  </div>













              </div>
              <button type="submit" className="login-button-sm">
                Login
              </button>
              {showSubmitError && <p className="error">{errormsg}</p>}
            </form>

        </div>
      </div>
    )
  }
}
export default Login
