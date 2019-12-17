import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import topicService from '../lib/topic-service';


export class TopicForm extends Component {

    state = {
        title: '',
        message: '',
        category: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('this.stategfgfg', this.state.category);
        
        let newForm = this.state
        console.log('stateeeeeeee', newForm);
        

        topicService.addTopic(newForm)
        // this.props.history.push('/mytopics');
    }

    componentDidMount() {
        console.log('IN COMPONENT DID MOUNT');
        
    }


    render() {
        return (
            <div className='add-topic-container'>

                <div className="div-add-topic">

                    <form className="add-topic-form" onSubmit={this.handleFormSubmit}>

                        <label>Title: </label>
                        <input type="text" 
                            name="title" 
                            value={this.state.title} 
                            onChange={ (e) => this.handleChange(e) }
                        />

                        <label>Category:</label>
                        <select name="category" 
                                required
                                onChange={ (e) => this.handleChange(e) }
                            >
                            <option selected disabled hidden value="Default">choose one</option>
                            <option value="Gaming">gaming</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Sport">Sport</option>
                            <option value="Musique">Musique</option>
                            <option value="Coding">Coding</option>
                        </select>
                        
                        <label>Description:</label>
                        <textarea 
                            name="message" 
                            value={this.state.message} 
                            onChange={ (e) => this.handleChange(e) }
                        />
                        
                        <input type="submit" value="Submit" />
                        
                        <Link to={'/home'}>
                            <button>
                                Cancel
                            </button>
                        </Link>

                    </form>

                </div>

            </div>
        )
    }
}

export default TopicForm
