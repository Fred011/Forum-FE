import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import ProfileDetails from '../components/ProfileDetails';

class Profile extends Component {
    render() {
        return (
            <div className='profile'>
               <h1>Profile page</h1> 
               <ProfileDetails/>
            </div>
        )
    }
}

export default withAuth(Profile);