/**
 * Created by moazhamza on 6/27/17.
 */

import React from 'react'
//const axios = require('axios');


class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentInput: null,
        }
    }
    render() {
        return (
            <div className="search-bar-container">
                <input id="twitter search" type="text" placeholder="Search Twitter for analysis..." onKeyDown={this.updateField}/>
                <div>
                    <button onKeyDown={this.search}>Search</button>
                </div>
            </div>

        )
    }
}

class Analysis extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            analyses: [],
            displayedAnalysis: null
        };
    }

    componentDidMount(){
    }
    render() {
        return (
            <div className="analysis-container">
                <SearchBar />
            </div>
        )

    }
}

export default Analysis;