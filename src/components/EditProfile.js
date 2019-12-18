import React, { Component } from 'react';
import axios from 'axios';
import { withAuth } from '../lib/AuthProvider';
import userService from '../lib/user-service';


export class EditProfile extends Component {

    state = {
        username: '',
        description: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    // deleteProfile = () => {
    //     axios.delete(`http://localhost:5000/profile/${id}/delete`)
    // 	.then( () => this.props.history.push('/projects') )
    // 	.catch( (err) => console.log(err));
    // }

    componentDidMount() {
        userService.getUserData()
            .then( (data) => {
                this.setState({
                    username: data.username,
                    description: data.description
                })
            })
            .catch( (err) => console.log(err));
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        let updatedUser = this.state
        console.log('stateeeeeeee', updatedUser);
        

        userService.updateUserData(updatedUser)
            .then(() => {
                this.props.history.push('/profile');
            })
    
   }
    
    

    render() {
        return (
            <div className='edit-form-container'>

                <div className="form-profile">

                    <form className="edit-profile-form" onSubmit={this.handleFormSubmit}>
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

            </div>
        )
    }
}

export default EditProfile
