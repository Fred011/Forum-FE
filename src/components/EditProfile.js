import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import userService from "../lib/user-service";
import { withRouter } from "react-router-dom";
import Navbar from "./Navbar";

export class EditProfile extends Component {
  state = {
    username: "",
    description: "",
    userID: []
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // deleteProfile = () => {
  //     axios.delete(`http://localhost:5000/profile/${id}/delete`)
  // 	.then( () => this.props.history.push('/projects') )
  // 	.catch( (err) => console.log(err));
  // }

  componentDidMount() {
    userService
      .getUserData()
      .then(data => {
        this.setState({
          username: data.username,
          description: data.description,
          userID: data._id
        });
      })
      .catch(err => console.log(err));
  }

  handleFormSubmit = e => {
    e.preventDefault();
    let updatedUser = this.state;

    userService.updateUserData(updatedUser).then(() => {
      this.props.history.push("/profile");
    });
  };

  render() {
    return (
      <div className="testcards">
        <Navbar />
        <div className="edit-form-container">
          <div className="form-profile">
            <form
              className="edit-profile-form"
              onSubmit={this.handleFormSubmit}
            >
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />

              <textarea
                name="description"
                value={this.state.description}
                placeholder="About you"
                onChange={e => this.handleChange(e)}
              />

              <input className="submit-btn" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditProfile);
