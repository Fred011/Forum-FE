import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import topicService from "../lib/topic-service";

class TopicCard extends Component {

    state = {
      vote: 0,
      showArrowBlack: true
    };

  componentDidMount() {
    this.setState({ vote: this.props.vote})
  }

  // componentDidUpdate(prevprops,prevstate) {
  //   if (prevprops.upvote !== )
  // }

  handleUpVote = (sign) => {
    let newVote;

    if(sign === '+') {
      newVote = this.state.vote +1;
      this.toggleUpVote()
    } else { 
      newVote = this.state.vote -1
      this.toggleDownVote()
    }

    const { id } = this.props.match.params;

    topicService
      .addFavorites(id)
      .then(voted => console.log("upvoted!!!!!!!!!", voted))
      .catch(err => console.log(err));

    this.setState({ vote: newVote });
  };


  // handleDownVote = (sign) => {
  //   let newVote;

  //   if(sign === '-') {
  //     newVote = this.state.upvote -1
  //     this.toggleDownVote()
  //   }
  //   this.setState({ upvote: newVote });
  // };

  toggleUpVote = () => {
    let regularArrow = this.state.showArrowBlack
    this.setState({ showArrowBlack: !regularArrow })
  }
  toggleDownVote = () => {
    let regularArrow = this.state.showArrowBlack
    this.setState({ showArrowBlack: !regularArrow })
  }

 

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
            <h4 className='topic-card-username'>{this.props.creator.username} </h4>
          </div>
          <div className="right-column">
            <Link to={`/topic/${this.props.id}`}>
              {" "}
              <h3>{this.props.title}</h3>
              <p>{this.props.description}</p>
            </Link>
            {/* <p>date: {this.props.date}</p> */}


              {/* <div className="low-section-topic-card">
                <h5>
            {this.state.showArrowBlack ? (
              <div>
                <img
                    onClick={() => this.handleUpVote('+')}
                    className="arrow-vote"
                    src="/arrow-up.svg"
                    alt="upvote"
                />

              {this.state.upvote}
                
                <img className="arrow-vote" 
                    src="/arrow-down.svg" 
                    onClick={() => this.handleUpVote('-')}
                    alt="upvote" />
                    </div>
            ) : ( 
              <div>
              <img
                    onClick={() => this.handleUpVote('+')}
                    className="arrow-vote"
                    src="/arrow-up2.svg"
                    alt="upvote"
                />

                {this.state.upvote}
                
                <img className="arrow-vote" 
                    src="/arrow-down.svg" 
                    onClick={() => this.handleUpVote('-')}
                    alt="upvote" />
                    </div>
            )
          } */}











                {/* {this.state.upvote}
                {
                  this.state.showArrowBlack ? (
                    <img className="arrow-vote" 
                    src="/arrow-down.svg" 
                    onClick={() => this.handleDownVote('-')}
                    alt="upvote" />
                  ) : (
                    <img className="arrow-vote" 
                    src="/arrow-down2.svg" 
                    alt="upvote" />
                  )
                }
                comments {this.props.comments.length}
                </h5> */}









              {/* <div className="low-section-topic-card">
                <h5>
            {this.state.showArrowBlack ? (
                <img
                    onClick={() => this.handleUpVote('+')}
                    className="arrow-vote"
                    src="/arrow-up.svg"
                    alt="upvote"
                />
            ) : (
              <img
                    onClick={() => this.handleUpVote('+')}
                    className="arrow-vote"
                    src="/arrow-up2.svg"
                    alt="upvote"
                />
            )
          }
                {this.state.upvote}
                {
                  this.state.showArrowBlack ? (
                    <img className="arrow-vote" 
                    src="/arrow-down.svg" 
                    onClick={() => this.handleDownVote('-')}
                    alt="upvote" />
                  ) : (
                    <img className="arrow-vote" 
                    src="/arrow-down2.svg" 
                    alt="upvote" />
                  )
                }
                comments {this.props.comments.length}
                </h5>
 */}










            <div className="low-section-topic-card">
                <h5>
                <img
                    onClick={() => this.handleUpVote('+')}
                    className="arrow-vote"
                    src="/arrow-up.svg"
                    alt="upvote"
                />

                {this.props.vote}
                <img className="arrow-vote" 
                    src="/arrow-down.svg" 
                    onClick={() => this.handleUpVote('-')}
                    alt="upvote" />
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
