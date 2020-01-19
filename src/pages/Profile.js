import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
// import ProfileDetails from "../components/ProfileDetails";
import axios from "axios";
import { Link } from "react-router-dom";
import TopicListProfile from "./../components/TopicListProfile";
import userService from "../lib/user-service";
import TopicCardProfile from "../components/TopicCardProfile";
import CommentCardProfile from "../components/CommentCardProfile";
import Navbar from "../components/Navbar";
import Signup from "./Signup"

class Profile extends Component {
  state = {
    username: "",
    description: "",
    topicsList: [],
    commentsList: [],
    userId: '',
    showCard: true
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    userService
      .getUserData()
      .then(data => {
        const { username, description, topics, comments } = data;

        this.setState({
          username,
          description,
          topicsList: topics,
          commentsList: comments,
          userId: data._id
        });

        console.log("DATAAAAA", data);
      })
      .catch(err => console.log(err));
  };

  toggleSection = () => {
    let showCommentCard = this.state.showCard;
    this.setState({ showCard: !showCommentCard });
  };

  handleDeleteProfile = (userId) => {
    const userID = this.state.userId;
    console.log('USERIDDDDDDD', this.state.userId);
    
    userService.deleteUser(userID).then(console.log('user deleted')
    );
  };

  render() {
    const { commentsList } = this.state;
    const allMyComments = commentsList.map(element => {
      return (
        <CommentCardProfile
          key={element._id}
          user={element.user}
          message={element.message}
        />
      );
    });

    const { topicsList } = this.state;
    const allMyTopics = topicsList.map(element => {
      return (
        <TopicCardProfile
          key={element._id}
          title={element.title}
          message={element.message}
          votes={element.vote}
          comments={element.comments}
        />
      );
    });

    return (
      <div className="testcards">
        <Navbar />
        <div className="profile-container">
          <div className="profile-data">
            <img
              src="/Photo Linkedin a envoyer copie.jpg"
              className="profile-picture"
              alt="profile picture"
            />

            <h2>{this.state.username}</h2>

            {this.state.description ? (
              <p>{this.state.description}</p>
            ) : (
              <p className="description">Add a description</p>
            )}

            <div className="edit-profile-container">
              <Link to="/profile-edit">
                <button className="edit-btn">Edit</button>
              </Link>

              <button
                className="delete-btn"
                onClick={() => this.handleDeleteProfile()}
              >
                <img
                  className="delete-profile"
                  src="/trash-2-white.svg"
                  alt="delete"
                />
              </button>
            </div>
          </div>

          <div className="separation-profile">
            {" "}
            <p> </p>
          </div>

          <div className="fav-section">
            <h2 onClick={() => this.toggleSection()}>TOPICS / COMMENTS</h2>

            {this.state.showCard ? (
              <div>{allMyTopics}
              <div className="end-section"></div>
              </div>
            ) : (
              <div>{allMyComments}
              <div className="end-section"></div>
              </div>
              
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Profile);
