import React, { Component } from "react";
import topicService from "../lib/topic-service";
import CommentForm from "./CommentForm";
import CommentCardTopic from "./CommentCardTopic";
import Navbar from "./Navbar";



class UserTopicDetails extends Component {
  state = {
    listOfTopics: [],
    listOfComments: [],
    creator: "",
    upvote: "",
    downvote: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    topicService
      .getUserTopic(id)
      .then(data => {
        this.setState({
          listOfTopics: data,
          listOfComments: data.comments,
          creator: data.creator,
          upvote: data.upVote,
          downvote: data.downVote
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
          upvotes: topic.upVotes,
          downvotes: topic.downVotes
        });
      })
      .catch(err => console.log(err));
  };

  render() {

    const { listOfTopics } = this.state;
    const { creator } = this.state;

    const { listOfComments } = this.state;
    const allTheComments = listOfComments.map(element => {
      return (
        <div className='commentMsg' key={element._id}>
            <CommentCardTopic 
                commentMsg={element.message} 
                commentUser={element.creator}
                commentDate={element.createdAt}
            />
        </div>
      );
    });

      return (
        <div className='testcards'>
          <Navbar />
        
        <div className='test-flex'>
        <div className='test-flex'>
          {listOfTopics ? (
            <div className="topic-details-container">
              <div className="left-part">
                <div className="topic-info">
                  <h1>{listOfTopics.title}</h1>
                  <p>{listOfTopics.message}</p>
                </div>
               
                <CommentForm
                  refreshTopic={this.getTopic}
                  topicID={listOfTopics._id}
                />

                <div className="comment-section">{allTheComments}</div>
                </div>

              <div className="separation"></div>

              <div className="topic-user">
                picture username
                <p>{creator.username}</p>
                <button className="see-profile-btn">delete</button>
              </div>
            </div>
          ) : (
            <h1>loading..</h1>
          )}
        </div>
        </div>
        </div>

      );
  }
}

export default UserTopicDetails;
