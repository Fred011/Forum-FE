import React, { Component } from 'react';
import topicService from "../lib/topic-service";
import { Link } from 'react-router-dom'
import TopicCard from '../components/TopicCard';


export default class MyTopics extends Component {

    state = {
        listOfTopics: []
    }

    componentDidMount() {
        topicService
            .getMyTopics()
                .then( (data) => {
                    this.setState({ listOfTopics: data })
                })
                .catch( (err) => console.log(err));
    }
    render() {

        const { listOfTopics } = this.state;
        const allMyTopics = listOfTopics.map((element ,i)=> {
            return (
                <Link to={`/mytopics/${element.id}` } id={element._id} name={element.creator} upvotes={element.upVote} downvotes={element.downVote} key={i}>
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
                <div className="my-topics"></div>
                {allMyTopics}
            </div>
        )
    }
}
