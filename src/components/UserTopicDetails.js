import React, { Component } from "react";
import topicService from "../lib/topic-service";
import CommentForm from "./CommentForm";
import CommentCardTopic from "./CommentCardTopic";
import Navbar from "./Navbar";

class UserTopicDetails extends Component {
  state = {
    topic: [],
    listOfComments: [],
    creator: "",
    votes: 0
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    topicService
      .getUserTopic(id)
      .then(data => {
        this.setState({
          topic: data,
          listOfComments: data.comments,
          creator: data.creator,
          votes: data.vote
        });
      })
      .catch(err => console.log(err));
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
                        <img
                          onClick={() => this.handleUpVote("+")}
                          className="arrow-vote"
                          src="/arrow-up.svg"
                          alt="upvote"
                        />
                        {this.state.votes}
                        <img
                          className="arrow-vote"
                          src="/arrow-down.svg"
                          onClick={() => this.handleDownVote("-")}
                          alt="downVote"
                        />
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
                <button className="see-profile-btn">SEE PROFILE</button>
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
