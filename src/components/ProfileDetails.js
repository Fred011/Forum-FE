import React, { Component } from 'react'
import { withAuth } from '../lib/AuthProvider'
import { TopicListProfile } from './TopicListProfile'
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'

class ProfileDetails extends Component {

    renderEditProfile = () => {
        return <EditProfile />
    }
    render() {
        return (
            <div>
                <div className='user-section'>
                    <h1>user picture</h1>
                    <h1>username: </h1>
                    <p>description</p>
                </div>
                <div className='fav-section'>
                    <h1><Link to='/profile/mytopics'>My Topics</Link> / <Link to='/profile/mycomments'>My comments</Link></h1>
                    <TopicListProfile />
                </div>
                <Link to='/profile-edit'>
                    <button onClick={this.renderEditProfile}>Edit Profile</button>
                </Link>
            </div>
        )
    }
}

export default withAuth(ProfileDetails);