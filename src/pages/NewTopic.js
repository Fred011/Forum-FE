import React, { Component } from 'react'
import TopicForm from '../components/TopicForm'
import Navbar from '../components/Navbar'

export class NewTopic extends Component {
    render() {
        return (
            <div className='testcards'>
                <Navbar />
            <div className='all-login'>
            <div className='log'>
                <TopicForm />
            </div>
            </div>
            </div>
        )
    }
}

export default NewTopic
