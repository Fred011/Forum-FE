import React from 'react'

export default function Default(props) {
    console.log('this.props', props);
    
    return (
        <div>
            <h1>fuck you the url {props.location.pathname} doesnt exist fuck off u whore</h1>
        </div>
    )
}
