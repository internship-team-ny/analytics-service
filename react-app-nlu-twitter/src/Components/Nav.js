/**
 * Created by moazhamza on 6/29/17.
 */
import React from 'react';

import {NavLink} from 'react-router-dom';

function Nav(){
    return (
        <ul className="navigation-bar">
            <li><NavLink exact activeClassName="selected" to="/analysis">Analysis</NavLink></li>
            <li><NavLink activeClassName="selected" to="/about">About</NavLink></li>
            <li><NavLink activeClassName="selected" to="/FAQ">FAQ</NavLink></li>
        </ul>
    )

}

export default Nav;