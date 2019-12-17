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
            .getUserTopic(id)
            .then( (topic) => {
                this.setState({ topic })
                console.log('myprororororpppspspsp', topic);
                })
                .catch( (err) => console.log(err));
    }

    render() {
        const { topic } = this.state
        const myTopic = topic.map((element ,i)=> {
            return (
                    <div className='topic-details-container'>
                <div className="left-part">
                    <div className="topic-info">

                        <h1>{element.title}</h1>
                        <p>{element.message}</p>
                        {/* <h6> upvotes {upvotes}   downvotes {downvotes}</h6> */}

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
            );
        });

        return (
            <div>
                {myTopic}
            </div>
        )
    }
}

export default TopicDetails
