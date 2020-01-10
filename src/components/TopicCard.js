import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import topicService from "../lib/topic-service";

class TopicCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vote: this.props.vote
    }
  }

  componentDidMount() {
    console.log('IN MOUUUUNNNT ', this.props.vote);
    this.setState({vote: this.props.vote})
  }

  // componentDidUpdate () {
  //   this.refreshTopic()
  // }

  handleUpVote = (sign) => {
    let newVote;

    if(sign === '+') {
      // newVote = this.props.vote +1;
      // console.log('VOOOOOOOTE', this.state.vote);
      // console.log('NEWVOTEEEEE¡¡¡', newVote);
      
      // this.setState({ vote: newVote})
      
      const id = this.props.id;
      
      topicService
      .addVote(id)
      .then(voted => console.log("upVoted!!!!!!!!!", voted))
      .catch(err => console.log(err));
      
      topicService
      .getOneTopic(id)
      .then( (topic) => this.setState({ vote: topic.vote}))
      .catch( (err) => console.log(err));
    }
  };

  handleDownVote = (sign) => {
    let newVote;

    if(sign === '-') {
      // newVote = this.props.vote +1;
      // console.log('VOOOOOOOTE', this.state.vote);
      // console.log('NEWVOTEEEEE¡¡¡', newVote);
      
      // this.setState({ vote: newVote})
      
      const id = this.props.id;
      
      topicService
      .downVote(id)
      .then(voted => console.log("downVoted!!!!!!!!!", voted))
      .catch(err => console.log(err));
      
      topicService
      .getOneTopic(id)
      .then( (topic) => this.setState({ vote: topic.vote}))
      .catch( (err) => console.log(err));
    }
  };

  refreshTopic = () => {

    const id = this.props.id;

    topicService.getOneTopic(id).then( (topic) =>
    this.setState({vote: topic.vote}))
    .catch( (err) => console.log(err));
  }

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

            {/* VOTE SECTION */}
            <div className="low-section-topic-card">
                <h5>
                <img
                    onClick={() => this.handleUpVote('+')}
                    className="arrow-vote"
                    src="/arrow-up.svg"
                    alt="upvote"
                />

                {this.state.vote}
                <img className="arrow-vote" 
                    src="/arrow-down.svg" 
                    onClick={() => this.handleDownVote('-')}
                    alt="downVote" />
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
