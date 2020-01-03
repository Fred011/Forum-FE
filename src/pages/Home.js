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
    vote: 99
  };

  componentDidMount() {
    topicService
      .getAllTopics()
      .then(data => {
        this.setState({ listOfTopics: data, listOfComments: data.comments, creator: data.creator, vote: data.vote });
        console.log('vote', data);
        
      })
      .catch(err => console.log(err));
  }

  render() {

    const { listOfTopics } = this.state;
    const allTopics = listOfTopics.map((element ,i)=> {
      
      console.log('ELEMEEEEENT VOOOOTE', element.vote);
      return (
        
          <TopicCard
            title={element.title}
            creator={element.creator}
            description={element.message}
            comments={element.comments}
            vote={element.vote}
            date={element.created_at} // not working
            id={element._id}
            key={i}
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
