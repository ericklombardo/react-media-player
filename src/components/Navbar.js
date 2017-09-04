import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

class Navbar extends Component{
    render(){
        return (
        <div className="menuview">
            <div className="list scrollable">
                <b><a>MAIN</a></b>
                <ul className="menuitems">
                    <li><Link to="/player/featured-playlists" className="active">Featured Playlists</Link></li>
                </ul>
            </div>
        </div>            
        );
    }
}

export default Navbar;