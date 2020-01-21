import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

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
      <div className="login-container">
        <div className="all-login">
          <form className="log" onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="username"
              onChange={this.handleChange}
            />

            <input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={this.handleChange}
            />

            <input className="submit-btn" type="submit" value="Login" />

            <p className="log-sentence">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="span-account">Sign Up</span>{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
