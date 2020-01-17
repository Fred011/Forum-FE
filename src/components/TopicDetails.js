import React, { Component } from "react";
import topicService from "../lib/topic-service";
import CommentForm from "./CommentForm";
import { withAuth } from "../lib/AuthProvider";
import CommentCardTopic from "./CommentCardTopic";
import Navbar from "./Navbar";
import userService from "../lib/user-service";

class TopicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: [],
      creator: "",
      listOfComments: [],
      favorites: [],
      userVotes: [],
      votes: 0,
      favorited: false,
      currentUserUpVote: false,
      currentUserDownVote: false
    };
  }

  componentDidMount() {
    this.getTopic();
    this.checkIfFavorite();
    this.checkIfUpVoted();
    this.checkIfDownVoted();
  }

  getTopic = () => {
    const { id } = this.props.match.params;

    topicService
      .getOneTopic(id)
      .then(topic => {
        this.setState({
          topic: topic,
          listOfComments: topic.comments,
          votes: topic.vote,
          favorites: topic.favorites,
          creator: topic.creator.username
        });
        // console.log("TOPIIIIIIIIIIIIIC", topic);
      })
      .catch(err => console.log(err));
  };

  checkIfFavorite = () => {
    const { id } = this.props.match.params;
    userService
      .getUserData()
      .then(user => {
        let favArr = user.favorites;
        if (favArr.includes(id)) {
          this.setState({ favorited: !this.favorited });
        }
      })
      .catch(err => console.log(err));
  };

  checkIfUpVoted = () => {
    const { id } = this.props.match.params;
    userService
      .getUserData()
      .then(user => {
        let upVoteArr = user.upVotes;
        console.log("USERRRRRR UPVOTESSS", user.upVotes);
        if (upVoteArr.includes(id)) {
          this.setState({ currentUserUpVote: !this.state.currentUserUpVote });
          console.log("TRUUUUUUUUUUUUUUUUUE", this.state.currentUserUpVote);
        }
      })
      .catch(err => console.log(err));
  };

  checkIfDownVoted = () => {
    const { id } = this.props.match.params;
    userService
      .getUserData()
      .then(user => {
        let downVoteArr = user.downVotes;
        console.log("USERRRRRR DOWNNNNVOTESSS", user.downVotes);
        if (downVoteArr.includes(id)) {
          this.setState({
            currentUserDownVote: !this.state.currentUserDownVote
          });
          console.log("TRUUUUUUUUUUUUUUUUUE", this.state.currentUserDownVote);
        }
      })
      .catch(err => console.log(err));
  };

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

  handleFavorites = sign => {
    const { id } = this.props.match.params;

    userService
      .addFavorites(id)
      .then(added => console.log("DATA", added))
      .catch(err => console.log(err));

    if (sign === "+") {
      this.setState({ favorited: true });
    }
  };

  handleRemoveFavorites = sign => {
    const { id } = this.props.match.params;

    userService
      .removeFavorites(id)
      .then(removed => console.log("REMOVEDDDDD", removed))
      .catch(err => console.log(err));

    if (sign === "-") {
      this.setState({ favorited: false });
    }
  };

  handleUpVote = sign => {
    const { id } = this.props.match.params;

    topicService
      .addVote(id)
      .then(() => {
        this.setState({ currentUserUpVote: this.state.currentUserUpVote });
        this.getTopic();
        this.checkIfUpVoted();
        this.checkIfDownVoted();
      })
      .catch(err => console.log(err));
  };

  handleCancelUpVote = sign => {
    const { id } = this.props.match.params;

    topicService
      .cancelUpVote(id)
      .then(() => {
        this.setState({ currentUserUpVote: !this.state.currentUserUpVote });
        this.getTopic();
        this.checkIfUpVoted();
        this.checkIfDownVoted();
      })
      .catch(err => console.log(err));
  };

  handleDownVote = sign => {
    const { id } = this.props.match.params;

    topicService
      .downVote(id)
      .then(() => {
        this.setState({ currentUserDownVote: this.state.currentUserDownVote });
        this.getTopic();
        this.checkIfDownVoted();
        this.checkIfUpVoted();
      })
      .catch(err => console.log(err));
  };

  handleCancelDownVote = sign => {
    const { id } = this.props.match.params;

    topicService
      .cancelDownVote(id)
      .then(() => {
        this.setState({ currentUserDownVote: !this.state.currentUserDownVote });
        this.getTopic();
        this.checkIfDownVoted();
        this.checkIfUpVoted();
      })
      .catch(err => console.log(err));
  };

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

    const { title, message, creator } = this.state.topic;
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
                            {/* Ternary for the arrows */}
                            {!this.state.currentUserDownVote ? (
                              this.state.currentUserUpVote ? (
                                <img
                                  onClick={() => this.handleCancelUpVote("-")}
                                  className="arrow-vote"
                                  src="/arrow-up2.svg"
                                  alt="cancel vote"
                                />
                              ) : (
                                <img
                                  onClick={() => this.handleUpVote("+")}
                                  className="arrow-vote"
                                  src="/arrow-up.svg"
                                  alt="upVote"
                                />
                              )
                            ) : (
                              <img
                                className="arrow-vote"
                                src="/arrow-up.svg"
                                onClick={() => this.handleCancelDownVote("+")}
                                alt="upVote"
                              />
                            )}
                            {this.state.votes}
                            {!this.state.currentUserUpVote ? (
                              this.state.currentUserDownVote ? (
                                <img
                                  className="arrow-vote"
                                  src="/arrow-down2.svg"
                                  onClick={() => this.handleCancelDownVote("+")}
                                  alt="downVote"
                                />
                              ) : (
                                <img
                                  className="arrow-vote"
                                  src="/arrow-down.svg"
                                  onClick={() => this.handleDownVote("-")}
                                  alt="downVote"
                                />
                              )
                            ) : (
                              <img
                                className="arrow-vote"
                                src="/arrow-down.svg"
                                onClick={() => this.handleCancelUpVote("-")}
                                alt="upVote"
                              />
                            )}
                            comments {this.state.listOfComments.length}
                          </h5>

                          {/* Ternary for the favorites */}
                          {this.state.favorited ? (
                            <img
                              className="favorite"
                              src="/heart2.svg"
                              alt="favorite"
                              onClick={e => {
                                this.handleRemoveFavorites("-");
                              }}
                            />
                          ) : (
                            <img
                              className="favorite"
                              src="/favorite.svg"
                              alt="favorite"
                              onClick={e => {
                                this.handleFavorites("+");
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
                    <div className="name-user-topic">
                      <p>posted by {this.state.creator}</p>
                    </div>
                    {/* <button className="see-profile-btn">SEE PROFILE</button> */}
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
