import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class TopicForm extends Component {
    // constructor(props) {
    //     super (props)
    //     this.state = props
    // }

    state = {
        title: '',
        description: ''
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title: </label>
                    <input type="text" 
                        name="title" 
                        value={this.state.title} 
                        onChange={ (e) => this.handleChange(e) }
                    />

                    <label>Category:</label>
                    <select name="category">
                        <option value="">gaming</option>
                        <option value="">Lifestyle</option>
                        <option value="">Sport</option>
                        <option value="">Musique</option>
                        <option value="">Coding</option>
                    </select>
                    
                    <label>Description:</label>
                    <textarea 
                        name="description" 
                        value={this.state.description} 
                        onChange={ (e) => this.handleChange(e) }
                    />
                    
                    <input type="submit" value="Submit" />
                    
                    <Link to={'/home'}>
                        <button>>
                            Cancel
                        </button>
                    </Link>
                </form>
            </div>
        )
    }
}

export default TopicForm
