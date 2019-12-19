import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import TopicCard from "../components/TopicCard";
import topicService from "../lib/topic-service";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";




class Home extends Component {
  state = {
    listOfTopics: [],
    listOfComments: [],
    creator: [],
    upvote: '',
    downvote: ''
  };

  componentDidMount() {
    topicService
      .getAllTopics()
      .then(data => {
        this.setState({ listOfTopics: data, listOfComments: data.comments, creator: data.creator, upvote: data.upVote, downvote: data.downVote});
      })
      .catch(err => console.log(err));
  }

  render() {

    const { listOfTopics } = this.state;
    const allTopics = listOfTopics.map((element ,i)=> {
      
      return (
        
          <TopicCard
            title={element.title}
            creator={element.creator}
            description={element.message}
            comments={element.comments}
            upvote={element.upVote}
            date={element.created_at} // not working
            id={element._id}
          />

      );
    });

    return (
      <div className='testcards'>
        <Navbar />
        <div className='home'>
          <h1>Recent</h1>
          <div className="active"></div>
        <div className='big-topic-container'></div>
          <div className='last-topics-container'>
            {allTopics}
          </div>
        </div>
      </div>
      
    );
  }
}

export default withAuth(Home);
