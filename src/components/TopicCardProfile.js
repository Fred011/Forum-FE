import React, { Component } from 'react'

export class TopicCardProfile extends Component {


    render() {
        return (
            <div>
            <div className="card-container">
                <div className='topic-card-profile'>
                    <div className="topic-preview-profile">
                        <h3>{this.props.title} 
                        </h3>
                        <p>{this.props.message}</p>

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

                            {this.props.votes}
                            <img
                              className="arrow-vote"
                              src="/arrow-down.svg"
                              onClick={() => this.handleDownVote("-")}
                              alt="downVote"
                            />

                            comments {this.props.comments.length}

                          </h5>
                          </div>
                          </h6>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default TopicCardProfile
