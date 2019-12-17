import React, { Component } from 'react'

export default class Search extends Component {

    render() {

        let { theSearch, searching } = this.props

        return (
            <div className='search-bar'>

                    <img className='search-icon' src='/search.svg' alt='search-icon' />
                <input 
                    type="text" 
                    name="query"
                    value={searching}
                    onChange={theSearch}
                    placeholder="    Search.." 
                />

            </div>
        )
    }
}

