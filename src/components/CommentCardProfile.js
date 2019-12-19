import React from 'react'

function CommentCardProfile(props) {
    return (
        <div>
            <div className="card-container">
                <div className='topic-card-profile'>
                    
                <div className="topic-preview-profile">
                    <p>{props.message}</p>

                </div>
                </div>
            </div>
        </div>
    )
}

export default CommentCardProfile
