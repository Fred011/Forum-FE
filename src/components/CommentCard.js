import React from 'react';
import { Link } from 'react-router-dom';
import MyComment from '../pages/MyComments'

function CommentCard(props) {
        
    return (
            <div className="card-container">
                <div className="my-comments">
                    <p>{props.message}</p>

                </div>
            </div>
    )
}

export default CommentCard
 