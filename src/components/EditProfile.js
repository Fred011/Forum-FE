import React, { Component } from 'react';
import axios from 'axios';
import { withAuth } from '../lib/AuthProvider';

export class EditProfile extends Component {

    state = {
        username: '',
        description: ''
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    // deleteProfile = () => {
    //     axios.delete(`http://localhost:5000/profile/${id}/delete`)
    // 	.then( () => this.props.history.push('/projects') )
    // 	.catch( (err) => console.log(err));
    // }

    // handleFormSubmit = (event) => {
    //     event.preventDefault();
    //     const { username, description } = this.state;
    //     const { _id } = this.props.theProfile;
      
    //     axios.put(
    //       `http://localhost:5000/profile/${_id}`,
    //       { username, description }
    //     )
    //     .then( () => {
    //       this.props.getTheProfile();						//  <---  hmmm
    //       this.props.history.push('/profile');    
    //       // after submitting the form, redirect to '/projects'
    //     })
    //      .catch( (err) => console.log(err) )
    //   }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username: </label>
                    <input type="text" 
                        name="username" 
                        value={this.state.username} 
                        onChange={ (e) => this.handleChange(e) }
                        />
                    
                    <label>Description:</label>
                    <textarea 
                        name="description" 
                        value={this.state.description} 
                        onChange={ (e) => this.handleChange(e) }
                         />
                    
                    <input type="submit" value="Submit" />

                    <button onClick={() => this.deleteProfile()}>
                        Delete Profile
                    </button>
                </form>
            </div>
        )
    }
}

export default EditProfile
