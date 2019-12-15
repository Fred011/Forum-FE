import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'

export class TopicListProfile extends Component {
    render() {
        return (
            <div className='topicListProfile'>
                <h1>Topics List Profile</h1>
                <ul>
                    <li>topic 1</li>
                    <li>topic 2</li>
                    <li>topic 3</li>
                    <li>topic 4</li>
                </ul>
            </div>
        )
    }
}

export default withAuth(TopicListProfile)
