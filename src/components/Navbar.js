import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Cover from './Cover';
import playQueue from '../services/PlayQueue';
import '../App.css';

class Navbar extends Component{
    constructor(props){
        super(props);

        playQueue.onPlayTrack = this.onPlayTrack;
        this.state = {
            images: null,
            trackName: 'No track selected',
            albumId: null,
            artistId: null,
            artistName: null
        };    
    }
    onPlayTrack = (track) => {
        this.setState({
            trackName: track.name,
            artistId: track.artists[0].id,
            artistName: track.artists[0].name,
            albumId: track.album.id,
            images: track.album.images
        });
    }
    render(){
        return (
            <div className="menuview">
                <div className="list scrollable">
                    <b><a>MAIN</a></b>
                    <ul className="menuitems">
                        <li><Link to="/player/search" className="active">Search</Link></li>
                        <li><Link to="/player/featured-playlists" className="active">Featured Playlists</Link></li>
                    </ul>
                </div>
                <div className="preview">
                    <Cover images={this.state.images} className="responsive-cover" />
                    <p>
                        <b>{this.state.trackName}</b>
                        {this.state.artistName}
                    </p>
                </div>            
            </div>            
        );
    }
}

export default Navbar;