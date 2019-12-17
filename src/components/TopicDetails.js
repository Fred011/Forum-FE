import React, { Component } from 'react';
import topicService from '../lib/topic-service';



class TopicDetails extends Component {

    state = {
        topic: [],
        upvotes: 117,
        downvotes: 22
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

        const { title, message, creator, category, comments } = this.state.topic
        const upvotes = this.state.upvotes
        const downvotes = this.state.downvotes
        return (
            <div className='topic-details-container'>
                <div className="left-part">
                    <div className="topic-info">

                        <h1>{title}</h1>
                        <p>{message}</p>
                        <h6> upvotes {upvotes}   downvotes {downvotes}</h6>

                    </div>
                    <div className="comment-bar">
                        <form className='comment-form'> 
                            <input type="text"/>
                            <div className="submit-btn">SUBMIT</div>
                        </form>
                    </div>

                    <div className="comment-section">
                        comments card is coming
                    </div>
                </div>

                <div className="separation"></div>

                <div className="topic-user">
                    picture
                    username
                        {/* <p>{creator.username}</p> */}
                    <button className="see-profile-btn">SEE PROFILE</button>
                </div>
            </div>
        )
    }
}

export default TopicDetails
