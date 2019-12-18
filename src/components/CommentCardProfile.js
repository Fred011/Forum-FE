import React from 'react'

function CommentCardProfile(props) {
    return (
        <div>
            <div className="card-container">
                <div className='topic-card-profile'>
                    
                    <p>description: {props.message}</p>

                </div>
            </div>
        </div>
    )
}

export default CommentCardProfile
