import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

class Signup extends Component {
  state = { username: '', password: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    //  console.log('Signup -> form submit', { username, password });
    this.props.signup({ username, password }); // props.signup is Provided by withAuth() and Context API
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
          <h1>Sign Up</h1>
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

            <input className='signup-btn' type="submit" value="Signup" />
          </form>

          <p>Already have account?<Link to={'/login'}> <span className='span-account2'>Login</span></Link></p>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
