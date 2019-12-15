import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'
import { TopicListProfile } from './TopicListProfile'
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'

class ProfileDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }

    renderEditProfile = () => {
        return <EditProfile />
    }
    render() {
        return (
            <div>
                <div className='user-section'>
                    <h1>user picture</h1>
                    <h1>username</h1>
                    <p>description</p>
                </div>
                <div className='fav-section'>
                    <h1>My Topics</h1> <h1> / </h1> <h1>My comments</h1>
                    <TopicListProfile />
                </div>
                <Link to='/profile/edit'>
                    <button onClick={this.renderEditProfile}>Edit Profile</button>
                </Link>
            </div>
        )
    }
}

export default withAuth(ProfileDetails);