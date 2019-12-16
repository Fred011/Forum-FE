import React from 'react';
import { Link } from 'react-router-dom';
import TopicDetails from './TopicDetails'

function TopicCard(props) {
    console.log('inside topic card');
    
    return (
        
            <div>
                <h3>title: {props.title}</h3>
                <p>description: {props.description}</p>
            </div>
    )
}

export default TopicCard
