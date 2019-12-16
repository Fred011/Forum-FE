import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopicDetails from './TopicDetails'

function TopicCard(props) {
    return (
        <Link to={`topic/${props.id}` } Component={TopicDetails}>
            <div>
                <h3>title: {props.title}</h3>
                <p>description: {props.description}</p>
            </div>
        </Link>
    )
}

export default TopicCard
