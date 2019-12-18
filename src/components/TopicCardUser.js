import React from 'react';
import { Link } from 'react-router-dom';
import UserTopicDetails from './UserTopicDetails';
import MyTopics from '../pages/MyTopics';


function TopicCardUser(props) {
    console.log('inside topic card', props);
    
    return (
            <div className="card-container">
                <div className='topic-card'>
                    <div className="left-column">
                        <div className="photo">
                            <img src="/Photo Linkedin a envoyer copie.jpg" className='img-topic' alt="profile-picture"/>
                        </div>
                        <h4>name: {props.creator}</h4>
                    </div>
                    <div className="right-column">
                        <h3>{props.title}</h3>
                        <p>{props.description}</p>
                        {/* <p>date: {props.date}</p> */}
                        <h5>upvotes: {props.upvotes} downvotes: {props.downvotes}</h5>
                    </div>
                </div>
            </div>
    )
}

export default TopicCardUser
