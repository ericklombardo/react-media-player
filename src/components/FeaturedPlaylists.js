import React, { Component } from 'react';
import PlaylistItem from './PlaylistItem';
import '../App.css';

class FeaturedPlaylists extends Component{
    render(){
        return (
            <div>
                <h1>Featured Playlists</h1>
                <hr/><br/>
                <ul className="playlists">
                    <h4>PLAYLISTS</h4>
                    { this.state.playlists && this.state.playlists.length 
                      ? this.state.playlists.map(p => <PlaylistItem item={p} />)
                      : ''
                    }
                    <hr/>
                </ul>            
            </div>
        );
    }
}

export default FeaturedPlaylists;