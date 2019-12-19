import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopicDetails from "./TopicDetails";
import { withAuth } from "../lib/AuthProvider";

class TopicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvote: ""
    };
  }

  render() {
    console.log("inside topic card", this.props);

    const handleVote = () => {
      console.log("handlevote", this.props.upvote);
      let newVote = this.props.upvote + 1;
    //   console.log("NEWVOTEEEEEE", newVote);
      console.log("NEWVOTEEEEEE", this.props.creator.username);

      this.setState({ upvote: newVote });
    };

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
            <h4 className='topic-card-username'>{this.props.user.username} </h4>
          </div>
          <div className="right-column">
            <Link to={`/topic/${this.props.id}`}>
              {" "}
              <h3>{this.props.title}</h3>
              <p>{this.props.description}</p>
            </Link>
            {/* <p>date: {this.props.date}</p> */}
            <div className="low-section-topic-card">
                <h5>
                <img
                    onClick={() => handleVote()}
                    className="arrow-vote"
                    src="/arrow-up.svg"
                    alt="upvote"
                />
                {this.props.upvote}
                <img className="arrow-vote" src="/arrow-down.svg" alt="upvote" />
                comments {this.props.comments.length}
                </h5>

                <h5 className='commentNum'>
                    
                </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(TopicCard);
