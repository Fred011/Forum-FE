import React, { Component } from 'react';
import topicService from "../lib/topic-service";
import { Link } from 'react-router-dom'
import TopicCard from '../components/TopicCardUser';
import TopicDetails from '../components/TopicDetails'
import { withAuth } from '../lib/AuthProvider';


class MyTopics extends Component {

    state = {
        listOfTopics: []
    }

    componentDidMount() {
        topicService
            .getMyTopics()
                .then( (data) => {
                    console.log('GET MY TOPICS', data);
                    
                    this.setState({ listOfTopics: data })
                })
                .catch( (err) => console.log(err));
    }
    render() {

        const { listOfTopics } = this.state;
        const allMyTopics = listOfTopics.map((element ,i)=> {
            return (
                <Link to={`/mytopics/${element._id}`} key={i} component={TopicDetails}>
                    <TopicCard
                        title={element.title}
                        description={element.message}
                        comments={element.comments}
                        id={element._id}
                    /> 
                </Link>
            );
        });
 
        return (
            <div>
                <div className="my-topics"></div>
                {allMyTopics}
            </div>
        )
    }
}

export default withAuth(MyTopics)