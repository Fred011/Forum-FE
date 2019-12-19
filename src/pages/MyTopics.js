import React, { Component } from 'react';
import topicService from "../lib/topic-service";
import { Link } from 'react-router-dom'
import TopicCardUser from '../components/TopicCardUser';
import UserTopicDetails from '../components/UserTopicDetails'
import { withAuth } from '../lib/AuthProvider';
import userService from "../lib/user-service";
import Navbar from '../components/Navbar';



class MyTopics extends Component {

    state = {
        listOfTopics: [],
        username: "",
        description: "",
        commentsList: []
    }
    
    componentDidMount() {
    //     topicService
    //     .getMyTopics()
    //     .then( (userTopics) => {
    //         console.log('GET MY TOPICS', userTopics);
            
    //         this.setState({ listOfTopics: userTopics })
    //     })
    //     .catch( (err) => console.log(err));
    
    this.getUserData()
    }

    getUserData = () => {

        userService
        .getUserData()
        .then( (data) => {
          const { username, description, topics, comments} = data;
          
            this.setState({
              username: username,
              description: description,
              listOfTopics: topics,
              commentsList: comments
            })
        })
        .catch( (err) => console.log(err));
      }

    render() {
        
        
        const { listOfTopics } = this.state;
        console.log('LIST OF TOPICS', listOfTopics);
        const allMyTopics = listOfTopics.map( element => {
            return (
                <Link to={`/mytopics/${element._id}`} key={element._id}>
                    <TopicCardUser
                        title={element.title}
                        description={element.message}
                        comments={element.comments}
                        id={element._id}
                    /> 
                </Link>
            );
        });
 
        return (
                <div className='testcards'>
                    <Navbar />
                        <div className='big-topic-container'>
                    <div>
                        {listOfTopics
                        ?
                            <div className="my-topics">
                                {allMyTopics}
                            </div>
                        :
                        <h1>Loading...</h1>
                        }
                    </div>
                        </div>
                </div>
        )
    }
}

export default withAuth(MyTopics)