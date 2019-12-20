import React, { Component } from "react";
import topicService from "../lib/topic-service";
import commentService from "../lib/comment-service";
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
      listOfComments: [],
      comment: [],
      upvotes: 0,
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
          listOfComments: topic.comments
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

  handleUpVote = sign => {
    let newVote;

    if (sign === "+") {
      newVote = this.state.upvotes + 1;
      this.toggleUpVote();
    } else {
      newVote = this.state.upvotes - 1;
      this.toggleDownVote();
    }
    this.setState({ upvotes: newVote });
  };

  toggleUpVote = () => {
    let regularArrow = this.state.showArrowBlack;
    this.setState({ showArrowBlack: !regularArrow });
  };

  toggleDownVote = () => {
    let regularArrow = this.state.showArrowBlack;
    this.setState({ showArrowBlack: !regularArrow });
  };

  toggleFavorite = () => {
    let noFavorite = this.state.favorited;
    this.setState({ favorited: !noFavorite });
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

    const { title, message, creator, category, comments } = this.state.topic;
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
                            <img
                              onClick={() => this.handleUpVote("+")}
                              className="arrow-vote"
                              src="/arrow-up.svg"
                              alt="upvote"
                            />

                            {this.state.upvotes}
                            <img
                              className="arrow-vote"
                              src="/arrow-down.svg"
                              onClick={() => this.handleUpVote("-")}
                              alt="upvote"
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
