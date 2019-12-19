import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import topicService from '../lib/topic-service';
import { withRouter } from 'react-router-dom'


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
        

        topicService
        .addTopic(newForm)
        .then(()=> {
            console.log('this.props', this.props);
            window.location = '/'
          })
          
    }

    componentDidMount() {
        console.log('IN COMPONENT DID MOUNT');
        
    }


    render() {
        return (
            <div className='add-topic-container'>

                <div className="div-add-topic">

                    <form className="add-topic-form" onSubmit={this.handleFormSubmit}>

                        <input type="text" 
                            name="title" 
                            value={this.state.title} 
                            placeholder='Title'
                            onChange={ (e) => this.handleChange(e) }
                        />

                        <select name="category" 
                                required
                                onChange={ (e) => this.handleChange(e) }
                            >
                            <option selected disabled hidden value="Default">choose one</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Sport">Sport</option>
                            <option value="Food">Food</option>
                            <option value="Coding">Coding</option>
                            <option value="UX-UI">Coding</option>
                            <option value="Fun">Fun</option>
                            <option value="Random">Random</option>
                        </select>
                        
                        <textarea 
                            name="message" 
                            value={this.state.message} 
                            placeholder='Your topic here'
                            onChange={ (e) => this.handleChange(e) }
                        />
                        
                        <input className='submit-btn' type="submit" value="Submit" />
                        
                        <Link to={'/'}>
                            <button className='delete-btn'>
                                Cancel
                            </button>
                        </Link>

                    </form>

                </div>

            </div>
        )
    }
}

export default withRouter(TopicForm)
