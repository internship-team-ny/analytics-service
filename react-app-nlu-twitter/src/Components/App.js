import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import Analysis from './Analysis'
import About from './About'
import FAQ from './FAQ'
import Nav from './Nav'


function App(){
    return (
        <Router>
            <div>
                <Nav/>
                <Switch>
                    <Route exact path="/analysis" component={Analysis}/>
                    <Route path="/about" component={About}/>
                    <Route path="/FAQ" component={FAQ}/>
                    <Route render={function(){return <p>Page not found!</p>}}/>
                </Switch>
            </div>
        </Router>
    )

}

export default App;