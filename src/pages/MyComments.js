import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import commentService from '../lib/comment-service';
import CommentCard from '../components/CommentCard';


export default class MyComments extends Component {

    state = {
        listOfComments: []
    }

    componentDidMount() {
        commentService
            .getMyComments()
                .then( (data) => {
                    this.setState({ listOfComments: data})
                })
                .catch( (err) => console.log(err));
    }
    render() {

        const { listOfComments } = this.state;
        const allMyComments = listOfComments.map((element ,i)=> {
            return (
                    <CommentCard
                        message={element.message}
                        id={element._id}
                        key={i}
                    />
            );
        });
        console.log('commentsssss', listOfComments);
        
        return (
            <div>
            <div className="my-topics"></div>
                {allMyComments}
            </div>
        )
    }
}
