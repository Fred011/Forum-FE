import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import {Link} from 'react-router-dom'

class Login extends Component {
  state = { username: '', password: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className='login-container'>
        <div className="all-login">
          <h1>Login</h1>
          <form className='log' onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />

            <input className='submit-btn' type="submit" value="Login" />

            <p>Don't have an account? <Link to="/signup"><span className='span-account'>Sign Up</span> </Link></p>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
