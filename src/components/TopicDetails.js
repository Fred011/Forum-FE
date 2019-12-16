import React, { Component } from 'react';
import topicService from '../lib/topic-service';



class TopicDetails extends Component {

    state = {
        topic: [],
        // title: '',
        // message: '',
        // creator: '',
        // upvote: 0,
        // downvote: 0
    }

    componentDidMount() {
        const { id } = this.props.match.params
        topicService
        .getOneTopic(id)
        .then( (topic) => {
            this.setState({ topic: topic})
            console.log('myprororororpppspspsp', this.state.topic);
            })
            .catch( (err) => console.log(err));
    }

    render() {

        const { title, message, creator, category, comments, upvotes, downvotes } = this.state.topic
        return (
            <div>
                <h1>hello from topic details</h1>
                <div className="topic-details">
                    <h2>{title}</h2>
                    <p>{message}</p>
                    <p>{creator}</p>
                </div>
            </div>
        )
    }
}

export default TopicDetails
