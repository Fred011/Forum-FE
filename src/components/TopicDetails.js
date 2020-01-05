import React, { Component } from "react";
import topicService from "../lib/topic-service";
import commentService from "../lib/comment-service";
import CommentForm from "./CommentForm";
import { withAuth } from "../lib/AuthProvider";
import CommentCardTopic from "./CommentCardTopic";
import Navbar from "./Navbar";
import userService from "../lib/user-service";

var equal = require('fast-deep-equal/react');

class TopicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: [],
      listOfComments: [],
      comment: [],
      votes: 0,
      showArrowBlack: true,
      favorited: false
    };
  }

  getTopic = () => {
    const { id } = this.props.match.params;

    topicService
      .getOneTopic(id)
      .then(topic => {
        this.setState({
          topic: topic,
          listOfComments: topic.comments,
          votes: topic.vote
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getTopic();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDeleteTopic = e => {
    const { id } = this.props.match.params;

    e.preventDefault();
    topicService.deleteOneTopic(id).then(() => {
      this.props.history.push("/");
    });
  };

  handleFavorites = () => {
    const { id } = this.props.match.params;

    userService
      .addFavorites(id)
      .then(added => console.log("DATAAAAAA", added))
      .catch(err => console.log(err));
  };

  handleUpVote = (sign) => {
    let newVote;
    const { id } = this.props.match.params;

    topicService
      .addVote(id)
      .then(voted => console.log("upVoted!!!!!!!!!", id))
      .catch(err => console.log(err));

    if(sign === '+') {
      newVote = this.state.vote +1;
      this.toggleUpVote()
    } else { 
      newVote = this.state.vote -1
      this.toggleDownVote()
    }

    this.setState({ vote: newVote });
  };

  handleDownVote = (sign) => {
    let newVote;
    const { id } = this.props.match.params;

    topicService
      .downVote(id)
      .then(voted => console.log("downVoted!!!!!!!!!", id))
      .catch(err => console.log(err));

    if(sign === '-') {
      newVote = this.state.vote -1
      this.toggleDownVote()
    }

    this.setState({ vote: newVote });
  };

  handleCancelVote = () => {

    if (!this.showArrowBlack) {
      this.setState({showArrowBlack: true})
    } 
  }

  toggleUpVote = () => {
    let regularArrow = this.state.showArrowBlack;
    this.setState({ showArrowBlack: !regularArrow });
  };

  toggleDownVote = () => {
    let regularArrow = this.state.showArrowBlack;
    this.setState({ showArrowBlack: !regularArrow });
  };

  // toggleFavorite = () => {
  //   let noFavorite = this.state.favorited;
  //   this.setState({ favorited: !noFavorite });
  // };

  componentDidUpdate(prevProps) {
    if(!equal({votes: this.props.vote}, prevProps.vote)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.getTopic();
    }
  }

  render() {
    const { listOfComments } = this.state;

    const allTheComments = listOfComments.map(element => {
      return (
        <div className="commentMsg" key={element._id}>
          <CommentCardTopic
            commentMsg={element.message}
            commentUser={element.user.username}
            commentDate={element.createdAt}
          />
        </div>
      );
    });

    const { title, message, creator, vote, comments } = this.state.topic;
    const { username } = this.props.user;

    return (
      <div className="testcards">
        <Navbar />
        <div className="test-flex">
          {creator ? (
            <div>
              {username === creator.username ? (
                <div>
                  <button
                    className="delete-btn"
                    onClick={this.handleDeleteTopic}
                  >
                    delete
                  </button>
                </div>
              ) : null}
              <div className="test-flex">
                <div className="topic-details-container">
                  <div className="left-part">
                    <div className="topic-info">
                      <h1>{title}</h1>
                      <p>{message}</p>
                      <h6>
                        {" "}
                        <div className="low-section-topic-card">
                          <h5>

                            {this.showArrowBlack ? 
                            <img
                              onClick={() => this.handleUpVote("+")}
                              className="arrow-vote"
                              src="/arrow-up.svg"
                              alt="upvote"
                            />
                            : 
                            <img
                              onClick={() => this.handleCancelVote()}
                              className="arrow-vote"
                              src="/arrow-up2.svg"
                              alt="upvote"
                            />
                            }

                            {vote}
                            <img
                              className="arrow-vote"
                              src="/arrow-down.svg"
                              onClick={() => this.handleDownVote("-")}
                              alt="downVote"
                            />
                          </h5>

                          {this.state.favorited ? (
                            <img
                              className="favorite"
                              src="/heart2.svg"
                              alt="favorite"
                              onClick={e => {
                                this.handleFavorites();
                              }}
                            />
                          ) : (
                            <img
                              className="favorite"
                              src="/favorite.svg"
                              alt="favorite"
                              onClick={e => {
                                this.toggleFavorite();
                              }}
                            />
                          )}
                        </div>
                      </h6>
                    </div>

                    <CommentForm
                      refreshTopic={this.getTopic}
                      topicID={this.state.topic._id}
                    />

                    <div className="comment-section">{allTheComments}</div>
                  </div>

                  <div className="separation"></div>

                  <div className="topic-user">
                    <div className="photo-in-topic">
                      <img
                        src="/Photo Linkedin a envoyer copie.jpg"
                        className="img-inside-topic"
                        alt="profile-picture"
                      />
                    </div>
                    <div className="name-user-topic">{creator.username}</div>
                    <button className="see-profile-btn">SEE PROFILE</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  }
}

export default withAuth(TopicDetails);
