import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import topicService from "../lib/topic-service";
import userService from "../lib/user-service";

class TopicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
      currentUserFav: [],
      currentUserUpVotes: [],
      currentUserDownVotes: [],
      favorited: false,
      currentUserUpVoted: false,
      currentUserDownVoted: false
    };
  }

  componentDidMount() {
    this.getTopic();
    this.getUser();
    console.log("IN MOUUUUUNT", this.props.vote);
    this.checkIfUpVoted();
    this.checkIfDownVoted();
  }

  getTopic = () => {
    const id = this.props.id;

    topicService
      .getOneTopic(id)
      .then(topic => {
        this.setState({
          votes: topic.vote,
        });
        // console.log("TOPIIIIIIIIIIIIIC", topic);
      })
      .catch(err => console.log(err));
  };

  getUser = () => {
    userService
      .getUserData()
      .then(user => {
        this.setState({
          currentUserFav: user.favorites,
          currentUserDownVotes: user.downVotes,
          currentUserUpVotes: user.upVotes
        });
        console.log("USER DATA", user);
      })
      .catch(err => console.log(err));
  };

  checkIfUpVoted = () => {
    const id = this.props.id;

    userService
      .getUserData()
      .then(user => {
        let upVotesArr = user.upVotes;
        if (upVotesArr.includes(id)) {
          this.setState({ currentUserUpVoted: !this.state.currentUserUpVoted });
        }
      })
      .catch(err => console.log(err));
  };

  checkIfDownVoted = () => {
    const id = this.props.id;
    userService
      .getUserData()
      .then(user => {
        let downVoteArr = user.downVotes;
        if (downVoteArr.includes(id)) {
          this.setState({
            currentUserDownVoted: !this.state.currentUserDownVoted
          });
        }
      })
      .catch(err => console.log(err));
  };

  handleUpVote = sign => {
    const id = this.props.id;
    topicService
      .addVote(id)
      .then(() => {
        this.setState({ currentUserUpVoted: this.state.currentUserUpVoted });
        this.getTopic();
        this.checkIfUpVoted();
        this.checkIfDownVoted();
      })
      .catch(err => console.log(err));
  };

  handleCancelUpVote = sign => {
    const id = this.props.id;

    topicService
      .cancelUpVote(id)
      .then(() => {
        this.setState({ currentUserUpVoted: !this.state.currentUserUpVoted });
        this.getTopic();
        this.checkIfUpVoted();
        this.checkIfDownVoted();
      })
      .catch(err => console.log(err));
  };

  handleDownVote = sign => {
    const id = this.props.id;
    topicService
      .downVote(id)
      .then(() => {
        this.setState({ currentUserDownVoted: this.state.currentUserDownVoted });
        this.getTopic();
        this.checkIfDownVoted();
        this.checkIfUpVoted();
      })
      .catch(err => console.log(err));
  };

  handleCancelDownVote = sign => {
    const id = this.props.id;

    topicService
      .cancelDownVote(id)
      .then(() => {
        this.setState({ currentUserDownVoted: !this.state.currentUserDownVoted });
        this.getTopic();
        this.checkIfDownVoted();
        this.checkIfUpVoted();
      })
      .catch(err => console.log(err));
  };

  refreshTopic = () => {
    const id = this.props.id;

    topicService
      .getOneTopic(id)
      .then(topic => this.setState({ vote: topic.vote }))
      .catch(err => console.log(err));
  };

  toggleUpVote = () => {
    let regularArrow = this.state.showArrowBlack;
    this.setState({ showArrowBlack: !regularArrow });
  };

  toggleDownVote = () => {
    let regularArrow = this.state.showArrowBlack;
    this.setState({ showArrowBlack: !regularArrow });
  };

  render() {
    return (
      <div className="card-container">
        <div className="topic-card">
          <div className="left-column">
            <div className="photo">
              <img
                src="/Photo Linkedin a envoyer copie.jpg"
                className="img-topic"
                alt="profile-picture"
              />
            </div>
            <h4 className="topic-card-username">
              {this.props.creator.username}{" "}
            </h4>
          </div>
          <div className="right-column">
            <Link to={`/topic/${this.props.id}`}>
              {" "}
              <h3>{this.props.title}</h3>
              <p>{this.props.description}</p>
            </Link>
            {/* <p>date: {this.props.date}</p> */}

            {/* VOTE SECTION */}
            <div className="low-section-topic-card">
              <h5>
                {/* Ternary for the arrows */}
                {!this.state.currentUserDownVoted ? (
                  this.state.currentUserUpVoted ? (
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
                {!this.state.currentUserUpVoted ? (
                  this.state.currentUserDownVoted ? (
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
                comments {this.props.comments.length}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(TopicCard);
