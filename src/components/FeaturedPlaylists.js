import React, { Component } from 'react';
import SearchItem from './SearchItem';
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
                      ? this.state.playlists.map(p =>
                        <SearchItem key={p.id} item={p} url={`/player/playlists/${p.owner.id}/${p.id}`} />)
                      : ''
                    }
                    <hr/>
                </ul>            
            </div>
        );
    }
}

export default FeaturedPlaylists;