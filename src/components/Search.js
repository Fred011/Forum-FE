import React, { Component } from 'react'

export default class Search extends Component {

    handleSubmit = () => {

    }

    render() {

        let { theSearch, searching } = this.props

        return (
            <div className='search-bar'>

                <img 
                    className='search-icon' 
                    src='/search.svg' 
                    alt='search-icon' 
                />

                <form className="search-input" onSubmit={this.handleSubmit}>
                    
                    <input 
                        type="text" 
                        name="query"
                        value={searching}
                        onChange={theSearch}
                        placeholder="    Search.." 
                    />

                </form>

            </div>
        )
    }
}

