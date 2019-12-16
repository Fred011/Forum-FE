import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class MyTopicDetails extends Component {
    constructor(props){
        super(props);
        this.state = {title: '', description: '', tasks: []};
      }

      getSingleTopic = () => {
        const { id } = this.props.match.params;
      
        axios.get(`http://localhost:5000/mytopics/${id}`)
          .then( (response) =>{
            const theTopic = response.data;
            this.setState(theTopic);
          })
          .catch((err) => console.log(err));
      }

      componentDidMount() {
          this.getSingleTopic()
      }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default MyTopicDetails
