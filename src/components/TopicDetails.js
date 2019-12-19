import React, { Component } from "react";
import topicService from "../lib/topic-service";
import commentService from "../lib/comment-service";
import CommentForm from "./CommentForm";
import { withAuth } from "../lib/AuthProvider";
import Auth from "../lib/auth-service";
import CommentCardTopic from "./CommentCardTopic";

class TopicDetails extends Component {
  state = {
    topic: [],
    listOfComments: [],
    comment: [],
    upvotes: 0,
    downvotes: 0
  };

  getTopic = () => {
    const { id } = this.props.match.params;

    console.log("this.props44444444", this.props);

    topicService
      .getOneTopic(id)
      .then(topic => {
        this.setState({
          topic: topic,
          listOfComments: topic.comments,
          upvotes: topic.upVotes,
          downvotes: topic.downVotes
        });
        console.log("TOPIC", this.state.topic);
        console.log("ListOfComments", this.state.listOfComments);
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

    console.log("id", id);

    e.preventDefault();
    topicService.deleteOneTopic(id).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    const { listOfComments } = this.state;
    console.log("STATE", this.state);

    const allTheComments = listOfComments.map(element => {
      return (
        <div className='commentMsg' key={element._id}>
            <CommentCardTopic 
                commentMsg={element.message} 
                commentUser={element.user.username}
                commentDate={element.createdAt}
            />
          {/* <h3>comment: {element.message}</h3> */}
        </div>
      );
    });

    const { title, message, creator, category, comments } = this.state.topic;
    const { username } = this.props.user;

    return (
      <div>
        {creator ? (
          <div>
            {username === creator.username ? (
              <div>
                <button className="delete-btn" onClick={this.handleDeleteTopic}>
                  delete
                </button>
              </div>
            ) : null}
            <div className="topic-details-container">
              <div className="left-part">
                <div className="topic-info">
                  <h1>{title}</h1>
                  <p>{message}</p>
                  <h6>
                    {" "}
                    upvotes {this.upvotes} downvotes {this.state.downvotes}
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
                picture username
                <button className="see-profile-btn">SEE PROFILE</button>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default withAuth(TopicDetails);
