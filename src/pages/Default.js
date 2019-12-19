import React from 'react'

export default function Default(props) {
    console.log('this.props', props);
    
    return (
        <div className='default'>

            <img src="/JT404.gif" alt="404 page not found"/>
            <h1>Seems you got lost !!</h1>
               <p> http://topit.com{props.location.pathname} is not a good URL</p>
        </div>
    )
}
