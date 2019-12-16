import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import ProfileDetails from "../components/ProfileDetails";
import axios from "axios";
import { Link } from "react-router-dom";
import TopicListProfile from "./../components/TopicListProfile";
import userService from "../lib/user-service";
import { element } from "prop-types";

class Profile extends Component {
  state = {
    username: "",
    description: "",
    topicsList: [],
    commentsList: []
  };

  componentDidMount() {
    userService
      .getMyComments()
      .then(data => {
        this.setState({ commentsList: data });
      })
      .catch(err => console.log(err));

    userService
      .getMyTopics()
      .then( (data) => {
          this.setState({ topicsList: data })
      })
      .catch( (err) => console.log(err));

      userService
        .getUserData()
        .then( (data) => {
            this.setState({
                username: data.username
            })
        })
        .catch( (err) => console.log(err));
  }

  render() {

    const {commentsList} = this.state
    const allMyComments = commentsList.map( element => {
        return <div key={element._id}> 
            <h3>title: {element.title}</h3>
            <p>message: {element.message}</p>
        </div>
    })

    const { topicsList } = this.state;
    const allMyTopics = topicsList.map( element => {
        return <div key={element._id}>
                    <h3>{element.title}</h3>
                    <p>{element.message}</p>
                </div>
    })

    return (
      <div className="profile">
        <h1>Profile page</h1>
        {this.state.username}


        <div className="fav-section">
          <h1>
            <Link to="/profile/mytopics">My Topics</Link> /{" "}
            <Link to="/profile/mycomments">My comments</Link>
          </h1>
          {allMyComments}
          <TopicListProfile />
          {allMyTopics}
        </div>

        <Link to="/profile/edit">
          <button onClick={this.renderEditProfile}>Edit Profile</button>
        </Link>
      </div>
    );
  }
}

export default withAuth(Profile);
