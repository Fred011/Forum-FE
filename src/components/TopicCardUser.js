import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyTopics from "../pages/MyTopics";

class TopicCardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: this.props.votes,
      showArrowBlack: true
    };

    // handleDeleteTopic = () => {

    // }
  }
  render() {
    return (
      <div>
        <div className="card-container">
          <div className="topic-card-special">
            <div className="topic-card-title">
              <h3>{this.props.title}</h3>
            </div>
            {/* <p>date: {this.props.date}</p> */}
            <div className="my-topic-card_votes">
              <p className="votesss">
                <img className="arrow-vote" src="/arrow-up.svg" alt="upvote" />

                {this.props.votes}
                <img
                  className="arrow-vote"
                  src="/arrow-down.svg"
                  alt="downVote"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopicCardUser;
