import React, { Component } from 'react';
import axios from 'axios';
import { withAuth } from '../lib/AuthProvider';
import TopicCard from '../components/TopicCard';

class Home extends Component {
  state = {
    listOfTopics: []
  }

  componentDidMount() {
    this.getAllTopics()
  }

  getAllTopics = () => {
    axios.get(`http://localhost:5000/home`,{withCredentials: true} )
      .then( (response) => {
        const newData = response.data
        this.setState({
          listOfTopics: newData
        })
      })
      .catch( (err) => console.log(err));
  }

  render() {
    console.log('in home page');
    
    const {listOfTopics} = this.state
    const allTopics = listOfTopics.map( element => {
      return <TopicCard title={element.title} description={element.message} key={element.id} id={element._id}/>
    })
    
    return (
      <div>
        <h1>Home Page</h1>
        {allTopics}
      </div>
    );
  }
}

export default withAuth(Home);
 