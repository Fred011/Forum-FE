import React, { Component } from 'react'
import commentService from '../lib/comment-service'
import topicService from '../lib/topic-service'
import { withAuth } from '../lib/AuthProvider'

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        
        let newComment = this.state;
        
        commentService.addComment(this.props.topicID, newComment)
        .then( () =>{
            console.log('this.props', this.props);
            this.props.history.push(`/topic/${this.props.topicID}`)
            // window.location = `/topic/${this.props.topicID}`
        } )
        this.setState({ message: newComment.message})
    }

    render() {
        return (
            <div className='comment-form-container'>
                
                <div className="comment-bar">

                    <form className='comment-form' onSubmit={this.handleFormSubmit}> 

                        <input type="text" 
                            name="message" 
                            value={this.state.message} 
                            onChange={ (e) => this.handleChange(e) }
                        />

                        <input className="submit-btn" type="submit" value="Submit" />

                    </form>

                </div>

            </div>
        )
    }
}

export default withAuth(CommentForm);