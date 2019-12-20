import React from 'react';
import { Link } from 'react-router-dom';
import TopicDetails from './TopicDetails'

function TopicCardProfile(props) {
    
    return (
            <div className="card-container">
                <div className='topic-card-profile'>

                    <div className="topic-preview-profile">
                        <h3>{props.title}</h3>
                        <p>{props.message}</p>
                    </div>
                </div>
            </div>
    )
}

export default TopicCardProfile
