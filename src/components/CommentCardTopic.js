import React from 'react'

function CommentCardTopic(props) {
    return (
        <div className='comment-topic-container'>
            <div>   
                <p>{props.commentMsg}</p>
                <div className='separation-2'></div>
            </div>
            {/* <div className='user-comment'>
                <p>{props.commentUser}</p>
                <p>{props.commentDate}</p>
            </div> */}
        </div>
    )
}

export default CommentCardTopic
