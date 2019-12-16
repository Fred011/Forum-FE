import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import TopicCard from "../components/TopicCard";
import topicService from "../lib/topic-service";
import { Link } from 'react-router-dom';


class Home extends Component {
  state = {
    listOfTopics: []
  };

  componentDidMount() {
    topicService
      .getAllTopics()
      .then(data => {
        this.setState({ listOfTopics: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log("in home page");

    const { listOfTopics } = this.state;
    const allTopics = listOfTopics.map((element ,i)=> {
      return (
        <Link to={`/topics/${element._id}` } id={element._id} key={i}>
        <TopicCard
          title={element.title}
          description={element.message}
          id={element._id}
        />
        </Link>
      );
    });

    return (
      <div>
        <h1>Home Page</h1>
        {allTopics}
      </div>
    );
  }
}

export default withAuth(Home);
