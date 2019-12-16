import React from 'react';
import { Link } from 'react-router-dom';
import TopicDetails from './TopicDetails'

function TopicCard(props) {
    console.log('inside topic card');
    
    return (
            <div className="card-container">
                <div className='topic-card'>
                    <div className="left-column">
                        <div className="photo">
                            <img src="/Optimized-Optimized-photo profil (1).png" style={{height: 'inherit', width: 'inherit'}} className='img-topic' alt="profile-picture"/>
                        </div>
                        <h4>name: {props.name}</h4>
                    </div>
                    <div className="right-column">
                        <h3>title: {props.title}</h3>
                        <p>description: {props.description}</p>
                        <h5>upvotes: {props.upvotes} downvotes: {props.downvotes}</h5>
                    </div>
                </div>
            </div>
    )
}

export default TopicCard
