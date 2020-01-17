import React, { Component } from "react";
import topicService from "../lib/topic-service";
import userService from "../lib/user-service";
import CommentForm from "./CommentForm";
import CommentCardTopic from "./CommentCardTopic";
import Navbar from "./Navbar";

class UserTopicDetails extends Component {
  state = {
    topic: [],
    listOfComments: [],
    creator: "",
    votes: 0,
    favorites: [],
    userVotes: [],
    favorited: false,
    currentUserUpVote: false,
    currentUserDownVote: false
  };

  componentDidMount() {
    this.getTopic();
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
        // else {
        //   console.log("FAAAAAAALLSSSSSEEEE", this.state.currentUserUpVote);
        // }
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
        } else {
          console.log("FAAAAAAALLSSSSSEEEE", this.state.currentUserDownVote);
        }
      })
      .catch(err => console.log(err));
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

  handleDeleteTopic = () => {
    const { id } = this.props.match.params;

    topicService.deleteOneTopic(id).then(() => {
      this.props.history.push("/mytopics");
    });
  };

  render() {
    const { topic } = this.state;
    const { creator } = this.state;

    const { listOfComments } = this.state;
    const allTheComments = listOfComments.map(element => {
      return (
        <div className="commentMsg" key={element._id}>
          <CommentCardTopic
            commentMsg={element.message}
            commentUser={element.creator}
            commentDate={element.createdAt}
          />
        </div>
      );
    });

    return (
      <div className="testcards">
        <Navbar />

        <div className="test-flex">
          {topic ? (
            <div className="topic-details-container">
              <div className="left-part">
                <div className="topic-info">
                  <h1>{topic.title}</h1>
                  <p>{topic.message}</p>
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
                      <div>
                        <img
                          className="delete"
                          src="/trash-2.svg"
                          onClick={() => this.handleDeleteTopic()}
                          alt="delete"
                        />
                      </div>
                    </div>
                  </h6>
                </div>

                <CommentForm refreshTopic={this.getTopic} topicID={topic._id} />

                <div className="comment-section">{allTheComments}</div>
              </div>

              <div className="separation"></div>

              <div className="topic-user">
                <div className="photo-in-topic">
                  <img
                    src="/Photo Linkedin a envoyer copie.jpg"
                    className="img-inside-topic"
                    alt=""
                  />
                </div>
                <div className="name-user-topic">{creator.username}</div>
              </div>
            </div>
          ) : (
            <h1>loading..</h1>
          )}
        </div>
      </div>
    );
  }
}

export default UserTopicDetails;
