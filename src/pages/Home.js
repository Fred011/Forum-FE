import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import TopicCard from "../components/TopicCard";
import topicService from "../lib/topic-service";
import { Link } from 'react-router-dom';




class Home extends Component {
  state = {
    listOfTopics: [],
    creator: []
  };

  componentDidMount() {
    topicService
      .getAllTopics()
      .then(data => {
        this.setState({ listOfTopics: data, creator: data.creator});
      })
      .catch(err => console.log(err));
  }

  render() {
//            creator={element.creator}
    const { listOfTopics } = this.state;
    const allTopics = listOfTopics.map((element ,i)=> {
      return (
        <Link to={`/topic/${element._id}` } id={element._id}  key={i} creator={element.creator}>
          <TopicCard
            title={element.title}
            creator={element.creator}
            description={element.message}
            date={element.createdAt} // not working
            id={element._id}
          />
        </Link>
      );
    });

    return (
      <div className='home'>
        <h1>Recent</h1>
        <div className="active"></div>
        <div>
          {allTopics}
        </div>
      </div>
    );
  }
}

export default withAuth(Home);
